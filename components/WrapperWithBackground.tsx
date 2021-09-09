import React from 'react';
import { ImageBackground } from 'react-native';
import landingBackgroundImg from '../assets/pictures/pictures';
import styled from 'styled-components/native';

interface WrapperWithBackgroundProps {
  children?: React.ReactNode;
}

const WrapperWithBackground: React.FC<WrapperWithBackgroundProps> = ({
  children,
}) => {
  return (
    <BackgroundWrapper source={landingBackgroundImg} resizeMode="cover">
      {children}
    </BackgroundWrapper>
  );
};

const BackgroundWrapper = styled(ImageBackground)`
  flex: 1;
  justify-content: center;
`;

export default WrapperWithBackground;
