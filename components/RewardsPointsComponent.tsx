import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";

let rewardPoints = 0;
const getRewardPoints = () => rewardPoints;
export const modifyRewardPoints = (value) => { rewardPoints += value; };
const RewardsPointsComponent = () => {
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
        return rewardPoints;
    }

    return (
        <ThemedText style={{fontSize: 20, fontWeight: 'bold', color: '#000000'}}>
            {getRewardPoints()}
        </ThemedText>
    );
};
export default RewardsPointsComponent;