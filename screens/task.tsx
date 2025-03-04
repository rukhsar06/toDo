import React, { useEffect, useState } from "react";
import { 
  View, Text, StyleSheet, Image, TouchableOpacity, FlatList, TextInput, Animated, ScrollView 
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { Calendar } from 'react-native-calendars';
import AsyncStorage from "@react-native-async-storage/async-storage";




const scrollY = new Animated.Value(0);

const AddTaskScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const [task, setTask] = useState("");
  const [dueDate, setDueDate] = useState(""); 
  const [tasks, setTasks] = useState<{ id : number; title: string; dueDate: string }[]>([]);

  // Load tasks from AsyncStorage when the component mounts
  useEffect(() => {
    loadTasks();
  }, []);

  // Save tasks to AsyncStorage whenever they change
  useEffect(() => {
    saveTasks();
  }, [tasks]);

  // Function to load tasks from AsyncStorage
  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem("tasks");
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error("Failed to load tasks:", error);
    }
  };

  // Function to save tasks to AsyncStorage
  const saveTasks = async () => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(tasks));
    } catch (error) {
      console.error("Failed to save tasks:", error);
    }
  };







  const handleTask = () => {
    if (task.trim() !== "" && dueDate.trim() !== "") {
      setTasks([...tasks, { id:Date.now(), title: task, dueDate }]); // unique id
      setTask("");
      setDueDate("");
    }
  };


  const deleteTask = (taskId: number) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };
  

  return (
    <View style={styles.container}>
      {/* Background Animation */}
      <Animated.View
        style={[
          styles.animatedBackground,
          {
            height: scrollY.interpolate({
              inputRange: [0, 200],
              outputRange: [300, 150],
              extrapolate: 'clamp',
            }),
          },
        ]}
      />

      {/* Scrollable Content */}
      <Animated.ScrollView
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.msg}>Your Task</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter your task..."
          placeholderTextColor="#aaa"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={handleTask}
        />

        <TextInput
          style={styles.inputduedate}
          placeholder="Enter due date (YYYY-MM-DD)..."
          placeholderTextColor="#aaa"
          value={dueDate}
          onChangeText={setDueDate}
        />

        {/* Calendar */}
        <Calendar
          style={styles.calendar}
          theme={{
            backgroundColor: '#6B4C29',
            calendarBackground: '#6B4C29',
            textSectionTitleColor: '#FFA500',
            selectedDayBackgroundColor: '#FFA500',
            selectedDayTextColor: 'white',
            todayTextColor: '#FF6347',
            dayTextColor: 'white',
            textDisabledColor: 'gray',
            monthTextColor: 'white',
            arrowColor: '#FFA500',

          }}
          onDayPress={(day: { dateString: string }) => setDueDate(day.dateString)}
          markedDates={{
            [dueDate]: { selected: true, selectedColor: '#FFA500' },
          }}
        />

        

       
        {/* Save Button */}
        <TouchableOpacity style={styles.addButton} onPress={handleTask}>
          <Text style={styles.addButtonText}>Save Task</Text>
        </TouchableOpacity>

        {/* Task List - Wrapped in a View to Fix Scrolling */}
        <View style={{ maxHeight: 300 }}>  
          <FlatList
            data={tasks}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>🔘 {item.title}</Text>
                <Text style={styles.taskText}>{item.dueDate}</Text>
                <TouchableOpacity onPress={() => deleteTask(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>🗑️</Text>
      </TouchableOpacity>
              </View>
            )}
          />
        </View>

        {/* Images */}
        <Image source={require("../assets/orangecat.png")} style={styles.cats} />
        <Image source={require("../assets/cappy.png")} style={styles.cappy} />

        {/* Back Button */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>BACK</Text>
        </TouchableOpacity>
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6B4C29",
    paddingBottom: 60,
  },
  animatedBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#6B4C29",
  },
  scrollContainer: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 10,
  },
  msg: {
    fontSize: 30,
    color: "white",
    fontFamily: "comic sans ms",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "30%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputduedate: {
    width: "30%",
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  calendar: {
    borderRadius: 5,
    elevation: 5,
    marginBottom: 20,
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
    width: "20%",
    left : "80%",
    marginTop: -200,
    position: "relative",
  },
  addButton: {
    backgroundColor: "#FFA500",
    padding: 5,
    borderRadius: 5,
    alignItems: "center",
    width: "5%",  // Increase width for better visibility
    alignSelf: "center",
    position: "relative",  // Ensure it's positioned properly
    marginTop: -135, 
    right : 380,
    
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  deleteButton: {
    backgroundColor: "transparent",
    padding: 5,
    borderRadius: 5,
    width : "5%",
    bottom : 10,
    left : 280,
  },
  deleteButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  
  taskItem: {
    backgroundColor: "#483D2C",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width : "20%",
  },
  taskText: {
    fontSize: 18,
    color: "white",
    fontFamily : "comic sans ms",
  },
  cats: {
    width: 150,
    height: 130,
    borderRadius: 10,
    alignSelf: "center",
    position: "absolute",
    right : 1500,
    bottom :-10,
  },
  cappy: {
    width: 150,
    height: 150,
    borderRadius: 10,
    alignSelf: "center",
    resizeMode: "contain",
    marginVertical: 10,  // Avoids overlapping issues
    bottom : -30,
    left : 1500,
    position: "absolute",
  },
  
  button: {
      position: "absolute",  // Keep it fixed
      bottom: 20,  // Distance from the bottom
      left: "50%",  
      transform: [{ translateX: -50 }],  // Center it horizontally
      backgroundColor: "white",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 20,
      zIndex: 10,  // Ensure it stays on top
    
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },

  tempButton: {
    position: "absolute",
    bottom: 20,
    left: "50%",
    transform: [{ translateX: 50 }],
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    zIndex: 10,
  },

  temptext: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddTaskScreen;
