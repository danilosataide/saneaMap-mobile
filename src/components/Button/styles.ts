import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  width: 100%;
  height: 60px;
  background: #189edb;
  border-radius: 10px;

  justify-content: center;
  align-items: center;
  margin-top: 8px;
`

export const ButtonText = styled.Text`
  font-family: 'Roboto_500Medium';
  color: #312e38;
  font-size: 18px;
`
