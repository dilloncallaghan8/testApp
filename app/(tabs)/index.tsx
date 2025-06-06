import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Linking, Pressable, StyleSheet, useColorScheme } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

const ResourceCard = ({ title, description, icon, url }: { title: string; description: string; icon: string; url: string }) => {
  const colorScheme = useColorScheme();
  
  return (
    <Pressable
      style={[
        styles.card,
        colorScheme === 'dark' ? styles.cardDark : styles.cardLight
      ]}
      onPress={() => Linking.openURL(url)}
    >
      <Ionicons 
        name={icon as any} 
        size={32} 
        color={colorScheme === 'dark' ? '#0a7ea4' : '#0a7ea4'} 
        style={styles.cardIcon} 
      />
      <ThemedView style={styles.cardContent}>
        <ThemedText type="subtitle" style={styles.cardTitle}>{title}</ThemedText>
        <ThemedText style={styles.cardDescription}>{description}</ThemedText>
      </ThemedView>
      <Ionicons 
        name="chevron-forward" 
        size={24} 
        color={colorScheme === 'dark' ? '#0a7ea4' : '#0a7ea4'} 
      />
    </Pressable>
  );
};

export default function HomeScreen() {
  const colorScheme = useColorScheme();

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
        <ThemedText type="title">Welcome to ICAN!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Career Planning</ThemedText>
        <ResourceCard
          title="Career Planning Resources"
          description="Explore career pathways, assessment tools, and resources to help you plan your future career."
          icon="briefcase-outline"
          url="https://www.icansucceed.org/career-planning"
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>College Planning</ThemedText>
        <ResourceCard
          title="College Planning Guide"
          description="Comprehensive resources to help you navigate the college planning process."
          icon="school-outline"
          url="https://www.icansucceed.org/college-planning"
        />
        <ResourceCard
          title="Explore Colleges"
          description="Find and compare colleges, learn about different types of institutions, and plan campus visits."
          icon="search-outline"
          url="https://www.icansucceed.org/college-planning/explore-colleges"
        />
        <ResourceCard
          title="Apply for College"
          description="Step-by-step guidance through the college application process, including deadlines and requirements."
          icon="document-text-outline"
          url="https://www.icansucceed.org/college-planning/apply-for-college"
        />
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Financial Aid</ThemedText>
        <ResourceCard
          title="Financial Aid Resources"
          description="Learn about scholarships, grants, loans, and other financial aid options to fund your education."
          icon="cash-outline"
          url="https://www.icansucceed.org/financial-aid"
        />
      </ThemedView>

      <ThemedView style={[
        styles.contactSection,
        colorScheme === 'dark' ? styles.contactSectionDark : styles.contactSectionLight
      ]}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>Need Help?</ThemedText>
        <ThemedText style={styles.contactText}>
          Schedule a FREE planning session with an ICAN Advisor at ICANsucceed.org/apt
        </ThemedText>
        <Pressable
          style={[
            styles.contactButton,
            colorScheme === 'dark' ? styles.contactButtonDark : styles.contactButtonLight
          ]}
          onPress={() => Linking.openURL('https://www.icansucceed.org/apt')}
        >
          <ThemedText style={styles.contactButtonText}>Schedule Appointment</ThemedText>
        </Pressable>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  image: {
    height: 200,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute'
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    color: '#0a7ea4',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardLight: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardDark: {
    backgroundColor: '#1c1c1e',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardIcon: {
    marginRight: 16,
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    opacity: 0.8,
  },
  contactSection: {
    borderRadius: 12,
    padding: 20,
    marginTop: 8,
    marginBottom: 24,
  },
  contactSectionLight: {
    backgroundColor: '#f8f9fa',
  },
  contactSectionDark: {
    backgroundColor: '#1c1c1e',
  },
  contactText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
  contactButton: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  contactButtonLight: {
    backgroundColor: '#0a7ea4',
  },
  contactButtonDark: {
    backgroundColor: '#0a7ea4',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
