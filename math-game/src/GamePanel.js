import React from "react";
import { useNavigate } from "react-router-dom";
import { View } from "react-native";

function GamePanel() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="title">
        <h1>Pick Your Mode</h1><br/>
      </div>
      
        <View>
            <div className="openingButtons">
                <button className="gameOption" key="addition" onClick={() => navigate("addition")}>
                +
                </button>
                <button
                    className="gameOption"
                    key="multiplication"
                    onClick={() => navigate("multiplication")}
                >
                x
                </button>
                <button className="gameOption" key="subtraction" onClick={() => navigate("subtraction")}>
                -
                </button>
                <button className="gameOption" key="division" onClick={() => navigate("division")}>
                {"\u00F7"}
                </button>
            </div>
        </View>
      </div>
    
  );
}

export default GamePanel;
