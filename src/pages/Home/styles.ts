import styled from 'styled-components';
import { darken } from 'polished';
import { Link } from 'react-router-dom';

export const ActionBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 30px 0;
  a {
    transition: opacity 0.2s;
    &:hover {
      opacity: 0.7;
    }
  }

  button {
    background: #7159c1;
    color: #fff;
    border: 0;
    width: 250px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: auto;
    margin-left: 15px;
    display: flex;
    align-items: center;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.06, '#7159c1')};
    }
    div {
      display: flex;
      align-items: center;
      padding: 12px;
      background: rgba(0, 0, 0, 0.1);
      svg {
        margin-right: 5px;
      }
    }
    span {
      flex: 1;
      text-align: center;
      font-weight: bold;
    }
    }  
`;

export const Order = styled(Link)`
text-decoration: none;

  button {
    background: #7159c1;
    color: #fff;
    border: 0;
    width: 250px;
    border-radius: 4px;
    overflow: hidden;
    margin-top: auto;
    margin-left: 15px;
    display: flex;
    align-items: center;
    transition: background 0.2s;
    &:hover {
      background: ${darken(0.06, '#7159c1')};
    }
    div {
      display: flex;
      align-items: center;
      padding: 12px;
      background: rgba(0, 0, 0, 0.1);
      svg {
        margin-right: 5px;
      }
    }
    span {
      flex: 1;
      text-align: center;
      font-weight: bold;
    }
    }  

`;

export const Message = styled.div`
  margin-top: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 24px;  
`;

export const Container = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 15px;
  list-style: none;
`;