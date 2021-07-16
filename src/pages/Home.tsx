import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const findTask = tasks.find(task => task.title === newTaskTitle);

    if(findTask){
      Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
      return;
    }

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
    Alert.alert('Remover item','em certeza que você deseja remover esse item?',[
      {
        style: 'cancel',
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const filterTasks = tasks.filter(task => task.id !== id);

    setTasks(filterTasks)
        }
      }
    ])
  }

  function handleEditTask(taskId: number, taskNewTitle: string){
    const updateTasks = tasks.map(task => {
      if(task.id === taskId){
        return {
          ...task,
          title: taskNewTitle
        }
      }
      return task
    })

    setTasks(updateTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        editTask={handleEditTask}
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