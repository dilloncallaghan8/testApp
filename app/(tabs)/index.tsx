import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/icanLogo.png')}
          style={styles.image}
          contentFit='contain'
          
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Hello Students!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 1: Academic Planning</ThemedText>
        <ThemedText>
             {`As a high school student, you hear a lot of advice about what it takes to be successful.

          - Get involved in different activities.
          - Plan for the future.
          - Achieve high grades.
          - Challenge yourself with harder classes.
          - Be responsible.
          - Study hard.
          - Go out and have some fun.
          - Earn some money...`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore Colleges</ThemedText>
        <ThemedText>
          {`Think about what you need; that's what will make the college experience truly valuable for you.
          
          - Location
          - Type
          - Academic Programs
          - Campus Life
          - Cost and Financial Aid Availability
          - Facilities
          - Living Accommodations 
          - Campus Safety`}
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Apply for College</ThemedText>
        <ThemedText>
          {`Each college has its own application process including deadlines, evaluation criteria, and application requirements. Generally your application will be evaluated based on your:

          - Test scores.
          - Class rank.
          - Academic record.
          - Classes completed
          - Grades achieved
          - Extracurricular activities.
          - Work and volunteer experience.
          - Honors and awards.
          - Essay.`}
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  image: {
    height: 200,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  }
});
