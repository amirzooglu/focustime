import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform ,Vibration} from 'react-native';
import { colors } from '../../utils/colors';
import { fontSizes, spacing } from '../../utils/sizes';
import { ProgressBar } from 'react-native-paper';
import { Countdown } from '../../components/Countdown';
import { RoundedButton } from '../../components/RoundedButtons';
import { Timing } from './Timing';

export const Timer = ({ focusSubject,onTimerEnd,clearSubject }) => {
  const DEFAULT_TIME = 0.1;
  const ONE_SECOND_IN_MS = 1000;
  const [minutes, setMinutes] = useState(DEFAULT_TIME);
  const [isStarted, setIsStarted] = useState(false);
  const [progress, setProgress] = useState(1);

  const onProgress = (progress) => {
    setProgress(progress);
  };

  const vibrate = () => {
    if(Platform.OS === 'ios'){
      const interval = setInterval(()=>Vibration.vibrate(),1000);
      setTimeout(()=>clearInterval(interval),10000);
    }else{
      Vibration.vibrate(1*ONE_SECOND_IN_MS);
     
    }
  }
  const onEnd = () => {
    vibrate();
    setMinutes(DEFAULT_TIME);
    setProgress(1);
    setIsStarted(false);
    onTimerEnd();
  };

  const onChangeTime = (min) => {
    setMinutes(min);
    setProgress(1);
    setIsStarted(false);
  };
  return (
    <View style={styles.container}>
      <View style={{ flex: 0.3 }}>
        <Countdown
          minutes={minutes}
          isPaused={!isStarted}
          onProgress={onProgress}
          onEnd={onEnd}
        />
      </View>
      <View style={{ paddingTop: spacing.xxl }}>
        <Text style={styles.title}>Focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      <View style={{ paddingTop: spacing.md }}>
        <ProgressBar
          progress={progress}
          color="#5E84E2"
          style={{ height: 10 }}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Timing onChangeTime={onChangeTime} />
      </View>
      <View style={styles.buttonWrapper}>
        {!isStarted | (progress === 0) ? (
          <RoundedButton title="start" onPress={() => setIsStarted(true)} />
        ) : (
          <RoundedButton title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>

         <View style={styles.clearSubject}>
         <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
      </View>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  title: {
    color: colors.white,
    textAlign: 'center',
  },
  task: {
    color: colors.white,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'center',
    flex: 0.4,
  },
   clearSubject: {
     paddingBottom:20,
     paddingLeft:25
   }
});
