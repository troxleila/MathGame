import React from "react";
import { useNavigate } from "react-router-dom";
import { StyleSheet, View } from "react-native";

function GamePanel() {
  const navigate = useNavigate();

  return (
    <div className="container">
      <div className="title">
        <h1>Pick Your Mode</h1>
      </div>
      <View style={styles.buttonContainer}>
        <button style={styles.button} key="addition" onClick={() => navigate("addition")}>
          +
        </button>
        <button
          style={styles.button}
          key="multiplication"
          onClick={() => navigate("multiplication")}
        >
          x
        </button>
        <button style={styles.button} key="subtraction" onClick={() => navigate("subtraction")}>
          -
        </button>
        <button style={styles.button} key="division" onClick={() => navigate("division")}>
          {"\u00F7"}
        </button>
      </View>
    </div>
  );
}

export default GamePanel;

const styles = StyleSheet.create({
  buttonContainer: {
    width: "50%",
    backgroundColor: "lightgreen",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    width: "50%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "white",
    borderBottomWidth: 1,
    borderRightWidth: 1,
  },
});
