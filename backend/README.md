# DevLink Backend API

> A modern REST API for managing developer profiles built with Node.js, Express.js, TypeScript, and MongoDB.

![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=flat&logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-v5.1-000000?style=flat&logo=express&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-v5.8-007ACC?style=flat&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-v8.8-4EA94B?style=flat&logo=mongodb&logoColor=white)

---

## 📋 Overview

DevLink Backend provides a robust REST API for managing developer profiles and portfolios. The application supports full CRUD operations with comprehensive developer information including skills, contact details, location, and bio.

**Key Features:**
- Complete developer profile management
- RESTful API with TypeScript safety
- MongoDB integration with Mongoose ODM
- Dual storage modes: MongoDB (production) and in-memory (testing)
- Input validation and error handling
- Hot-reload development environment

---

## 🛠️ Tech Stack

| Component | Technology | Version |
|-----------|------------|---------|
| **Runtime** | Node.js | 20+ |
| **Framework** | Express.js | ^5.1.0 |
| **Language** | TypeScript | ^5.8.3 |
| **Database** | MongoDB | ^8.8.4 |
| **ODM** | Mongoose | ^8.8.4 |
| **Dev Tools** | ts-node | ^10.9.2 |

**Dependencies:**
```json
{
  "express": "^5.1.0",
  "mongoose": "^8.8.4",
  "dotenv": "^16.4.7",
  "uuid": "^11.1.0"
}
```

---

## ⚙️ Setup

