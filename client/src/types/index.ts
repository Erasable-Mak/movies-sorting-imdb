// this index.ts is under types folder
// export interface Task { 
//     id: number;
//     title: string;
//     description: string;
//     deadline: string;
//     status: 'pending' | 'completed';
//   }
  
//   export interface User {
//     username: string;
//     password: string;
//   }
  

// types.ts

// Task type definition with additional fields
export interface Task {
  id: number;           // Unique identifier for each task
  title: string;        // Title of the task
  description: string;  // Description of the task
  deadline: string;     // Deadline for the task (you may want to use a Date object or ISO string)
  status: 'pending' | 'completed';  // Status of the task (either 'pending' or 'completed')
}

// User type definition
export interface User {
  username: string;  // The user's username
  password: string;  // The user's password (you'll likely handle this securely)
}