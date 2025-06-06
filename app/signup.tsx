import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useState } from 'react';
import { Alert, Image, Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type GradeLevel = '9th' | '10th' | '11th' | '12th';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>('9th');

  const handleSignUp = async () => {
    if (!name || !email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      // Store user data
      const userData = {
        name,
        email,
        grade: selectedGrade,
      };
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      
      // Navigate to the checklist screen
      router.replace('/(tabs)/explore');
    } catch (error) {
      Alert.alert('Error', 'Failed to save user data');
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/icanLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <ThemedText type="title" style={styles.title}>
        Sign Up
      </ThemedText>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={name}
        onChangeText={setName}
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#666"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#666"
      />

      <ThemedText style={styles.label}>Select Your Grade:</ThemedText>
      <ThemedView style={styles.gradeSelector}>
        {(['9th', '10th', '11th', '12th'] as GradeLevel[]).map((grade) => (
          <Pressable
            key={grade}
            style={[
              styles.gradeButton,
              selectedGrade === grade && styles.selectedGrade,
            ]}
            onPress={() => setSelectedGrade(grade)}
          >
            <ThemedText
              style={[
                styles.gradeButtonText,
                selectedGrade === grade && styles.selectedGradeText,
              ]}
            >
              {grade}
            </ThemedText>
          </Pressable>
        ))}
      </ThemedView>

      <Pressable style={styles.signUpButton} onPress={handleSignUp}>
        <ThemedText style={styles.signUpButtonText}>Sign Up</ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  logo: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  gradeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  gradeButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  selectedGrade: {
    backgroundColor: '#0a7ea4',
  },
  gradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedGradeText: {
    color: '#fff',
  },
  signUpButton: {
    backgroundColor: '#0a7ea4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
}); 