import styled from 'styled-components';
import { darken, lighten } from 'polished';

export const Container = styled.li`  
    display: flex;
    flex-direction: column;
    background: #fff;
    border-radius: 4px;
    padding: 20px;
    img {
      align-self: center;
      max-width: 100%;
    }
    > strong {
      font-size: 16px;
      line-height: 20px;
      color: #333;
      margin-top: 5px;
    }
    > span {
      font-size: 21px;
      font-weight: bold;
      margin: 5px 0 20px;
    }    

    .action-buttons {
      display: flex;
      justify-content: space-between;
      align-items: center;

    .add-button {
      background: #7159c1;
      color: #fff;
      border: 0;
      border-radius: 4px;
      overflow: hidden;
      margin-top: auto;
      display: flex;
      align-items: center;
      transition: background 0.2s;
      &:hover {
        background: ${darken(0.06, '#7159c1')};
      }
      div {
        padding: 6px;
        display: flex;
        align-items: center;
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

    button {
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
  }
`;