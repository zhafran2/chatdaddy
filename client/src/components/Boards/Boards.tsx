import React, { useState } from 'react';
import { Box, Typography, Container } from '@mui/material';
import {
  DndContext,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import type { Task, TaskStatus } from '../../types';
import { COLUMNS } from '../../utils/constants';
import { useTasks } from '../../hooks/useTasks';
import Column from '../Column/Column';
import TaskCard from '../TaskCard/TaskCard';
import TaskDialog from '../TaskDialog/TaskDialog';

const Board: React.FC = () => {
  const { tasks, addTask, updateTask, deleteTask, moveTask, getTasksByStatus } = useTasks();
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [newTaskStatus, setNewTaskStatus] = useState<TaskStatus>('not-started');

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = tasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeTask = tasks.find((t) => t.id === active.id);
    if (!activeTask) return;

    const overId = over.id as string;
    
    // Check if dropped on a column
    const targetColumn = COLUMNS.find((col) => col.id === overId);
    if (targetColumn && activeTask.status !== targetColumn.id) {
      moveTask(activeTask.id, targetColumn.id);
      return;
    }

    // Check if dropped on another task (for reordering within column)
    const overTask = tasks.find((t) => t.id === overId);
    if (overTask && activeTask.status === overTask.status) {
      const columnTasks = getTasksByStatus(activeTask.status);
      const activeIndex = columnTasks.findIndex((t) => t.id === active.id);
      const overIndex = columnTasks.findIndex((t) => t.id === over.id);
      
      if (activeIndex !== overIndex) {
        const newTasks = arrayMove(columnTasks, activeIndex, overIndex);
        newTasks.forEach((task, index) => {
          handleUpdateTask(task.id, { order: index });
        });
      }
    }
  };

  const handleCreateTask = (status: TaskStatus) => {
    setNewTaskStatus(status);
    setEditingTask(null);
    setDialogOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    setDialogOpen(true);
  };

  const handleSaveTask = (taskData: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const finalTaskData = { ...taskData, status: newTaskStatus };
    addTask(finalTaskData);
  };

  const handleUpdateTask = (id: string, updates: Partial<Task>) => {
    updateTask(id, updates);
  };

  const handleDeleteTask = (id: string) => {
    deleteTask(id);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setEditingTask(null);
  };

  return (
    <Container maxWidth={false} sx={{ py: 4, px: 3 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, color: '#111827' }}>
          Kanban Board
        </Typography>
        <Typography variant="body1" sx={{ color: '#6B7280', mt: 0.5 }}>
          A business kanban board to manage tasks and projects
        </Typography>
      </Box>

      {/* Kanban Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <Box
          sx={{
            display: 'flex',
            gap: 3,
            overflowX: 'auto',
            pb: 2,
            minHeight: '600px',
          }}
        >
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={getTasksByStatus(column.id)}
              onEditTask={handleEditTask}
              onDeleteTask={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
              onCreateTask={handleCreateTask}
            />
          ))}
        </Box>

        <DragOverlay>
          {activeTask ? (
            <TaskCard
              task={activeTask}
              onEdit={handleEditTask}
              onDelete={handleDeleteTask}
              onUpdateTask={handleUpdateTask}
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Task Dialog */}
      <TaskDialog
        open={dialogOpen}
        task={editingTask}
        onClose={handleCloseDialog}
        onSave={handleSaveTask}
        onUpdate={handleUpdateTask}
      />
    </Container>
  );
};

export default Board;