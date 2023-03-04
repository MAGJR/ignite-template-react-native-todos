import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export interface EditTaskArgs {
  tasknewTitle: string,
  taskId: number,
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskWithSameTitle = tasks.find(task =>  task.title === newTaskTitle);
    if(taskWithSameTitle) {
      return Alert.alert('Task já cadastrada', 'você não pode cadastrar uma com o mesmo nome');
    }
    const newTask = {
      id: new Date ().getTime(),
      title: newTaskTitle,
      done: false 
      //TODO - add new task
    }

    

    setTasks(oldTask => [...oldTask, newTask]);
  }

  function handleToggleTaskDone(id: number) {
    const updatedTask = tasks.map(task =>({...task}))

    const taskToBeMarkedDone = updatedTask.find(task => task.id === id);

    if(!taskToBeMarkedDone)
    return;

    taskToBeMarkedDone.done = !taskToBeMarkedDone;

    setTasks(updatedTask)
    //TODO - toggle task done if exists
  }

  function handleRemoveTask(id: number) {
    Alert.alert('Remover item', 'Tem certeza que você deseja remover esse item?', [
      {
        style: 'cancel', 
        text: 'Não'
      },
      {
        style: 'destructive',
        text: 'Sim',
        onPress: () => {
          const UpdatedTask = tasks.filter(task => task.id !== id);
          
          setTasks(UpdatedTask)
        }
      }
    ])
   
    
    
    
    //TODO - remove task from state
  }

  function handleEditTask({tasknewTitle, taskId}: EditTaskArgs) {
   const updatedTask = tasks.map(task =>({...task}))

   const taskToBeUpdated = updatedTask.find(task => task.id === taskId);

   if(!taskToBeUpdated)
   return;

   taskToBeUpdated.title = tasknewTitle ;
   setTasks(updatedTask)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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