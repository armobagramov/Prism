import { SimulationNodeDatum, SimulationLinkDatum } from 'd3';

export enum ArgumentType {
  PRO = 'PRO',
  CON = 'CON',
  NUANCE = 'NUANCE',
  INFO = 'INFO'
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  bio?: string;
  joinedDate: string;
  reputationScore: number;
}

export interface Author {
  id: string;
  name: string;
  isExpert: boolean;
  expertLabel?: string;
  avatarUrl?: string;
}

export interface Argument {
  id: string;
  author: Author;
  content: string;
  type: ArgumentType;
  sources: { title: string; url: string }[];
  votes: number;
  timestamp: string;
  children: Argument[]; // Nested replies/rebuttals
}

export interface Topic {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'Politics' | 'Technology' | 'Environment' | 'Culture' | 'Science' | 'Bioethics' | 'Economics';
  temperature: 'Low' | 'Medium' | 'High'; // Indicates polarization/activity
  activityLevel: number; // 0-100, used for node size
  lastUpdated: string;
  arguments: {
    pro: Argument[];
    con: Argument[];
    nuance: Argument[];
  };
}

export interface GraphNode extends SimulationNodeDatum {
  id: string;
  group: string;
  val: number; // size
  data: Topic;
}

export interface GraphLink extends SimulationLinkDatum<GraphNode> {
  source: string | GraphNode;
  target: string | GraphNode;
}