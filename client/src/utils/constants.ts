import type { Column } from "../types";

export const COLUMNS: Column[] = [
  {
    id: 'not-started',
    title: 'Not started',
    color: '#6B7280',
    bgColor: '#F3F4F6'
  },
  {
    id: 'in-progress',
    title: 'In progress',
    color: '#7C3AED',
    bgColor: '#F3E8FF'
  },
  {
    id: 'blocked',
    title: 'Blocked',
    color: '#DC2626',
    bgColor: '#FEF2F2'
  },
  {
    id: 'done',
    title: 'Done',
    color: '#059669',
    bgColor: '#ECFDF5'
  }
];

export const LOCAL_STORAGE_KEY = 'kanban-tasks';