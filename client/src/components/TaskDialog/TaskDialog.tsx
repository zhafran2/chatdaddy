import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import { Add, Delete } from '@mui/icons-material';
import type { Task, TaskStatus, SubTask } from '../../types';
import { COLUMNS } from '../../utils/constants';

interface TaskDialogProps {
  open: boolean;
  task: Task | null;
  onClose: () => void;
  onSave: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onUpdate: (id: string, updates: Partial<Task>) => void;
}

const TaskDialog: React.FC<TaskDialogProps> = ({
  open,
  task,
  onClose,
  onSave,
  onUpdate,
}) => {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<TaskStatus>('not-started');
  const [dueDate, setDueDate] = useState('');
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setStatus(task.status);
      setDueDate(task.dueDate || '');
      setSubTasks(task.subTasks || []);
    } else {
      setTitle('');
      setStatus('not-started');
      setDueDate('');
      setSubTasks([]);
    }
  }, [task]);

  const handleSave = () => {
    if (!title.trim()) return;

    const taskData = {
      title: title.trim(),
      status,
      dueDate: dueDate || undefined,
      subTasks: subTasks.length > 0 ? subTasks : undefined,
    };

    if (task) {
      onUpdate(task.id, taskData);
    } else {
      onSave(taskData);
    }

    handleClose();
  };

  const handleClose = () => {
    onClose();
    setTitle('');
    setStatus('not-started');
    setDueDate('');
    setSubTasks([]);
  };

  const addSubTask = () => {
    const newSubTask: SubTask = {
      id: Date.now().toString(),
      title: '',
      completed: false,
    };
    setSubTasks([...subTasks, newSubTask]);
  };

  const updateSubTask = (id: string, title: string) => {
    setSubTasks(subTasks.map(st => st.id === id ? { ...st, title } : st));
  };

  const removeSubTask = (id: string) => {
    setSubTasks(subTasks.filter(st => st.id !== id));
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{task ? 'Edit Task' : 'Create New Task'}</DialogTitle>
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <TextField
            autoFocus
            label="Task Title"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={(e) => setStatus(e.target.value as TaskStatus)}
            >
              {COLUMNS.map((column) => (
                <MenuItem key={column.id} value={column.id}>
                  {column.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Due Date"
            type="date"
            fullWidth
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 3 }}
          />

          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
              <Typography variant="subtitle2">Subtasks</Typography>
              <Button
                startIcon={<Add />}
                onClick={addSubTask}
                size="small"
                variant="outlined"
              >
                Add Subtask
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />

            {subTasks.map((subtask, index) => (
              <Box key={subtask.id} display="flex" alignItems="center" mb={1}>
                <TextField
                  placeholder={`Subtask ${index + 1}`}
                  value={subtask.title}
                  onChange={(e) => updateSubTask(subtask.id, e.target.value)}
                  size="small"
                  fullWidth
                />
                <IconButton
                  onClick={() => removeSubTask(subtask.id)}
                  color="error"
                  size="small"
                  sx={{ ml: 1 }}
                >
                  <Delete fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={handleSave}
          variant="contained"
          disabled={!title.trim()}
        >
          {task ? 'Update' : 'Create'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDialog;