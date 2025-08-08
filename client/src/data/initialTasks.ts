import type { Task } from "../types";


export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Take Coco to a vet',
    dueDate: '2024-11-04',
    status: 'not-started',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Taxes 😊',
    status: 'in-progress',
    subTasks: [
      { id: 'st1', title: 'Accountant contract', completed: false },
      { id: 'st2', title: 'Request work payslips', completed: false },
      { id: 'st3', title: 'Cancel VAT ID', completed: false }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '3',
    title: 'Move',
    status: 'blocked',
    subTasks: [
      { id: 'st4', title: 'Request moving estimate', completed: false },
      { id: 'st5', title: 'Order moving boxes', completed: true }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '4',
    title: 'Nothing to be done 😊',
    status: 'done',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];