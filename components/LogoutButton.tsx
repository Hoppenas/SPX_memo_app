import React from 'react';
import { View, Pressable } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';

import { actions } from '../state/actions';

const LogoutButton: React.FC = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(actions.user.logout());
  };

  return (
    <Pressable onPress={handleLogout}>
      <Container>
        <AntDesign name="logout" size={30} color="black" />
      </Container>
    </Pressable>
  );
};

const Container = styled(View)`
  margin-right: 15px;
`;

export default LogoutButton;
