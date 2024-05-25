import { useEffect, useState } from "react";
import { ThemedText } from "./ThemedText";

let challengesClearedCount = 0;
const getChallengesClearedCount = () => challengesClearedCount;
export const modifyChallengesClearedCountPoints = (value) => { challengesClearedCount += value; };
const ChallengesClearedComponent = () => {
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
        return challengesClearedCount;
    }

    return (
        <ThemedText style={{fontSize: 32, fontWeight: 'bold', color: '#000000', paddingTop: 15}}>
            {getChallengesClearedCount()}
        </ThemedText>
    );
};
export default ChallengesClearedComponent;