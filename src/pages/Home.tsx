import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const newTask = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false,
    }
    setTasks(old => [...old, newTask])
  }

  function handleToggleTaskDone(id: number) {
    const updateTasks = tasks.map(task => {
      if(task.id === id){
        return {
          ...task,
          done: !task.done
        }
      }
      return task
    })

    setTasks(updateTasks)
  }

  function handleRemoveTask(id: number) {
    const filterTasks = tasks.filter(task => task.id !== id);

    setTasks(filterTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})