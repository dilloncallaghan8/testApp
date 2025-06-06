import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router, useFocusEffect } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Pressable, StyleSheet, View, useColorScheme } from 'react-native';

type Task = {
  id: string;
  text: string;
  done: boolean;
};

type GradeLevel = '9th' | '10th' | '11th' | '12th';

type ChecklistData = {
  [key in GradeLevel]: {
    [key: string]: Task[]; // key is month name
  };
};

const checklists: ChecklistData = {
  '9th': {
    'August': [
      { id: '1', text: 'Schedule a planning session with ICAN', done: false },
      { id: '2', text: 'Attend Freshman Transition event', done: false },
      { id: '3', text: 'Sign up for ICAN Tip of the Week', done: false },
      { id: '4', text: 'Use a planner', done: false },
      { id: '5', text: 'Talk to adults about their careers', done: false },
    ],
    'September': [
      { id: '1', text: 'Join extracurriculars and track them with an activities resume', done: false },
      { id: '2', text: 'Attend the Golden Circle College & Career Fair', done: false },
      { id: '3', text: 'Explore career assessments', done: false },
    ],
    'October': [
      { id: '1', text: 'Explore education and training options (CollegeRaptor, CTE programs, apprenticeships)', done: false },
      { id: '2', text: 'Research career pathways', done: false },
    ],
    'November': [
      { id: '1', text: 'Talk with parents about future plans', done: false },
      { id: '2', text: 'Meet with counselor about course selection', done: false },
      { id: '3', text: 'Read regularly', done: false },
      { id: '4', text: 'Volunteer', done: false },
    ],
    'December': [
      { id: '1', text: 'Learn computer applications (Word, Excel, etc.)', done: false },
      { id: '2', text: 'Research 3 careers and related training programs', done: false },
      { id: '3', text: 'Learn about financial aid options', done: false },
    ],
    'January': [
      { id: '1', text: 'Explore skill-building at ICAN\'s career planning site', done: false },
      { id: '2', text: 'Talk to parents about a college savings plan', done: false },
    ],
    'February': [
      { id: '1', text: 'Research high-growth jobs and their required training', done: false },
      { id: '2', text: 'Choose 10th-grade classes with counselor', done: false },
      { id: '3', text: 'Identify job shadow options', done: false },
    ],
    'March': [
      { id: '1', text: 'Find summer camps in your area of interest', done: false },
      { id: '2', text: 'Keep GPA strong', done: false },
      { id: '3', text: 'Attend the Future Ready Career & College Fair', done: false },
    ],
    'April': [
      { id: '1', text: 'Talk to seniors about their planning process', done: false },
      { id: '2', text: 'Visit a college campus or take a virtual tour', done: false },
      { id: '3', text: 'Build relationships for future recommendations', done: false },
    ],
    'May': [
      { id: '1', text: 'Job shadow, volunteer, or intern', done: false },
      { id: '2', text: 'Start a summer reading list', done: false },
      { id: '3', text: 'Learn about athletic requirements if you want to play sports', done: false },
    ],
    'June': [
      { id: '1', text: 'Attend a summer camp on a college campus (if applicable)', done: false },
      { id: '2', text: 'Create an activities resume', done: false },
      { id: '3', text: 'Talk to adults about their career choices', done: false },
    ],
    'July': [
      { id: '1', text: 'Review career assessment and explore matching colleges', done: false },
      { id: '2', text: 'Join hobbies tied to career interests', done: false },
      { id: '3', text: 'Stay open to changing goals', done: false },
    ],
  },
  '10th': {
    'August': [
      { id: '1', text: 'Visit ICAN Center for career/college planning', done: false },
      { id: '2', text: 'Sign up for ICAN Tip of the Week', done: false },
      { id: '3', text: 'Find a mentor', done: false },
      { id: '4', text: 'Attend career planning events', done: false },
    ],
    'September': [
      { id: '1', text: 'Attend Golden Circle Fair', done: false },
      { id: '2', text: 'Register for PreACT or PSAT/NMSQT', done: false },
      { id: '3', text: 'Sign up for job shadows', done: false },
      { id: '4', text: 'Join school/community activities', done: false },
    ],
    'October': [
      { id: '1', text: 'Compare careers and research job characteristics', done: false },
      { id: '2', text: 'Attend a college fair', done: false },
      { id: '3', text: 'Take/update career assessment', done: false },
    ],
    'November': [
      { id: '1', text: 'Discuss admission requirements with counselor', done: false },
      { id: '2', text: 'Explore tuition and financial aid options', done: false },
      { id: '3', text: 'Talk to adults about their careers', done: false },
    ],
    'December': [
      { id: '1', text: 'Meet college reps/career speakers', done: false },
      { id: '2', text: 'Schedule advising with ICAN', done: false },
      { id: '3', text: 'Learn about alternate education options', done: false },
      { id: '4', text: 'Volunteer over winter break', done: false },
    ],
    'January': [
      { id: '1', text: 'Keep track of extracurriculars in your activities resume', done: false },
      { id: '2', text: 'Review types of financial aid', done: false },
      { id: '3', text: 'Review financial plan for post-high school', done: false },
    ],
    'February': [
      { id: '1', text: 'Attend ICAN planning nights', done: false },
      { id: '2', text: 'Confirm junior year classes align with your career path', done: false },
      { id: '3', text: 'Explore career pathways using MyACT', done: false },
    ],
    'March': [
      { id: '1', text: 'Consider AP classes', done: false },
      { id: '2', text: 'Attend ICAN Future Ready Fair', done: false },
      { id: '3', text: 'Talk to professionals in your field of interest', done: false },
      { id: '4', text: 'Tour colleges if on vacation', done: false },
    ],
    'April': [
      { id: '1', text: 'Review college financial plan', done: false },
      { id: '2', text: 'Explore scholarships and savings strategies', done: false },
      { id: '3', text: 'Gain experience via job shadowing or internships', done: false },
      { id: '4', text: 'Use ROCI Tool to compare career ROI', done: false },
    ],
    'May': [
      { id: '1', text: 'Check status of savings plans', done: false },
      { id: '2', text: 'Ask counselor about summer programs', done: false },
      { id: '3', text: 'Look for summer jobs related to your interests', done: false },
    ],
    'June': [
      { id: '1', text: 'Keep reading over the summer', done: false },
      { id: '2', text: 'Join hobbies that develop career interests', done: false },
      { id: '3', text: 'Learn about athletic eligibility', done: false },
    ],
    'July': [
      { id: '1', text: 'Tour college campuses during camp visits', done: false },
      { id: '2', text: 'Talk to parents about cost planning', done: false },
      { id: '3', text: 'Maintain connections for future recommendations', done: false },
    ],
  },
  '11th': {
    'August': [
      { id: '1', text: 'Sign up for ICAN Tip of the Week', done: false },
      { id: '2', text: 'Learn about college fairs/events', done: false },
      { id: '3', text: 'Keep GPA up', done: false },
      { id: '4', text: 'Review/start a savings plan', done: false },
      { id: '5', text: 'Take a career assessment', done: false },
      { id: '6', text: 'Talk to parents about careers', done: false },
    ],
    'September': [
      { id: '1', text: 'Attend the Golden Circle College & Career Fair', done: false },
      { id: '2', text: 'Register for the PSAT/NMSQT', done: false },
      { id: '3', text: 'Explore military and apprenticeship options', done: false },
      { id: '4', text: 'Schedule ICAN planning session', done: false },
    ],
    'October': [
      { id: '1', text: 'Attend college/career fairs', done: false },
      { id: '2', text: 'Explore Iowa colleges', done: false },
      { id: '3', text: 'Talk with your counselor about admission readiness', done: false },
    ],
    'November': [
      { id: '1', text: 'Review college brochures', done: false },
      { id: '2', text: 'Make a list of 10–15 colleges', done: false },
      { id: '3', text: 'Download the College Checklist', done: false },
      { id: '4', text: 'Start SAT/ACT planning', done: false },
      { id: '5', text: 'Research scholarships', done: false },
    ],
    'December': [
      { id: '1', text: 'Register for January SAT or February ACT', done: false },
      { id: '2', text: 'Meet with college reps/career speakers', done: false },
      { id: '3', text: 'Use CollegeRaptor.com to compare colleges', done: false },
      { id: '4', text: 'Schedule planning with ICAN', done: false },
    ],
    'January': [
      { id: '1', text: 'Register for March SAT', done: false },
      { id: '2', text: 'Attend a financial aid seminar', done: false },
      { id: '3', text: 'Plan campus visits based on \'No School\' days', done: false },
    ],
    'February': [
      { id: '1', text: 'Create an education/training budget (use ROCI tool)', done: false },
      { id: '2', text: 'Choose senior classes aligned with your career path', done: false },
      { id: '3', text: 'Register for April ACT', done: false },
      { id: '4', text: 'Talk about AP/CLEP/honors courses', done: false },
    ],
    'March': [
      { id: '1', text: 'Attend the ICAN Future Ready Fair', done: false },
      { id: '2', text: 'Schedule visits to colleges/apprenticeships', done: false },
      { id: '3', text: 'Register for May SAT', done: false },
    ],
    'April': [
      { id: '1', text: 'Consider summer college courses', done: false },
      { id: '2', text: 'Plan for AP exams', done: false },
      { id: '3', text: 'Compare/rank colleges', done: false },
      { id: '4', text: 'Register for June ACT/SAT', done: false },
      { id: '5', text: 'Update activities resume', done: false },
    ],
    'May': [
      { id: '1', text: 'Narrow top college/apprenticeship choices', done: false },
      { id: '2', text: 'Take AP exams', done: false },
      { id: '3', text: 'Get a career-related summer job', done: false },
      { id: '4', text: 'Update resume/portfolio', done: false },
    ],
    'June': [
      { id: '1', text: 'Schedule final campus visits', done: false },
      { id: '2', text: 'Start private scholarship applications', done: false },
      { id: '3', text: 'Save money for college', done: false },
      { id: '4', text: 'Review athletic requirements (if applicable)', done: false },
    ],
    'July': [
      { id: '1', text: 'Review admission applications', done: false },
      { id: '2', text: 'Choose recommendation writers', done: false },
      { id: '3', text: 'Create a spending plan with parents', done: false },
    ],
  },
  '12th': {
    'August': [
      { id: '1', text: 'Sign up for ICAN Senior Alerts', done: false },
      { id: '2', text: 'Gather info on admissions, scholarships, aid', done: false },
      { id: '3', text: 'Talk to admissions reps about retesting SAT/ACT', done: false },
      { id: '4', text: 'Register for tests', done: false },
    ],
    'September': [
      { id: '1', text: 'Create a StudentAid.gov account', done: false },
      { id: '2', text: 'Schedule ICAN college/career planning session', done: false },
      { id: '3', text: 'Begin application essays and recommendation requests', done: false },
      { id: '4', text: 'Update activities resume', done: false },
    ],
    'October': [
      { id: '1', text: 'Review FAFSA priority dates', done: false },
      { id: '2', text: 'Schedule FAFSA completion appointment', done: false },
      { id: '3', text: 'Submit admissions and scholarship apps by Nov 1', done: false },
      { id: '4', text: 'Research military benefits', done: false },
    ],
    'November': [
      { id: '1', text: 'Finalize and submit applications', done: false },
      { id: '2', text: 'Start free scholarship searches', done: false },
      { id: '3', text: 'Set up StudentAid.gov account (if not done)', done: false },
      { id: '4', text: 'Register for December ACT', done: false },
    ],
    'December': [
      { id: '1', text: 'Save copies of submitted forms', done: false },
      { id: '2', text: 'Check with counselor on local/state scholarships', done: false },
      { id: '3', text: 'Monitor for acceptance letters', done: false },
      { id: '4', text: 'Submit FAFSA before earliest deadline', done: false },
    ],
    'January': [
      { id: '1', text: 'Review FAFSA submission and aid plans with ICAN', done: false },
      { id: '2', text: 'Maintain strong grades', done: false },
      { id: '3', text: 'Verify if additional aid forms are needed', done: false },
      { id: '4', text: 'Send updated transcript and housing apps', done: false },
    ],
    'February': [
      { id: '1', text: 'Review FAFSA Summary', done: false },
      { id: '2', text: 'Submit missing financial forms', done: false },
      { id: '3', text: 'Meet with ICAN advisor to compare aid packages', done: false },
      { id: '4', text: 'Review college budget with family', done: false },
    ],
    'March': [
      { id: '1', text: 'Use College Funding Forecaster', done: false },
      { id: '2', text: 'Prepare for May 1 Decision Day', done: false },
      { id: '3', text: 'Notify other colleges if not attending', done: false },
      { id: '4', text: 'Complete loan paperwork', done: false },
    ],
    'April': [
      { id: '1', text: 'Take AP/CLEP exams', done: false },
      { id: '2', text: 'Finalize summer job', done: false },
      { id: '3', text: 'Submit final transcript', done: false },
      { id: '4', text: 'Return all documents to your college', done: false },
      { id: '5', text: 'Notify college of scholarships', done: false },
    ],
    'May': [
      { id: '1', text: 'Confirm tools/certifications for apprenticeships', done: false },
      { id: '2', text: 'Create/review budget with parents', done: false },
      { id: '3', text: 'Attend orientation', done: false },
    ],
    'June': [
      { id: '1', text: 'Use ICAN\'s Packing List', done: false },
      { id: '2', text: 'Coordinate with roommate', done: false },
      { id: '3', text: 'Thank your support network', done: false },
    ],
    'July': [
      { id: '1', text: 'Renew FAFSA for following year', done: false },
    ],
  },
};

