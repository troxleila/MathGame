import { useNavigate } from "react-router-dom";
import { View } from "react-native";
import { useEffect, useState } from "react";

const HomeButton = ({ hidden }) => {
  const navigate = useNavigate();
  const [home, setHome] = useState(false);

  useEffect(() => {
    if (home === true) {
        navigate("/")
    }
  }, [home, navigate]);

  return (
    <div>
        {console.log("Hidden status")}
        {console.log(hidden)}
        { hidden ?
            <div>
            </div>
            :
            <View>
                <button onClick={() => setHome(!home)}>
                    Home
                </button>
            </View>
        }
    </div>
  );
};

export default HomeButton;