import React from 'react';
import { render } from '@testing-library/react-native';
import Stepper from '../Stepper';

describe('Stepper Component', () => {
  const mockSteps = ['Step 1', 'Step 2', 'Step 3'];

  it('renders correctly with steps', () => {
    const { getByText } = render(<Stepper steps={mockSteps} currentStep={0} />);
    
    expect(getByText('Step 1')).toBeTruthy();
    expect(getByText('Step 2')).toBeTruthy();
    expect(getByText('Step 3')).toBeTruthy();
  });

  it('shows correct active step', () => {
    const { getByText } = render(<Stepper steps={mockSteps} currentStep={1} />);
    
    const step1 = getByText('1');
    const step2 = getByText('2');
    const step3 = getByText('3');
    
    expect(step1).toBeTruthy();
    expect(step2).toBeTruthy();
    expect(step3).toBeTruthy();
  });
}); 