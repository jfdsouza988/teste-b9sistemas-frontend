import styled from 'styled-components';
import { darken } from 'polished';

interface ButtonProps {
  isLoading?: boolean;
}

export const ButtonStyle = styled.button<ButtonProps>`
  font-weight: 400;
  font-size: 16px;
  background: #7159c1;
  color: #fff;
  padding: 8px 20px;
  width: ${(props) => (props.isLoading ? '122px' : '82px')};
  height: 36px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  cursor: pointer;
  border: 0;
  border-radius: 4px;

  transition: background 0.2s;

  &:not(:disabled):hover {
    background: ${darken(0.06, '#7159c1')};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .fa {
    margin-right: 8px;
  }
`;
