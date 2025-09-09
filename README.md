# IVinterview - Interview Questions & Answers Platform

A full-stack web application for managing interview questions and answers, built with Node.js, Express.js, React, and MySQL.

## Features

- **User Authentication**: Secure login system with JWT tokens
- **Question Management**: Create, view, and manage interview questions
- **Answer System**: Users can provide answers to questions
- **Tag System**: Categorize questions with tags for easy filtering
- **Real-time Updates**: Dynamic interface with instant feedback
- **Hebrew Language Support**: Fully localized interface in Hebrew

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL2** - Database driver
- **JWT** - Authentication tokens
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables management

### Frontend
- **React** - UI library
- **Redux** - State management
- **Vite** - Build tool
- **Axios** - HTTP client
- **CSS Custom Properties** - Styling system

## Project Structure

```
IVinterview/
├── backEnd/
│   ├── src/
│   │   ├── index.js          # Main server file
│   │   ├── auth.js           # Authentication logic
│   │   ├── database.js       # Database connection
│   │   └── QandA.js          # Questions and Answers logic
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LoginPage.jsx
│   │   │   └── QuestionsPage.jsx
│   │   ├── store/
│   │   │   ├── apiSlice.js
│   │   │   ├── authSlice.js
│   │   │   └── store.js
│   │   ├── styles/
│   │   │   └── main.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
└── README.md
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- MySQL database
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backEnd
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```env
PORT=3000
DB_HOST=localhost
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_NAME=your_db_name
JWT_SECRET=your_jwt_secret
```

4. Set up your MySQL database with the required tables (users, questions, answers)

5. Start the development server:
```bash
npm run dev
```

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

## Usage

1. Access the application through your web browser
2. Log in with your credentials
3. Create new questions or browse existing ones
4. Select questions to view their details and answers
5. Add your own answers to questions
6. Use tags to categorize and filter questions

## API Endpoints

### Authentication
- `POST /login` - User login
- `GET /userInfo` - Get current user information

### Questions
- `POST /createQuestion` - Create a new question
- `GET /getQuestions` - Get all questions

### Answers
- `POST /answer` - Create an answer for a question
- `GET /getQuestionAnswers` - Get answers for a specific question

## Scripts

### Backend
- `npm run dev` - Start development server with nodemon
- `npm start` - Start production server

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.