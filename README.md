Tic-Tac-Toe Game
Overview
Tic-Tac-Toe is a turn-based strategy game where two players take turns marking spaces in a 3×3 grid. This project includes:
* Web Application (Fully functional, built with React.js)
* Mobile Application (In progress, built with React Native + Expo)
* Shared Codebase (Logic shared between Web and Mobile)
* Backend (Node.js, Express, Prisma, JWT authentication, and integration with an external Python API for game logic)
Project Structure
tic-tac-toe-game/
├── web-app/          # Web frontend (React.js)
├── mobile/           # Mobile frontend (React Native + Expo) (Work in progress)
├── shared/           # Shared logic (Redux, game logic, API services)
├── backend/          # Backend (Node.js, Express, Prisma, JWT)
├── README.md         # Project documentation
Key Fixes and Changes
Web App
* Implemented user authentication using Redux and JWT.
* Enhanced game UI with real-time status updates and a dialog for win/loss/draw.
* Fixed state management issues by properly handling Redux state updates.
* Improved game session management with proper API integration.
Mobile App (In Progress)
* Integrated shared logic for authentication and game mechanics.
* Encountered and resolved multiple issues with React Navigation and AsyncStorage.
* Updated storage handling to use AsyncStorage for React Native and localStorage for Web.
* Fixed dependency conflicts in the monorepo setup.
Backend Fixes
* Resolved JWT authentication issues by ensuring proper token storage and validation.
* Integrated Prisma ORM for efficient database handling.
* Improved API error handling with better logging and response structures.
* Fixed session management bugs, ensuring proper game state persistence.
How to Run the Web App
Prerequisites
* Node.js (>=18)
* npm or yarn
Steps to Run
1. Clone the repositorygit clone https://github.com/svalanedwin/tic-tac-toe-game.git
2. cd tic-tac-toe-game
3. 
4. Install dependenciesnpm install
5. cd web-app && npm install
6. 
7. Start the web applicationnpm start
8. The web app will be available at http://localhost:3000
How to Run the Backend
1. Navigate to the backend folder cd backend
2. 
3. Set up environment variables Create a .env file and configure the database: DATABASE_URL=postgresql://username:password@localhost:5432/tic-tac-toe
4. JWT_SECRET=your_secret_key
5. 
6. Run database migrations npx prisma migrate dev
7. 
8. Start the backend server npm start
9. The API will be available at http://localhost:5000
How to Run the Mobile App (WIP)
1. Navigate to the mobile folder cd mobile
2. 
3. Install dependencies npm install
4. 
5. Start Expo Development Server npm start
6. 
7. Run on a device
    * Press i for iOS Simulator
    * Press a for Android Emulator
⚠ Current Status: The mobile app is under development and may have unresolved issues.
Future Improvements
* ✅ Complete Mobile App Development
* ✅ Enhance API Security & Optimization
* ✅ Implement Web & Mobile Test Coverage
* ✅ Add CI/CD Pipeline for Deployment
* ✅ Improve Game AI for a More Challenging Experience
Testing (Upcoming)
* Unit tests: Using Jest for frontend & backend testing.
* Integration tests: Using Cypress for E2E testing.
* Mobile testing: Using Detox for React Native testing.