import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Image, Pressable, ScrollView, StyleSheet, TextInput, useColorScheme } from 'react-native';

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
  const [userData, setUserData] = useState<UserData>({
    name: '',
    email: '',
    password: '',
    grade: '9th',
  });
  const [isEditing, setIsEditing] = useState(false);
  const colorScheme = useColorScheme();

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const data = JSON.parse(userDataString);
        setUserData(data);
      } else {
        router.replace('/signup');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      router.replace('/signup');
    }
  };

  const handleSave = async () => {
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

  const getInputStyle = () => {
    return [
      styles.input,
      colorScheme === 'dark' ? styles.inputDark : styles.inputLight,
    ];
  };

  const getGradeButtonStyle = (isSelected: boolean) => {
    return [
      styles.gradeButton,
      colorScheme === 'dark' ? styles.gradeButtonDark : styles.gradeButtonLight,
      isSelected && (colorScheme === 'dark' ? styles.selectedGradeDark : styles.selectedGradeLight),
    ];
  };

  const getGradeButtonTextStyle = (isSelected: boolean) => {
    return [
      styles.gradeButtonText,
      isSelected && styles.selectedGradeText,
    ];
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
            style={getInputStyle()}
            value={userData.name}
            onChangeText={(text) => setUserData({ ...userData, name: text })}
            editable={isEditing}
            placeholderTextColor={colorScheme === 'dark' ? '#999' : '#666'}
          />

          <ThemedText style={styles.label}>Email:</ThemedText>
          <TextInput
            style={getInputStyle()}
            value={userData.email}
            onChangeText={(text) => setUserData({ ...userData, email: text })}
            editable={isEditing}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={colorScheme === 'dark' ? '#999' : '#666'}
          />

          <ThemedText style={styles.label}>Password:</ThemedText>
          <TextInput
            style={getInputStyle()}
            value={userData.password}
            onChangeText={(text) => setUserData({ ...userData, password: text })}
            editable={isEditing}
            secureTextEntry
            placeholderTextColor={colorScheme === 'dark' ? '#999' : '#666'}
          />

          <ThemedText style={styles.label}>Grade:</ThemedText>
          <ThemedView style={styles.gradeSelector}>
            {(['9th', '10th', '11th', '12th'] as GradeLevel[]).map((grade) => (
              <Pressable
                key={grade}
                style={getGradeButtonStyle(userData.grade === grade)}
                onPress={() => isEditing && setUserData({ ...userData, grade })}
              >
                <ThemedText
                  style={getGradeButtonTextStyle(userData.grade === grade)}
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
                    loadUserData();
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

          <Pressable 
            style={[
              styles.logoutButton,
              colorScheme === 'dark' ? styles.logoutButtonDark : styles.logoutButtonLight
            ]} 
            onPress={handleLogout}
          >
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
    padding: 15,
    borderRadius: 10,
    fontSize: 16,
  },
  inputLight: {
    backgroundColor: '#f0f0f0',
  },
  inputDark: {
    backgroundColor: '#2c2c2e',
    color: '#fff',
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
  },
  gradeButtonLight: {
    backgroundColor: '#f0f0f0',
  },
  gradeButtonDark: {
    backgroundColor: '#2c2c2e',
  },
  selectedGradeLight: {
    backgroundColor: '#0a7ea4',
  },
  selectedGradeDark: {
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
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  logoutButtonLight: {
    backgroundColor: '#f0f0f0',
  },
  logoutButtonDark: {
    backgroundColor: '#2c2c2e',
  },
  logoutButtonText: {
    color: '#f44336',
    fontSize: 18,
    fontWeight: '600',
  },
}); 