import { useState, useEffect } from "react";

const CountdownTimer = ({ initialSeconds = 0, setTimeOut, restart, start }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [active, setActive] = useState(start);

  useEffect(() => {
    let timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (start === false) {
        setSeconds(initialSeconds);
      } else {
        clearInterval(timer);
        setTimeOut(true);
        setActive(false);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [active, seconds]);

  useEffect(() => {
    handleReset();
  }, [restart]);

  useEffect(() => {
    setActive(start);
  }, [start]);

  useEffect(() => {
    setSeconds(initialSeconds);
  }, [active]);

  const handleReset = () => {
    setSeconds(initialSeconds);
  };

  return (
    <div>
      {seconds === 0 ? (
        <p>Time's up!</p>
      ) : (
        <p>Time Remaining: {seconds < 10 ? `0${seconds}` : seconds}</p>
      )}
    </div>
  );
};

export default CountdownTimer;
