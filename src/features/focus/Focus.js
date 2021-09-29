import React, { useState } from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';

// or any pure javascript modules available in npm
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../../components/RoundedButtons';

import {fontSizes,spacing} from '../../utils/sizes';
export const Focus = ({ addSubject }) => {
  const [tempSubject, setTempSubject] = useState('');
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
        <View
          style={{
            paddingTop: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TextInput
            style={{ flex: 1, marginRight: spacing.md }}
            onSubmitEditing={({ nativeEvent }) => {
              setTempSubject(nativeEvent.text);
            }}
          />
          <RoundedButton
            size={50}
            title="+"
            onPress={() => {
              addSubject(tempSubject);
            }}></RoundedButton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  titleContainer: {
    flex: 0.5,
    padding: spacing.md,
    justifyContent: 'center',
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.md,
  },
});
