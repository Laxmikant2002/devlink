import express, { Request, Response } from 'express';
import cors from 'cors';
import { Developer, CreateDeveloperRequest } from './types/developer';
import { connectDB } from './config/database';
import { DeveloperModel } from './models/developer.model';
import mongoose from 'mongoose';

const app = express();
const port = process.env.PORT || 3001;

connectDB();

// CORS configuration
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
// GET /developers - Get all developers with optional search
app.get('/developers', async (req: Request, res: Response) => {
  try {
    const { search } = req.query;
    let query = {};
    
    if (search && typeof search === 'string') {
      const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
      query = {
        $or: [
          { name: searchRegex },
          { primarySkill: searchRegex },
          { skills: { $in: [searchRegex] } },
          { location: searchRegex }
        ]
      };
    }
    
    const developers = await DeveloperModel.find(query);
    res.json(developers);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching developers', error: (error as Error).message });
  }
});

// GET /developers/:id - Get single developer by ID
app.get('/developers/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid developer ID format' });
      return;
    }
    
    const developer = await DeveloperModel.findById(id);
    
    if (developer) {
      res.json(developer);
    } else {
      res.status(404).json({ message: 'Developer not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching developer', error: (error as Error).message });
  }
});

// POST /developers - Add a new developer
app.post('/developers', async (req: Request<{}, Developer, CreateDeveloperRequest>, res: Response): Promise<void> => {
  try {
    const { name, primarySkill, photoURL, skills, location, bio, contact } = req.body;
    
    if (!name || !primarySkill || !skills || !location) {
      res.status(400).json({ 
        message: 'Missing required fields: name, primarySkill, skills, and location are required' 
      });
      return;
    }

    const newDeveloper = new DeveloperModel({
      name,
      primarySkill,
      photoURL,
      skills,
      location,
      bio,
      contact
    });
    
    const savedDeveloper = await newDeveloper.save();
    res.status(201).json(savedDeveloper);
  } catch (error) {
    res.status(500).json({ message: 'Error creating developer', error: (error as Error).message });
  }
});

// PUT /developers/:id - Update a developer
app.put('/developers/:id', async (req: Request<{ id: string }, Developer, Partial<CreateDeveloperRequest>>, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid developer ID format' });
      return;
    }

    const updatedDeveloper = await DeveloperModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!updatedDeveloper) {
      res.status(404).json({ message: 'Developer not found' });
      return;
    }

    res.json(updatedDeveloper);
  } catch (error) {
    res.status(500).json({ message: 'Error updating developer', error: (error as Error).message });
  }
});

// DELETE /developers/:id - Delete a developer
app.delete('/developers/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: 'Invalid developer ID format' });
      return;
    }

    const deletedDeveloper = await DeveloperModel.findByIdAndDelete(id);
    
    if (!deletedDeveloper) {
      res.status(404).json({ message: 'Developer not found' });
      return;
    }

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting developer', error: (error as Error).message });
  }
});

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
