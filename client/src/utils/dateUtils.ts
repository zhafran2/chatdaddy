import type { TaskStatus } from '../types';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit'
  });
};

export const getDateUrgency = (dateString: string, status?: TaskStatus): 'overdue' | 'due-soon' | 'normal' | 'completed' => {
  // If task is done, show as completed (green)
  if (status === 'done') return 'completed';
  
  const dueDate = new Date(dateString);
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays <= 3) return 'due-soon';
  return 'normal';
};

export const getUrgencyColor = (urgency: 'overdue' | 'due-soon' | 'normal' | 'completed'): string => {
  switch (urgency) {
    case 'overdue':
      return '#FECACA'; // red-200
    case 'due-soon':
      return '#FED7AA'; // orange-200
    case 'completed':
      return '#D1FAE5'; // green-200
    default:
      return '#F3F4F6'; // gray-100
  }
};

export const getUrgencyChipColor = (urgency: 'overdue' | 'due-soon' | 'normal' | 'completed'): { backgroundColor: string; color: string } => {
  switch (urgency) {
    case 'overdue':
      return { backgroundColor: '#FCA5A5', color: '#7F1D1D' }; // red
    case 'due-soon':
      return { backgroundColor: '#FDBA74', color: '#92400E' }; // orange
    case 'completed':
      return { backgroundColor: '#86EFAC', color: '#14532D' }; // green
    default:
      return { backgroundColor: '#E5E7EB', color: '#374151' }; // gray
  }
};