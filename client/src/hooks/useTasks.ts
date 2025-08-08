import { useCallback } from 'react';

import { LOCAL_STORAGE_KEY } from '../utils/constants';
import { initialTasks } from '../data/initialTasks';
import useLocalStorage from './useLocalStorage';
import type { Task, TaskStatus } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useLocalStorage<Task[]>(LOCAL_STORAGE_KEY, initialTasks);

  const addTask = useCallback((task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setTasks(prev => [...prev, newTask]);
  }, [setTasks]);

  const updateTask = useCallback((id: string, updates: Partial<Task>) => {
    setTasks(prev => prev.map(task => 
      task.id === id 
        ? { ...task, ...updates, updatedAt: new Date().toISOString() }
        : task
    ));
  }, [setTasks]);

  const deleteTask = useCallback((id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, [setTasks]);

  const moveTask = useCallback((id: string, newStatus: TaskStatus) => {
    updateTask(id, { status: newStatus });
  }, [updateTask]);

  const getTasksByStatus = useCallback((status: TaskStatus) => {
    return tasks.filter(task => task.status === status);
  }, [tasks]);

  return {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    getTasksByStatus,
  };
};