import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet } from 'react-native';

type Task = {
  id: string;
  text: string;
  done: boolean;
};

const initialChecklist: Task[] = [
  { id: '1', text: 'Schedule a FREE planning session with an ICAN Advisor at ICANsucceed.org/apt.  Virtual appointments are available using Zoom.', done: false },
  { id: '2', text: 'Check out an ICAN Freshman Transition event at your school or stream online by visiting ICANsucceed.org/videos', done: false },
  { id: '3', text: 'Prepare for the future with the ICAN Tip of the Week; sign up at ICANsucceed.org/signup.', done: false },
  { id: '4', text: 'Stay organized with a planner or planning app.', done: false },
  { id: '5', text: 'Ask your parents and other adults what they like and dislike about their careers.  Find out what type of training or education is required for each job.', done: false },
];

export default function ChecklistScreen() {
  const [tasks, setTasks] = useState(initialChecklist);

  const toggleTask = (id: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <ThemedView style={styles.container}>
      {/* Logo at the top */}
      <Image
        source={require('@/assets/images/icanLogo.png')} // Replace with your logo path
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title */}
      <ThemedText type="title" style={styles.title}>
        August Checklist for Freshman
      </ThemedText>

      {/* Checklist */}
      <FlatList
        contentContainerStyle={{ paddingTop: 20 }}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleTask(item.id)}
            style={[
              styles.taskContainer,
              item.done && styles.taskDone,
            ]}
          >
            <Ionicons
              name={item.done ? 'checkbox' : 'square-outline'}
              size={24}
              color={item.done ? '#4caf50' : '#aaa'}
              style={{ marginRight: 12 }}
            />
            <ThemedText
              style={[styles.taskText, item.done && styles.textDone]}
              numberOfLines={0} // Allow unlimited lines
            >
              {item.text}
            </ThemedText>
          </Pressable>
        )}

      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 60, // push everything down to make room for the logo
  },
  logo: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    marginBottom: 10,
  },
    taskContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', // important for multi-line text!
    paddingVertical: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: 1,
  },

  taskText: {
    flex: 1, // let it take remaining space
    flexWrap: 'wrap',
    fontSize: 16,
  },

  taskDone: {
    backgroundColor: '#e0ffe0',
  },

  textDone: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
});
