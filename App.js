import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, TextInput, Button, Text, View, Platform, TouchableOpacity, Keyboard } from 'react-native';
import { CheckBox } from '@rneui/themed';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 10,
  },
  taskTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  task: {
    fontSize: 16,
  },
  completedTask: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  removeButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default function App() {
  const [tasks, setTasks] = useState([
    { key: "1", description: "Buy groceries", completed: false },
    { key: "2", description: "Walk the dog", completed: false },
  ]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim().length > 0) {
      setTasks([
        ...tasks,
        { key: Date.now().toString(), description: newTask, completed: false },
      ]);
      setNewTask('');
      Keyboard.dismiss(); // Dismiss the keyboard after adding a task
    }
  };

  const toggleTaskCompletion = (key) => {
    setTasks(tasks.map(task =>
      task.key === key ? { ...task, completed: !task.completed } : task
    ));
  };

  const removeTask = (key) => {
    setTasks(tasks.filter(task => task.key !== key));
  };

  const handleKeyPress = (e) => {
    if (e.nativeEvent.key === 'Enter') {
      addTask();
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.taskContainer}>
      <View style={styles.taskTextContainer}>
        <CheckBox
          checked={item.completed}
          onPress={() => toggleTaskCompletion(item.key)}
        />
        <Text style={item.completed ? styles.completedTask : styles.task}>
          {item.description}
        </Text>
      </View>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeTask(item.key)}>
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task"
          value={newTask}
          onChangeText={setNewTask}
          onSubmitEditing={addTask} // Triggers addTask when pressing Enter
          onKeyPress={handleKeyPress}
        />
        <Button title="Add" onPress={addTask} />
      </View>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
        style={{ width: '100%' }} // Ensures FlatList takes the full width
      />
    </SafeAreaView>
  );
}