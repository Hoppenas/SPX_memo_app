import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import styled from 'styled-components/native';

const Loader: React.FC = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#0000ff" />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export default Loader;
