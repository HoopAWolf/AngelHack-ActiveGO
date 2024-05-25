import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";

let pointsEarnedCount = 0;
const getPointsEarnedCount = () => pointsEarnedCount;
export const modifyPointsEarnedCount = (value) => { pointsEarnedCount += value; };
const PointsEarnedComponent = () => {
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
        return pointsEarnedCount;
    }

    return (
        <ThemedText style={{fontSize: 24, fontWeight: 'bold', color: '#000000', paddingRight: 5, alignSelf: 'flex-end'}}>
            {getPointsEarnedCount()}
        </ThemedText>
    );
};
export default PointsEarnedComponent;