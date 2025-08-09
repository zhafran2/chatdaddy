import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
} from '@mui/material';
import { MoreVert, CheckCircleOutline, RadioButtonUnchecked } from '@mui/icons-material';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { formatDate, getDateUrgency, getUrgencyColor } from '../../utils/dateUtils';
import type { Task } from '../../types';

interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onEdit, onDelete, onUpdateTask }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(task);
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete(task.id);
    handleMenuClose();
  };

  const handleSubTaskToggle = (subtaskId: string) => {
    const updatedSubTasks = task.subTasks?.map(st =>
      st.id === subtaskId ? { ...st, completed: !st.completed } : st
    );
    onUpdateTask(task.id, { subTasks: updatedSubTasks });
  };

  const urgency = task.dueDate ? getDateUrgency(task.dueDate) : 'normal';
  const cardBg = task.dueDate ? getUrgencyColor(urgency) : '#FFFFFF';

  return (
    <Card
      ref={setNodeRef}
      style={{ ...style, backgroundColor: cardBg }}
      sx={{
        mb: 1,
        cursor: isDragging ? 'grabbing' : 'grab',
        '&:hover': {
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        },
      }}
      {...attributes}
      {...listeners}
    >
      <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
        <Box display="flex" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="body1" sx={{ fontWeight: 500, flex: 1, mr: 1 }}>
            {task.title}
          </Typography>
          <IconButton
            size="small"
            onClick={handleMenuClick}
            sx={{ p: 0.5, ml: 1 }}
          >
            <MoreVert fontSize="small" />
          </IconButton>
        </Box>

        {task.dueDate && (
          <Chip
            label={`Due ${formatDate(task.dueDate)}`}
            size="small"
            sx={{
              mt: 1,
              backgroundColor: urgency === 'overdue' ? '#FCA5A5' : urgency === 'due-soon' ? '#FDBA74' : '#D1FAE5',
              color: urgency === 'overdue' ? '#7F1D1D' : urgency === 'due-soon' ? '#92400E' : '#065F46',
              fontSize: '0.75rem',
              height: '24px',
            }}
          />
        )}

        {task.subTasks && task.subTasks.length > 0 && (
          <Box mt={1}>
            {task.subTasks.map((subtask) => (
              <FormControlLabel
                key={subtask.id}
                control={
                  <Checkbox
                    checked={subtask.completed}
                    onChange={() => handleSubTaskToggle(subtask.id)}
                    size="small"
                    icon={<RadioButtonUnchecked fontSize="small" />}
                    checkedIcon={<CheckCircleOutline fontSize="small" />}
                    sx={{ py: 0.25 }}
                  />
                }
                label={
                  <Typography
                    variant="body2"
                    sx={{
                      textDecoration: subtask.completed ? 'line-through' : 'none',
                      color: subtask.completed ? '#9CA3AF' : '#374151',
                    }}
                  >
                    {subtask.title}
                  </Typography>
                }
                sx={{ display: 'block', m: 0 }}
              />
            ))}
          </Box>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          onClick={(e) => e.stopPropagation()}
        >
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            Delete
          </MenuItem>
        </Menu>
      </CardContent>
    </Card>
  );
};

export default TaskCard;