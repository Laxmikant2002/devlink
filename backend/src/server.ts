import express, { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Developer, CreateDeveloperRequest } from './types/developer';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());

// In-memory storage for developers
let developers: Developer[] = [];

// GET /developers - List all developers
app.get('/developers', (req: Request, res: Response) => {
  res.json(developers);
});

// GET /developers/:id - Get single developer by ID
app.get('/developers/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const developer = developers.find(dev => dev.id === id);
  
  if (developer) {
    res.json(developer);
  } else {
    res.status(404).json({ message: 'Developer not found' });
  }
});

// POST /developers - Add a new developer
app.post('/developers', (req: Request<{}, Developer, CreateDeveloperRequest>, res: Response): void => {
  const { name, primarySkill, photoURL, skills, location, bio, contact } = req.body;
  
  // Basic validation
  if (!name || !primarySkill || !skills || !location) {
    res.status(400).json({ 
      message: 'Missing required fields: name, primarySkill, skills, and location are required' 
    });
    return;
  }

  const newDeveloper: Developer = {
    id: uuidv4(),
    name,
    primarySkill,
    photoURL,
    skills,
    location,
    bio,
    contact
  };
  
  developers.push(newDeveloper);
  res.status(201).json(newDeveloper);
});

// PUT /developers/:id - Update a developer
app.put('/developers/:id', (req: Request<{ id: string }, Developer, Partial<CreateDeveloperRequest>>, res: Response): void => {
  const { id } = req.params;
  const developerIndex = developers.findIndex(dev => dev.id === id);
  
  if (developerIndex === -1) {
    res.status(404).json({ message: 'Developer not found' });
    return;
  }

  const updatedDeveloper: Developer = {
    ...developers[developerIndex],
    ...req.body,
    id // Ensure ID cannot be changed
  };
  
  developers[developerIndex] = updatedDeveloper;
  res.json(updatedDeveloper);
});

// DELETE /developers/:id - Delete a developer
app.delete('/developers/:id', (req: Request, res: Response): void => {
  const { id } = req.params;
  const developerIndex = developers.findIndex(dev => dev.id === id);
  
  if (developerIndex === -1) {
    res.status(404).json({ message: 'Developer not found' });
    return;
  }

  developers.splice(developerIndex, 1);
  res.status(204).send();
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