### Prerequisites
- Node.js (v20 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Installation

1. **Clone and install dependencies**
   ```bash
   git clone <repository-url>
   cd devlink/backend
   npm install
   ```

2. **Environment configuration**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` file:
   ```env
   PORT=3001
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/devlink
   # Or for MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/devlink
   ```

3. **Database setup (choose one)**
   
   **Option A: MongoDB Atlas (Recommended)**
   - Create account at [MongoDB Atlas](https://cloud.mongodb.com/)
   - Create cluster and get connection string
   - Update `MONGODB_URI` in `.env`
   
   **Option B: Local MongoDB**
   ```bash
   # Install MongoDB locally or use Docker
   docker run --name mongodb -p 27017:27017 -d mongo:latest
   ```

4. **Start the development server**
   ```bash
   # Production mode (MongoDB required)
   npm run dev
   
   # Test mode (in-memory storage, no MongoDB needed)
   npm run dev-test
   ```

### Available Scripts

```bash
npm run dev        # Start with MongoDB
npm run dev-test   # Start with in-memory storage
npm run build      # Build TypeScript
npm start          # Production start
npm run watch      # Watch mode
```

---

## 📚 API Documentation

**Base URL:** `http://localhost:3001`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Health check |
| GET | `/developers` | Get all developers |
| GET | `/developers/:id` | Get developer by ID |
| POST | `/developers` | Create new developer |
| PUT | `/developers/:id` | Update developer |
| DELETE | `/developers/:id` | Delete developer |

### Data Models

#### Developer Object
```typescript
{
  id: string;                    // Auto-generated ObjectId
  name: string;                  // Required
  primarySkill: string;          // Required
  skills: string[];              // Required
  location: string;              // Required
  bio?: string;                  // Optional
  photoURL?: string;             // Optional
  contact: {                     // Optional
    email?: string;
    phone?: string;
    linkedin?: string;
    github?: string;
  };
  createdAt: Date;               // Auto-generated
  updatedAt: Date;               // Auto-generated
}
```

### API Reference

#### 🟢 GET `/developers`
**Description:** Retrieve all developers

**Response:** `200 OK`
```json
[
  {
    "id": "675a1b2c3d4e5f6789abcdef",
    "name": "John Doe",
    "primarySkill": "Full Stack Developer",
    "skills": ["React", "Node.js", "TypeScript"],
    "location": "San Francisco, CA",
    "bio": "Passionate developer with 5+ years experience",
    "photoURL": "https://example.com/photo.jpg",
    "contact": {
      "email": "john@example.com",
      "github": "johndoe",
      "linkedin": "johndoe"
    },
    "createdAt": "2025-06-29T10:00:00.000Z",
    "updatedAt": "2025-06-29T10:00:00.000Z"
  }
]
```

#### 🟢 GET `/developers/:id`
**Description:** Retrieve single developer by ID

**Parameters:**
- `id` (string): MongoDB ObjectId

**Responses:**
- `200 OK`: Developer object
- `400 Bad Request`: Invalid ID format
- `404 Not Found`: Developer not found

#### 🟡 POST `/developers`
**Description:** Create new developer

**Request Body:** (JSON)
```json
{
  "name": "Jane Smith",
  "primarySkill": "Frontend Developer",
  "skills": ["React", "Vue.js", "CSS", "JavaScript"],
  "location": "New York, NY",
  "bio": "Creative frontend developer with eye for design",
  "photoURL": "https://example.com/jane-photo.jpg",
  "contact": {
    "email": "jane@example.com",
    "github": "janesmith",
    "linkedin": "jane-smith-dev"
  }
}
```

**Required Fields:** `name`, `primarySkill`, `skills`, `location`

**Responses:**
- `201 Created`: Developer created successfully
- `400 Bad Request`: Missing required fields or validation error

#### 🟠 PUT `/developers/:id`
**Description:** Update existing developer

**Request Body:** Partial developer object (only fields to update)
```json
{
  "bio": "Updated bio information",
  "skills": ["React", "TypeScript", "GraphQL", "Node.js"]
}
```

**Responses:**
- `200 OK`: Developer updated successfully
- `400 Bad Request`: Invalid ID or validation error
- `404 Not Found`: Developer not found

#### 🔴 DELETE `/developers/:id`
**Description:** Delete developer by ID

**Responses:**
- `204 No Content`: Developer deleted successfully
- `400 Bad Request`: Invalid ID format
- `404 Not Found`: Developer not found

### Error Response Format
```json
{
  "message": "Error description",
  "error": "Detailed error information (development only)"
}
```

---

## 🧪 Testing

### Postman Collection

Import the provided collection: `DevLink_MongoDB.postman_collection.json`

**Collection Variables:**
- `baseUrl`: `http://localhost:3001`
- `developerId`: `<set-after-creating-developer>`

### cURL Examples

#### Health Check
```bash
curl -X GET http://localhost:3001/health
```

#### Get All Developers
```bash
curl -X GET http://localhost:3001/developers
```

#### Create Developer
```bash
curl -X POST http://localhost:3001/developers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Johnson",
    "primarySkill": "React Developer",
    "skills": ["React", "TypeScript", "Redux"],
    "location": "San Francisco, CA",
    "bio": "Frontend specialist with 4+ years experience",
    "contact": {
      "email": "alice@example.com",
      "github": "alicejohnson"
    }
  }'
```

#### Get Developer by ID
```bash
curl -X GET http://localhost:3001/developers/{DEVELOPER_ID}
```

#### Update Developer
```bash
curl -X PUT http://localhost:3001/developers/{DEVELOPER_ID} \
  -H "Content-Type: application/json" \
  -d '{
    "bio": "Updated bio information",
    "skills": ["React", "TypeScript", "GraphQL"]
  }'
```

#### Delete Developer
```bash
curl -X DELETE http://localhost:3001/developers/{DEVELOPER_ID}
```

### Test Data Examples

**Frontend Developer:**
```json
{
  "name": "Sarah Chen",
  "primarySkill": "React Developer",
  "skills": ["React", "TypeScript", "CSS", "Jest"],
  "location": "San Francisco, CA",
  "bio": "Frontend specialist building responsive web apps",
  "contact": {
    "email": "sarah.chen@example.com",
    "github": "sarahchen"
  }
}
```

**Backend Developer:**
```json
{
  "name": "Marcus Johnson",
  "primarySkill": "Backend Developer",
  "skills": ["Node.js", "Express", "MongoDB", "Docker"],
  "location": "Austin, TX",
  "bio": "Backend developer focused on scalable systems",
  "contact": {
    "email": "marcus@example.com",
    "linkedin": "marcus-johnson-dev"
  }
}
```

---

## 📁 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── database.ts          # MongoDB connection
│   ├── models/
│   │   └── developer.model.ts   # Mongoose schema
│   ├── types/
│   │   └── developer.ts         # TypeScript interfaces
│   ├── server.ts                # Main server (MongoDB)
│   └── server-test.ts           # Test server (in-memory)
├── .env.example                 # Environment template
├── package.json                 # Dependencies
├── tsconfig.json               # TypeScript config
└── README.md                   # Documentation
```

---

## 🚀 Quick Start Commands

```bash
# Clone and setup
git clone <repo-url> && cd devlink/backend && npm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI

# Start development
npm run dev

# Test the API
curl http://localhost:3001/health
```

---

**Built with ❤️ using Node.js, Express.js, TypeScript, and MongoDB**

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

## Development

Start the development server with hot reloading:
```bash
npm run dev
```

## Production

1. Build the TypeScript code:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Scripts

- `npm run dev` - Start development server with ts-node
- `npm run build` - Compile TypeScript to JavaScript
- `npm run start` - Start production server
- `npm run watch` - Watch for TypeScript changes and recompile

## Project Structure

```
src/
├── server.ts           # Main server file
└── types/
    └── developer.ts    # TypeScript interfaces
dist/                   # Compiled JavaScript (generated)
```

## Example API Usage

### Create a Developer
```bash
curl -X POST http://localhost:3001/developers \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "primarySkill": "JavaScript",
    "skills": ["JavaScript", "TypeScript", "React", "Node.js"],
    "location": "San Francisco, CA",
    "bio": "Full-stack developer with 5 years of experience",
    "contact": {
      "email": "john@example.com",
      "github": "johndoe"
    }
  }'
```

### Get All Developers
```bash
curl http://localhost:3001/developers
```
