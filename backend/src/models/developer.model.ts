import mongoose, { Schema, Document } from 'mongoose';
import { Developer } from '../types/developer';

export interface DeveloperDocument extends Omit<Developer, 'id'>, Document {
  _id: mongoose.Types.ObjectId;
}

const ContactSchema = new Schema({
  email: { type: String, required: false },
  phone: { type: String, required: false },
  linkedin: { type: String, required: false },
  github: { type: String, required: false }
}, { _id: false });

const DeveloperSchema = new Schema({
  name: { 
    type: String, 
    required: true,
    trim: true
  },
  primarySkill: { 
    type: String, 
    required: true,
    trim: true
  },
  photoURL: { 
    type: String, 
    required: false 
  },
  skills: [{ 
    type: String, 
    required: true 
  }],
  location: { 
    type: String, 
    required: true,
    trim: true
  },
  bio: { 
    type: String, 
    required: false 
  },
  contact: {
    type: ContactSchema,
    required: false,
    default: {}
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc: any, ret: any) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
});

export const DeveloperModel = mongoose.model<DeveloperDocument>('Developer', DeveloperSchema);
