import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";

let healthPoints = 0;
const getHealthPoints = () => healthPoints;
export const modifyHealthPoints = (value) => { healthPoints += value; };
const HealthPointComponent = () => {
  const [currentValue, setCurrentValue] = useState('');

  useEffect(() => {
    // Function to update the current date
    const updateValue = () => {
      const value = getValue();
      setCurrentValue(value.toString());
    };

    // Update the date initially
    updateValue();

    // Set up interval to update the date every second
    const intervalId = setInterval(updateValue, 1000);

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const getValue = () => {
      return healthPoints;
  }

    return (
        <ThemedText style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
            {getHealthPoints()}
        </ThemedText>
    );
};
export default HealthPointComponent;