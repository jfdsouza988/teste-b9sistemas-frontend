import React from 'react';
import { MdShoppingBasket, MdShoppingBag } from 'react-icons/md';

import { Container, Cart, Logo } from './styles';
import { useSelector } from 'react-redux';
import { IState } from '../../store';

export default function Header() {
  const cartSize = useSelector<IState, number>(state => state.cart.items.length);

  return (
    <Container>
      <Logo to="/">
        <div>
          <strong>CLOTHING.STORE</strong>          
        </div>
        <MdShoppingBag size={36} color="#FFF" />
      </Logo>

      <Cart to="/cart">
        <div>
          <strong>Ver pedido</strong>
          <span data-testid="cart-size">
            {cartSize === 1 ? `${cartSize} item` : `${cartSize} itens`}
          </span>
        </div>
        <MdShoppingBasket size={36} color="#FFF" />
      </Cart>
    </Container>
  );
};
