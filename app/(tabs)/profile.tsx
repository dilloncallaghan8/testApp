import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

type GradeLevel = '9th' | '10th' | '11th' | '12th';

type UserData = {
  name: string;
  email: string;
  password: string;
  grade: GradeLevel;
};

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    grade: '9th',
  });

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        setUserData(JSON.parse(userDataString));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      Alert.alert('Error', 'Failed to load user data');
    }
  };

  const handleSave = async () => {
    if (!userData.name || !userData.email || !userData.password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    try {
      await AsyncStorage.setItem('userData', JSON.stringify(userData));
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      router.replace('/signup');
    } catch (error) {
      Alert.alert('Error', 'Failed to logout');
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
        Profile
      </ThemedText>

      <ScrollView style={styles.scrollView}>
        <ThemedView style={styles.formContainer}>
          <ThemedText style={styles.label}>Name:</ThemedText>
          <TextInput
            style={styles.input}
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
            editable={isEditing}
            placeholderTextColor="#666"
          />

          <ThemedText style={styles.label}>Email:</ThemedText>
          <TextInput
            style={styles.input}
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            editable={isEditing}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#666"
          />

          <ThemedText style={styles.label}>Password:</ThemedText>
          <TextInput
            style={styles.input}
            value={userData.password}
            onChangeText={(text) => setUserData({ ...userData, password: text })}
            editable={isEditing}
            secureTextEntry
            placeholderTextColor="#666"
          />

          <ThemedText style={styles.label}>Grade:</ThemedText>
          <ThemedView style={styles.gradeSelector}>
            {(['9th', '10th', '11th', '12th'] as GradeLevel[]).map((grade) => (
              <Pressable
                key={grade}
                style={[
                  styles.gradeButton,
                  userData.grade === grade && styles.selectedGrade,
                ]}
                onPress={() => isEditing && setUserData({ ...userData, grade })}
              >
                <ThemedText
                  style={[
                    styles.gradeButtonText,
                    userData.grade === grade && styles.selectedGradeText,
                  ]}
                >
                  {grade}
                </ThemedText>
              </Pressable>
            ))}
          </ThemedView>

          <ThemedView style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <Pressable style={styles.saveButton} onPress={handleSave}>
                  <ThemedText style={styles.buttonText}>Save Changes</ThemedText>
                </Pressable>
                <Pressable
                  style={styles.cancelButton}
                  onPress={() => {
                    setIsEditing(false);
                    loadUserData(); // Reload original data
                  }}
                >
                  <ThemedText style={styles.buttonText}>Cancel</ThemedText>
                </Pressable>
              </>
            ) : (
              <Pressable style={styles.editButton} onPress={() => setIsEditing(true)}>
                <ThemedText style={styles.buttonText}>Edit Profile</ThemedText>
              </Pressable>
            )}
          </ThemedView>

          <Pressable style={styles.logoutButton} onPress={handleLogout}>
            <ThemedText style={styles.logoutButtonText}>Logout</ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
  },
  scrollView: {
    flex: 1,
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
    marginBottom: 20,
  },
  formContainer: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  gradeSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 16,
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
  buttonContainer: {
    marginTop: 20,
    gap: 10,
  },
  editButton: {
    backgroundColor: '#0a7ea4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  saveButton: {
    backgroundColor: '#4caf50',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#f44336',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonText: {
    color: '#f44336',
    fontSize: 18,
    fontWeight: '600',
  },
}); 