export default function ChecklistScreen() {
  const [currentGrade, setCurrentGrade] = useState<GradeLevel>('9th');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentMonth, setCurrentMonth] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [completedCount, setCompletedCount] = useState(0);
  const colorScheme = useColorScheme();

  // Load user data and check for grade changes
  const loadUserData = useCallback(async () => {
    try {
      const userDataString = await AsyncStorage.getItem('userData');
      if (userDataString) {
        const userData = JSON.parse(userDataString);
        // Only update if the grade has changed
        if (userData.grade !== currentGrade) {
          setCurrentGrade(userData.grade);
        }
        setUserName(userData.name);
      } else {
        router.replace('/signup');
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      router.replace('/signup');
    }
  }, [currentGrade]);

  // Check for user data changes when screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [loadUserData])
  );

  // Set current month
  useEffect(() => {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const currentDate = new Date();
    const monthName = months[currentDate.getMonth()];
    setCurrentMonth(monthName);
  }, []);

  // Load saved tasks when grade or month changes
  useEffect(() => {
    const loadSavedTasks = async () => {
      try {
        const savedTasksKey = `tasks_${currentGrade}_${currentMonth}`;
        const savedTasksString = await AsyncStorage.getItem(savedTasksKey);
        
        if (savedTasksString) {
          // If we have saved tasks, use them
          const savedTasks = JSON.parse(savedTasksString);
          setTasks(savedTasks);
        } else {
          // Otherwise, use the default tasks from checklists
          const defaultTasks = checklists[currentGrade][currentMonth] || [];
          setTasks(defaultTasks);
          // Save the default tasks
          await AsyncStorage.setItem(savedTasksKey, JSON.stringify(defaultTasks));
        }
      } catch (error) {
        console.error('Error loading saved tasks:', error);
        // Fallback to default tasks if there's an error
        setTasks(checklists[currentGrade][currentMonth] || []);
      }
    };

    if (currentGrade && currentMonth) {
      loadSavedTasks();
    }
  }, [currentGrade, currentMonth]);

  // Update completed count whenever tasks change
  useEffect(() => {
    setCompletedCount(tasks.filter(task => task.done).length);
  }, [tasks]);

  const toggleTask = async (id: string) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, done: !task.done } : task
    );
    
    setTasks(updatedTasks);

    // Save the updated tasks
    try {
      const savedTasksKey = `tasks_${currentGrade}_${currentMonth}`;
      await AsyncStorage.setItem(savedTasksKey, JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const getTaskContainerStyle = (isDone: boolean) => {
    return [
      styles.taskContainer,
      colorScheme === 'dark' ? styles.taskContainerDark : styles.taskContainerLight,
      isDone && (colorScheme === 'dark' ? styles.taskDoneDark : styles.taskDoneLight),
    ];
  };

  const getCheckboxColor = (isDone: boolean) => {
    if (isDone) return '#4caf50';
    return colorScheme === 'dark' ? '#666' : '#aaa';
  };

  return (
    <ThemedView style={styles.container}>
      <Image
        source={require('@/assets/images/icanLogo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      {userName && (
        <ThemedText style={styles.welcomeText}>
          Welcome, {userName}!
        </ThemedText>
      )}

      <ThemedView style={styles.headerContainer}>
        <ThemedText type="title" style={styles.title}>
          {currentMonth} Checklist
        </ThemedText>
        <ThemedText style={styles.subtitle}>
          {currentGrade} Grade
        </ThemedText>
        <ThemedView style={styles.progressContainer}>
          <ThemedText style={styles.progressText}>
            {completedCount} of {tasks.length} tasks completed
          </ThemedText>
          <View style={[
            styles.progressBar,
            colorScheme === 'dark' ? styles.progressBarDark : styles.progressBarLight
          ]}>
            <View 
              style={[
                styles.progressFill,
                { width: `${(completedCount / tasks.length) * 100}%` }
              ]} 
            />
          </View>
        </ThemedView>
      </ThemedView>

      <FlatList
        contentContainerStyle={styles.listContainer}
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => toggleTask(item.id)}
            style={getTaskContainerStyle(item.done)}
          >
            <View style={styles.checkboxContainer}>
              <Ionicons
                name={item.done ? 'checkbox' : 'square-outline'}
                size={24}
                color={getCheckboxColor(item.done)}
              />
            </View>
            <ThemedText
              style={[
                styles.taskText,
                item.done && (colorScheme === 'dark' ? styles.textDoneDark : styles.textDoneLight)
              ]}
              numberOfLines={0}
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
    paddingTop: 60,
  },
  logo: {
    width: '100%',
    height: 120,
    alignSelf: 'center',
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
  },
  headerContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.7,
    marginBottom: 16,
  },
  progressContainer: {
    marginTop: 8,
  },
  progressText: {
    fontSize: 14,
    opacity: 0.7,
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarLight: {
    backgroundColor: '#f0f0f0',
  },
  progressBarDark: {
    backgroundColor: '#333',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4caf50',
    borderRadius: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  taskContainerLight: {
    backgroundColor: '#fff',
    shadowColor: '#000',
  },
  taskContainerDark: {
    backgroundColor: '#1c1c1e',
    shadowColor: '#000',
  },
  checkboxContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  taskDoneLight: {
    backgroundColor: '#f8f9fa',
  },
  taskDoneDark: {
    backgroundColor: '#2c2c2e',
  },
  textDoneLight: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
  textDoneDark: {
    textDecorationLine: 'line-through',
    opacity: 0.5,
  },
});
