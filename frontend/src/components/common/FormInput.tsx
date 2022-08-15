import styled from "styled-components";

export const FormInput = styled.input`
  appearance: none;
  border-radius: 10px;
  background: #2d1857;
  -moz-appearance: none;
  -webkit-appearance: none;
  ::placeholder {
    color: #9a9b9c;
    font-size: 1.2rem;
  }
  &:focus {
    outline: none;
    font-size: 1.2rem;
  }
`;
