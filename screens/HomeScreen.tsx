import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import { RootStackParamList } from "./types";

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      {/* Cats Image (Independent) */}
      <Image source={require("../assets/cats.png")} style={styles.catsImage} />

      {/* TO-DO Text (Independent) */}
      <Text style={styles.title}>TO-DO</Text>
      <Text style ={styles.msg}>Your Tasks</Text>

      {/* Ghost , Button (Independent) */}
     
        <Image source={require("../assets/ghost.png")} style={styles.ghostImage} />
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("AddTask")}>
          <Text style={styles.buttonText}>ADD TASK</Text>
        </TouchableOpacity>
      

      {/* Bottom Decorations (Independent) */}
      <Image source={require("../assets/totoro.png")} style={styles.rightImage} />
      <Image source={require("../assets/otter.png")} style={styles.leftImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6B4C29",
    alignItems: "center",
  },
  catsImage: {
    width: 250,
    height: 300,
    resizeMode: "contain",
    position: "absolute",
    top: -70, // Fixed position, won't move other elements
  },
  title: {
    fontSize: 50,
    fontStyle: "italic",
    color: "white",
    position: "absolute",
    top: 110, // Fixed position, won't move if other elements change
  },
  
  ghostImage: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    marginBottom:10,
    position:"absolute",
    top :190,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginTop: 600, // Only affects button spacing, nothing else
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    fontStyle: "italic",
  },
  rightImage: {
    width: 100,
    height: 150,
    resizeMode: "contain",
    position: "absolute",
    bottom: -30,
    right: 5,
  },
  leftImage: {
    width: 100,
    height: 150,
    resizeMode: "contain",
    position: "absolute",
    bottom: -30,
    left: 5,
  },

  msg : {
     fontSize : 20 ,
     fontFamily :"comic sans ms",
     color : "white",
    position : "absolute",
    bottom : 50,
    top : 250,

    }
});

export default HomeScreen;
