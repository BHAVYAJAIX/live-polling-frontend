export interface Poll {
  id: string;
  questionText: string;
  options: string[];
  startTime: string;
  duration: number;
  status: 'draft' | 'active' | 'completed';
  createdAt: string;
  votes?: { [option: string]: number };
}

export interface User {
  id: string;
  username: string;
  email: string;
}