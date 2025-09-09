import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:3000",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token || localStorage.getItem("token");
    if (token) {
      headers.set("auth", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery,
  tagTypes: ["Question", "Answer", "User"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
    }),

    getUserInfo: builder.query({
      query: () => "/userInfo",
      providesTags: ["User"],
    }),

    getQuestions: builder.query({
      query: (filters = {}) => ({
        url: "/getQuestions",
        params: filters,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Question", id })),
              { type: "Question", id: "LIST" },
            ]
          : [{ type: "Question", id: "LIST" }],
    }),

    createQuestion: builder.mutation({
      query: (newQuestion) => ({
        url: "/createQuestion",
        method: "POST",
        body: newQuestion,
      }),
      invalidatesTags: [{ type: "Question", id: "LIST" }],
    }),

    getAnswersForQuestion: builder.query({
      query: (questionId) => ({
        url: "/getQuestionAnswers",
        params: { questionId },
      }),
      providesTags: (result, error, questionId) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Answer", id })),
              { type: "Answer", id: questionId },
            ]
          : [{ type: "Answer", id: questionId }],
    }),

    createAnswer: builder.mutation({
      query: ({ questionId, body }) => ({
        url: "/answer",
        method: "POST",
        body: { questionId, body },
      }),
      invalidatesTags: (result, error, { questionId }) => [
        { type: "Answer", id: questionId },
      ],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetUserInfoQuery,
  useGetQuestionsQuery,
  useCreateQuestionMutation,
  useGetAnswersForQuestionQuery,
  useCreateAnswerMutation,
} = apiSlice;
