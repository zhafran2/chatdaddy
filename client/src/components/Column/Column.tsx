import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { Column as ColumnType, Task } from '../../types';
import TaskCard from '../TaskCard/TaskCard';

interface ColumnProps {
  column: ColumnType;
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
  onCreateTask: (status: ColumnType['id']) => void;
}

const Column: React.FC<ColumnProps> = ({
  column,
  tasks,
  onEditTask,
  onDeleteTask,
  onUpdateTask,
  onCreateTask,
}) => {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: '#F9FAFB',
        border: '1px solid #E5E7EB',
        borderRadius: 2,
        p: 2,
        minHeight: '600px',
        width: '280px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Column Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              backgroundColor: column.color,
              mr: 1,
            }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              color: '#374151',
              fontSize: '0.875rem',
            }}
          >
            {column.title}
          </Typography>
          {tasks.length > 0 && (
            <Box
              sx={{
                backgroundColor: '#E5E7EB',
                borderRadius: '12px',
                px: 1,
                py: 0.25,
                ml: 1,
                minWidth: 20,
                textAlign: 'center',
              }}
            >
              <Typography
                variant="caption"
                sx={{
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  color: '#6B7280',
                }}
              >
                {tasks.length}
              </Typography>
            </Box>
          )}
        </Box>
        
        <Button
          onClick={() => onCreateTask(column.id)}
          size="small"
          sx={{
            minWidth: 'auto',
            p: 0.5,
            color: '#6B7280',
            '&:hover': {
              backgroundColor: '#F3F4F6',
            },
          }}
        >
          <Add fontSize="small" />
        </Button>
      </Box>

      {/* Tasks Container */}
      <Box
        ref={setNodeRef}
        sx={{
          flex: 1,
          minHeight: '200px',
        }}
      >
        <SortableContext
          items={tasks.map(task => task.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEditTask}
              onDelete={onDeleteTask}
              onUpdateTask={onUpdateTask}
            />
          ))}
        </SortableContext>
      </Box>

      {/* Empty State */}
      {tasks.length === 0 && (
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9CA3AF',
            textAlign: 'center',
            py: 4,
          }}
        >
          <Typography variant="body2">
            No tasks yet.
            <br />
            Click + to add one.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default Column;