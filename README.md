# ResearchHub 🎓

A comprehensive research platform that combines AI-powered paper discovery, collaborative tools, and personalized recommendations for researchers.

## System Architecture

The project consists of three main components:

1. **Client** (Next.js Frontend)
- TypeScript/React-based web interface
- Theme support with shadcn/ui components
- Authentication using Firebase
- Real-time collaboration features

2. **Server** (Node.js Backend)  
- Express.js REST API
- MongoDB database
- JWT authentication
- Research paper management
- User profile handling

3. **ML Service** (Python)
- Research paper recommendation system
- Natural language processing for paper analysis
- Integration with academic APIs
- Dataset recommendation engine

## Prerequisites

- Node.js 18+ 
- Python 3.8+
- MongoDB 6.0+
- Firebase account
- npm or yarn
- pip or conda

## Installation & Setup

### 1. Client Setup

```bash
cd client
npm install
# Create .env.local with:
NEXT_PUBLIC_FIREBASE_API_KEY=your_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
```

### 2. Server Setup

```bash
cd server
npm install
# Create .env with:
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret
PORT=8000
ML_SERVER_URL=http://localhost:5000
FIREBASE_ADMIN_SDK_PATH=path/to/firebase-admin-sdk.json
```

### 3. ML Service Setup

```bash
cd ML
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
# Create .env with:
OPENAI_API_KEY=your_key
SERPAPI_API_KEY=your_key
KAGGLE_USERNAME=your_username
KAGGLE_KEY=your_key
```

## Running the System

1. **Start Client**
```bash
cd client
npm run dev
# Access at http://localhost:3000
```

2. **Start Server**
```bash
cd server
npm run dev
# Runs on http://localhost:8000
```

3. **Start ML Service**
```bash
cd ML
source venv/bin/activate  # Windows: venv\Scripts\activate
python app.py
# Runs on http://localhost:5000
```

## Environment Details

### Client Environment
- Next.js 13+ with App Router
- TypeScript for type safety
- TailwindCSS for styling
- Firebase for authentication
- shadcn/ui component library

### Server Environment  
- Node.js with Express
- MongoDB for data persistence
- JWT for API authentication
- Firebase Admin SDK for auth verification
- TypeScript for type safety

### ML Environment
- Python 3.8+
- Flask API server
- Scikit-learn for ML models
- Transformers for NLP
- OpenAI API integration
- Kaggle API for datasets

## Additional Setup

1. **MongoDB Setup**
- Install MongoDB Community Edition
- Create a new database
- Set connection string in server .env

2. **Firebase Setup**  
- Create new Firebase project
- Enable Authentication with Email/Password
- Download Firebase Admin SDK JSON
- Add configuration to client .env.local

