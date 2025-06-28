# DevLink Backend API

A TypeScript Express.js API for managing developer profiles.

## Features

- Full CRUD operations for developer profiles
- TypeScript for type safety
- In-memory storage (perfect for development)
- RESTful API endpoints
- Input validation

## API Endpoints

### GET /developers
Returns all developers.

### GET /developers/:id
Returns a single developer by ID.

### POST /developers
Creates a new developer profile.

**Required fields:**
- `name`: string
- `primarySkill`: string
- `skills`: string[]
- `location`: string

**Optional fields:**
- `photoURL`: string
- `bio`: string
- `contact`: object with email, phone, linkedin, github

### PUT /developers/:id
Updates an existing developer profile.

### DELETE /developers/:id
Deletes a developer profile.

### GET /health
Health check endpoint.

## Setup

1. Install dependencies:
```bash
npm install
```

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
