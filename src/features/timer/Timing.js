import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { RoundedButton } from '../../components/RoundedButtons';

export const Timing = ({onChangeTime}) => {
  return (
    <>
    <View style={styles.timingButton}>
      <RoundedButton title="10" size={75} onPress={()=>onChangeTime(10)} />
    </View>
      <View style={styles.timingButton}>
      <RoundedButton title="15" size={75} onPress={()=>onChangeTime(15)} />
    </View>
      <View style={styles.timingButton}>
      <RoundedButton title="20" size={75} onPress={()=>onChangeTime(20)} />
    </View>
    </>
  );
};

const styles = StyleSheet.create({

  timingButton: {
   flex: 1,
    alignItems: 'center',
    padding: 15,
    justifyContent: 'center',
 
  },
});