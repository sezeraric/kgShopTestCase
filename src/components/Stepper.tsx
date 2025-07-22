import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '@/styles/colors';
import { StepperProps } from '@/types';

const Stepper: React.FC<StepperProps> = ({ steps, currentStep }) => {
  return (
    <View style={styles.container}>
      {steps.map((step, idx) => (
        <React.Fragment key={step}>
          <View style={[styles.circle, idx <= currentStep && styles.activeCircle]}>
            <Text style={[styles.circleText, idx <= currentStep && styles.activeText]}>{idx + 1}</Text>
          </View>
          <Text style={[styles.label, idx <= currentStep && styles.activeText]}>{step}</Text>
          {idx < steps.length - 1 && <View style={[styles.line, idx < currentStep && styles.activeLine]} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.background,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
  },
  activeCircle: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  circleText: {
    color: colors.textSecondary,
    fontWeight: 'bold',
    fontSize: 16,
  },
  activeText: {
    color: '#000',
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginHorizontal: 4,
    minWidth: 54,
    textAlign: 'center',
  },
  line: {
    height: 2,
    width: 28,
    backgroundColor: colors.border,
    marginHorizontal: 2,
  },
  activeLine: {
    backgroundColor: colors.primary,
  },
});

export default Stepper; 