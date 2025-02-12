# Dizplai Challenge|

## Overview
This Dizplain coding challenge provides a polling system where users can vote on active polls and see real-time results. It consists of a **React frontend** and a **Node.js/backend** with **SQLite** as the database.

## How it works
The active poll is shown on the screen. Choose an option and click Submit to cast your vote.
Once you've voted, the results will be displayed as percentages.
Click Create Poll to start a new poll with 2 to 7 options.
Use the dropdown menu (or the burger menu on mobile) to navigate between polls.
Click the logo to go back to the main poll screen from the results view.



## Features
- **API Endpoints**: For creating and retrieving polls, votes, and results.
- **VOTES**: Can see Vote results, Vote percentage, Can vote on active polls.
- **Vote Polls**: Polls have between 2 and 7 options.
- **Real-time**: Vote percentage updates and Time stamps for each vote.
- **Design**: Modern Responsive and Interactive web design for maximum perfomance.
- Jest + Supertest for backend testing.
- React Testing Library for frontend testing.

## Extra Features
- UX/UI Tilt Effect, Skia Animated Gradient Theme to enhance user experience
- Dizpai social media account links
- Kebab Menu to provide clean and minimalistic way to display all secondary options
- Creating Poll Button with option of creating new polls and Cancel Button
- Viewing votes
- Timestamp
- 

## Setup Instructions

### Backend Structure
schema.sql: Specifies the database structure.
routes/polls.js: Handles API logic for polls and voting.
server.js: Initializes and runs the backend server.
db.js: Manages the SQLite database and populates default data if required.
app.js: Configures API routes and middleware.

### Backend Setup

1. Install dependencies:
   cd Backend
   npm install
   
3. Start the Backend server:
   npm start
   The server runs on http://localhost:4000.

### Frontend Setup
components/PollSelector.jsx: Provides a dropdown for switching between polls.
components/PollResults.jsx: Displays poll results after voting.
components/CreatePollModal.jsx: Manages the creation of new polls.
App.jsx: Core file that manages the app’s logic and layout.
components/Poll.jsx: Renders the active poll along with voting options.


### Frontend Setup

1. Navigate to the frontend directory:
   cd Front End
2. Install dependencies:
   npm i
   
3. Start the development server:
   npm run dev
   The frontend will open at http://localhost:5173.

### Running Tests
#### Backend Tests
Run Jest tests for the backend:
cd Backend
npm run test

#### Frontend Tests
Run React Testing Library tests:
cd Frontend
npm run test

## API Endpoints
### Fetch Active Poll
GET /api/polls/active



## Conclusion
This project enables users to vote on live polls and see real-time results. It follows best practices with separate frontend and backend, API-driven architecture, and automated testing.
