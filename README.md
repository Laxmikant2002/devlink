# DevLink - Developer Connection Platform

A full-stack application to discover and connect with talented developers. Built with React.js frontend and Node.js/Express backend with MongoDB database.

## Features

### Frontend Features ✅
- **Home page** that lists all developers with beautiful card layout
- **Developer cards** showing Name, Primary skill, and Profile photo
- **Search functionality** to filter by name, skill, or location with real-time results
- **Detail page** showing full profile with bio, skills, contact info, and location
- **Add Developer Form** with name, photo URL, skills (multi-tag input), location, bio, and contact details
- **Responsive Design** that works perfectly on mobile and desktop

### Backend Features ✅
- **GET /developers** → List all developers with optional search query
- **GET /developers/:id** → Return single developer details
- **POST /developers** → Add a new developer
- **CORS enabled** for frontend-backend communication
- **MongoDB integration** with Mongoose ODM
- **Data validation** and error handling
- **Search functionality** across name, skills, and location

## Tech Stack

### Backend
- **Node.js** with Express.js
- **TypeScript** for type safety
- **MongoDB** with Mongoose ODM
- **CORS** for cross-origin requests
- **dotenv** for environment variables

### Frontend
- **React.js** with modern hooks
- **React Router** for navigation
- **Axios** for API calls
- **Tailwind CSS** for styling
- **Responsive design** principles

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or MongoDB Atlas)
- npm or yarn

### 1. Clone the repository
```bash
git clone <repository-url>
cd devlink
```

### 2. Backend Setup

```bash
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Create .env file with your MongoDB connection string
# The file should contain:
# MONGODB_URI=your_mongodb_connection_string
# PORT=3001
# FRONTEND_URL=http://localhost:3000

# Build TypeScript
npm run build

# Start the development server
npm run dev
```

The backend will start on `http://localhost:3001`

### 3. Frontend Setup

```bash
# Navigate to client folder (from root directory)
cd Client

# Install dependencies
npm install

# Create .env file with:
# REACT_APP_API_URL=http://localhost:3001

# Start the development server
npm start
```

The frontend will start on `http://localhost:3000`

## API Endpoints

### GET /developers
Get all developers with optional search functionality.

**Query Parameters:**
- `search` (optional): Search term to filter developers by name, skills, or location

**Example:**
```
GET /developers
GET /developers?search=react
GET /developers?search=san francisco
```

### GET /developers/:id
Get a specific developer by ID.

**Example:**
```
GET /developers/60d5ecb74b3c2b001f5e4e3a
```

### POST /developers
Create a new developer.

**Required fields:**
- `name`: Developer's full name
- `primarySkill`: Main technology/skill
- `skills`: Array of skills
- `location`: Geographic location
- `bio`: Professional summary
- `contact.email`: Email address

**Optional fields:**
- `photoURL`: Profile photo URL
- `contact.phone`: Phone number
- `contact.github`: GitHub profile URL
- `contact.linkedin`: LinkedIn profile URL

**Example Request Body:**
```json
{
  "name": "John Doe",
  "primarySkill": "React.js",
  "photoURL": "https://example.com/photo.jpg",
  "skills": ["React.js", "Node.js", "TypeScript"],
  "location": "San Francisco, CA",
  "bio": "Full-stack developer with 5+ years of experience...",
  "contact": {
    "email": "john@example.com",
    "phone": "+1 (555) 123-4567",
    "github": "https://github.com/johndoe",
    "linkedin": "https://linkedin.com/in/johndoe"
  }
}
```

## Project Structure

```
devlink/
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── config/         # Database configuration
│   │   ├── models/         # Mongoose models
│   │   ├── types/          # TypeScript type definitions
│   │   └── server.ts       # Main server file
│   ├── package.json
│   └── tsconfig.json
├── Client/                 # React.js frontend
│   ├── src/
│   │   ├── pages/          # React components/pages
│   │   ├── services/       # API service functions
│   │   ├── app.js          # Main App component
│   │   └── index.js        # Entry point
│   ├── public/
│   └── package.json
└── README.md
```

## Features Implementation

### 1. View Developer List ✅
- Displays all developers in a responsive card grid
- Shows name, primary skill, profile photo, and location
- Clickable cards navigate to detailed view

### 2. Search Functionality ✅
- Real-time search across name, skills, and location
- Debounced API calls for performance
- Results update as you type

### 3. Developer Detail View ✅
- Complete profile information
- Skills display with primary skill highlighted
- Contact information with clickable links
- Professional bio and summary

### 4. Add New Developer ✅
- Comprehensive form with validation
- Multi-tag skill input system
- Contact information fields
- Form validation and error handling

### 5. Responsive Design ✅
- Mobile-first approach
- Responsive grid layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).
