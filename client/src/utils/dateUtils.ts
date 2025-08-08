export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: '2-digit'
  });
};

export const getDateUrgency = (dateString: string): 'overdue' | 'due-soon' | 'normal' => {
  const dueDate = new Date(dateString);
  const today = new Date();
  const diffTime = dueDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return 'overdue';
  if (diffDays <= 3) return 'due-soon';
  return 'normal';
};

export const getUrgencyColor = (urgency: 'overdue' | 'due-soon' | 'normal'): string => {
  switch (urgency) {
    case 'overdue':
      return '#FECACA'; // red-200
    case 'due-soon':
      return '#FED7AA'; // orange-200
    default:
      return '#F3F4F6'; // gray-100
  }
};