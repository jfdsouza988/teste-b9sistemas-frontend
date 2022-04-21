import { formatPrice } from '../../utils/format';

import { Container, ProductTable } from './styles';

import defaultImage from '../../assets/images/clothes.jpg';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { IProduct } from '../../store/modules/cart/types';

interface IOrder {
  id: string;
  totalPrice: number;
  created_at: string;
  products: IProduct[];
}

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    async function loadPurchases() {
      api.get('purchase').then(response => {
        setOrders(response.data);
      })
    }

    loadPurchases();
  }, []);

  const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })

  return (
    <Container>
      <h2>Minhas vendas</h2>
      <ProductTable>
        <thead>
          <tr>
            <th aria-label="product image" />
            <th>PRODUTOS</th>
            <th>TOTAL DO PEDIDO</th>
            <th>DATA DE CRIAÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(purchase => (
            <tr key={purchase.id} data-testid="product">
              <td>
                <img src={defaultImage} alt="Imagem ilustrativa padrão" />
              </td>
              <td>
                {purchase.products.map(product => (
                  <strong>{product.title}</strong>
                ))}
              </td>
              <td>
                <span>{formatPrice(purchase.totalPrice)}</span>
              </td>
              <td>
                <strong>{dateFormatter.format(new Date(purchase.created_at))}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
    </Container>
  );
};
