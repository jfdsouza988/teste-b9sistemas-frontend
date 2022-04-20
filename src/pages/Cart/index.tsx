import React from 'react';
import {
  MdDelete,
} from 'react-icons/md';
import { useSelector } from 'react-redux';
import { IState } from '../../store';
import { ICartItem } from '../../store/modules/cart/types';
import { formatPrice } from '../../utils/format';

import { Container, ProductTable, Total } from './styles';

export default function Cart() {
  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);
  
  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th aria-label="delete icon" />
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.product.id} data-testid="product">
              <td>
                <img src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg" alt="Tênis de Caminhada Leve Confortável" />
              </td>
              <td>
                <strong>{item.product.title}</strong>
                <span>{formatPrice(item.product.price)}</span>
              </td>
              <td>
                <div>                  
                  <input
                    type="text"
                    data-testid="product-amount"
                    readOnly
                    value={item.quantity}
                  />                  
                </div>
              </td>
              <td>
                <strong>{(item.product.price * item.quantity).toFixed(2)}</strong>
              </td>
              <td>
                <button
                  type="button"
                  data-testid="remove-product"
                // onClick={() => handleRemoveProduct(product.id)}
                >
                  <MdDelete size={20} />
                </button>
              </td>
            </tr>

          ))}
        </tbody>
      </ProductTable>

      <footer>
        <button type="button">Finalizar pedido</button>

        <Total>
          <span>TOTAL</span>
          <strong>R$ 379,90</strong>
        </Total>
      </footer>
    </Container>
  );
};
