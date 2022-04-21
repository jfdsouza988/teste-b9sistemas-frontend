import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  
  span {
    font-size: 13px;
    font-weight: normal;
    color: green;
    text-align: left;
    margin-bottom: 5px;
  }
`;

export const Form = styled.form`
  #amount-product {
    background: none;
    border: 0;
    padding: 6px;
    svg {
      color: #7159c1;
      transition: color 0.2s;
    }
    &:hover {
      svg {
        color: ${darken(0.06, '#7159c1')};
      }
    }
    &:disabled {
      svg {
        color: ${lighten(0.25, '#7159c1')};
        cursor: not-allowed;
      }
    }
  }

  #price {
    padding: 10px;
    font-weight: 400;
    color: #000;
    outline: none;
    background: #fff;
    border: 1px solid #556367;
    width: 100%;
    margin-top: 5px;
    margin-bottom: 10px;
  }  
`;

export const Label = styled.label`
  font-weight: normal;
  font-size: 13px;
  line-height: 16px;
  color: #000;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 10px;

  button[type='button'] {
    background-color: #fff;
    color: #000;
    margin-right: 10px;

    &:hover {
      color: #fff;    
    }
  }
`;
