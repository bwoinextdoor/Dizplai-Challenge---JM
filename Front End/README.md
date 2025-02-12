# DizplainCodingChallenge|

## Overview
This Dizplain coding challenge provides a polling system where users can vote on active polls and see real-time results. It consists of a **React frontend** and a **Node.js/Express backend** with **MongoDB** as the database.

## Features
- Users can vote on active polls.
- Polls have between 2 and 7 options.
- Real-time vote percentage updates.
- API endpoints for creating and retrieving polls, votes, and results.
- Responsive web design.
- Jest + Supertest for backend testing.
- React Testing Library for frontend testing.

## Setup Instructions

### Prerequisites
- Node.js (>=14.x)
- MongoDB (local or cloud instance)

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/your-repo/polling-system.git
   cd polling-system
   ```
2. Install dependencies:
   ```sh
   cd Backend
   npm install
   ```
3. Start MongoDB (if running locally):
   ```sh
   mongod --dbpath ./data
   ```
4. Start the Backend server:
   ```sh
   npm start
   ```
   The server runs on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd Frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React application:
   ```sh
   npm start
   ```
   The frontend runs on `http://localhost:3000`.

### Running Tests
#### Backend Tests
Run Jest tests for the backend:
```sh
cd Backend
npm test
```

#### Frontend Tests
Run React Testing Library tests:
```sh
cd Frontend
npm test
```

## API Endpoints
### Fetch Active Poll
```
GET /api/polls/active
```
Response:
```json
{
  "_id": "123456",
  "question": "Your favorite programming language?",
  "options": ["JavaScript", "Python", "C++"],
  "active": true
}
```

### Vote on Poll
```
POST /api/polls/:id/vote
```
Request body:
```json
{
  "option": "JavaScript"
}
```
Response:
```json
{
  "message": "Vote recorded"
}
```

### Get Poll Results
```
GET /api/polls/:id/results
```
Response:
```json
[
  { "option": "JavaScript", "percentage": 60 },
  { "option": "Python", "percentage": 30 },
  { "option": "C++", "percentage": 10 }
]
```

### View Individual Votes
```
GET /api/polls/:id/votes
```
Response:
```json
[
  { "option": "JavaScript", "timestamp": "2025-02-06T12:00:00Z" },
  { "option": "Python", "timestamp": "2025-02-06T12:05:00Z" }
]
```

## Conclusion
This project enables users to vote on live polls and see real-time results. It follows best practices with separate frontend and backend, API-driven architecture, and automated testing.