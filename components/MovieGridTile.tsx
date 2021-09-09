import React from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';

interface MovieGridTileProps {
  movieName: string;
  movieId: string;
  movieData: { profilePic: string };
}

const MovieGridTile: React.FC<MovieGridTileProps> = props => {
  const { movieName, movieId, movieData } = props;
  const navigation = useNavigation();

  return (
    <GridItem
      onPress={() => {
        navigation.navigate('movie', {
          movieId: movieId,
          movieTitle: movieName,
        });
      }}>
      <ImageContainer>
        <GridImage
          source={{
            uri: movieData.profilePic,
          }}
        />
      </ImageContainer>
      <GridText>
        <Text>{movieName}</Text>
      </GridText>
    </GridItem>
  );
};

const GridItem = styled(Pressable)`
  height: 130px;
  width: 130px;
  margin-left: 20px;
`;

const ImageContainer = styled(View)`
  flex: 2;
`;

const GridImage = styled(Image)`
  flex: 1;
  width: null;
  height: null;
  resize-mode: cover;
  border-radius: 10px;
`;

const GridText = styled(View)`
  flex: 1;
  padding-left: 10px;
  padding-right: 10px;
`;

export default MovieGridTile;
