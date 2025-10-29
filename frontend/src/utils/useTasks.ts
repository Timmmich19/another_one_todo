import { useState, useEffect } from 'react';
import type { Task, TaskCreate, TaskUpdate } from '../types';
import { apiClient } from '../utils/api';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Загрузить задачи
  const loadTasks = async (status?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiClient.getTasks(status);
      setTasks(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  // Создать задачу
  const createTask = async (taskData: TaskCreate): Promise<boolean> => {
    setError(null);
    try {
      const newTask = await apiClient.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create task');
      return false;
    }
  };

  // Обновить задачу
  const updateTask = async (id: string, taskData: TaskUpdate): Promise<boolean> => {
    setError(null);
    try {
      const updatedTask = await apiClient.updateTask(id, taskData);
      setTasks(prev => prev.map(task => 
        task.id === id ? updatedTask : task
      ));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
      return false;
    }
  };

  // Удалить задачу
  const deleteTask = async (id: string): Promise<boolean> => {
    setError(null);
    try {
      await apiClient.deleteTask(id);
      setTasks(prev => prev.filter(task => task.id !== id));
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
      return false;
    }
  };

  // Загружаем задачи при монтировании
  useEffect(() => {
    loadTasks();
  }, []);

  return {
    tasks,
    loading,
    error,
    loadTasks,
    createTask,
    updateTask,
    deleteTask,
    refetch: () => loadTasks(),
  };
};