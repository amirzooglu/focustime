import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

const minutesToSeconds = (minutes) => minutes * 60 * 1000;
const formatTime = (time) => (time < 10 ? `0${time}` : time);

export const Countdown = ({ minutes = 1, isPaused ,onProgress,onEnd }) => {
  const interval = React.useRef(null); 
  const countLeft = () => {
    setMillis((time) => {
      if (time === 0) {
        if(interval.current)
          clearInterval(interval.current);
        //Do Something
        onEnd();
        return time;
      } 

      const timeLeft = time - 1000;
      //Report The Progress
      onProgress(timeLeft/minutesToSeconds(minutes));
      return timeLeft;
    });
  };


  useEffect(() => {
    setMillis(minutesToSeconds(minutes));
  }, [minutes]);

  useEffect(() => {
  
    if(isPaused){
      if(interval.current)
        clearInterval(interval.current);
      return;
      }
    interval.current = setInterval(countLeft, 1000);
    return () => clearInterval(interval.current);
  }, [isPaused]);

  const [millis, setMillis] = useState(minutesToSeconds(minutes));
  const minute = Math.floor(millis / 1000 / 60) % 60;
  const seconds = Math.floor(millis / 1000) % 60;
  return (
    <View style={styles.view}>
      <Text style={styles.text}>
        {formatTime(minute)}:{formatTime(seconds)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.white,
    fontSize: fontSizes.xxxl,
    fontWeight: 'bold',
    padding: fontSizes.lg,
    backgroundColor: 'rgba(94,132,226,0.3)',
  },
});
