import { useNavigate } from "react-router-dom";
import { View } from "react-native";
import { useEffect, useState } from "react";

const HomeButton = () => {
  const navigate = useNavigate();

  const [home, setHome] = useState(false);

  useEffect(() => {
    navigate("/")
  }, [setHome]);


  return (
    <View>
        <button onClick={setHome(!home)}>
            Home
        </button>
    </View>
  );
};

export default HomeButton;