import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";

interface Props {
  active: boolean;
}

export const Container = styled.TextInput<Props>`
  width: 100%;
  padding: 18px;
  font-size: ${RFValue(14)}px;
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.text_dark};
  font-family: ${({ theme }) => theme.fonts.regular};
  border-radius: 5px;
  margin-bottom: 8px;

  ${({ active, theme }) => active && css`
    border-width: 3px;
    border-color: ${theme.colors.attention};
  `}
`;
