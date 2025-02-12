import React, { useEffect, useRef, useState } from 'react';
import trashIcon from '../assets/icons/trash/trash.png';
import editIcon from '../assets/icons/trash/trash.png';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Task } from './TasksList';
import { EditTaskArgs } from '../pages/Home';

interface TasksItemProps {
    task: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: ({taskId, tasknewTitle}: EditTaskArgs) => void;
}

export function TaskItem({task, editTask, removeTask, toggleTaskDone}:TasksItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [taskNewTitleValue, setTaskNewTitleValue ] =useState(task.title)
    const TextInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setIsEditing(true);

    }

    function handleCancelEditing() {
       setTaskNewTitleValue(task.title);
       setIsEditing(false)

    }

    function handleSubmitEditing() {
        editTask({taskId: task.id, tasknewTitle: taskNewTitleValue});
        setIsEditing(false);
    }

    useEffect( () => {
        if(TextInputRef.current){
            if(isEditing){
                TextInputRef.current.focus();
            }else{
                TextInputRef.current.blur(); 
            }
        }
    }, [isEditing])


    return (
        <View style={styles.container}>
        <View style={styles.iconContainer}>
        <TouchableOpacity
          
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
          //TODO - use onPress (toggle task) prop
        >
          <View 
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
            //TODO - use style prop 
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

            <TextInput 
            value={taskNewTitleValue}
            onChangeText={setTaskNewTitleValue}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
            ref={TextInputRef}
            />

            
        </TouchableOpacity>
      </View>

      {/*<TouchableOpacity
        style={{ paddingHorizontal: 24 }}
        onPress ={ () => removeTask(task.id)}
        //TODO - use onPress (remove task) prop
      >
        <Image source={trashIcon} />
            </TouchableOpacity>*/}
            <View style={styles.iconContainer}>
                {isEditing ? (
                    <TouchableOpacity
                    style={{ paddingHorizontal: 24 }}
                    onPress ={handleCancelEditing}
                    //TODO - use onPress (remove task) prop
                  >
                    <Icon name="x" size={24} color="#b2b2b2" />
                        </TouchableOpacity>
                ): (
                    <TouchableOpacity
                    style={{ paddingHorizontal: 24 }}
                     onPress ={handleStartEditing}

                    //TODO - use onPress (remove task) prop
      >
                    <Image source={editIcon} />
                    </TouchableOpacity>
                )}
            <View style={styles.iconsDivider}/>
            <TouchableOpacity
            onPress={() => removeTask(task.id)}
            disabled={isEditing}
            >
                <Image source={trashIcon} style={{opacity: isEditing ? 0.2 : 1}}/>
            </TouchableOpacity>
      </View>
      </View>



    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',
    },
    infoContainer: {
        flex: 1,
    },

    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 12,
        paddingRight: 24,
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: 'rgba(196, 196, 196, 0.24)',
        marginHorizontal: 12
    },
  })