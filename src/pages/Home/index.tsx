import { useState, useEffect } from 'react';

import ProductList from '../../components/ProductList';
import api from '../../services/api';
import { IProduct } from '../../store/modules/cart/types';
import { Container } from './styles';

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    async function loadProducts() {
      api.get('product').then(response => {
        setProducts(response.data);
      })
    }

    loadProducts();
  }, []);

  return (
    <>
      <Container>
        {products.map(product => (
          <ProductList product={product} />
        ))}
      </Container>
    </>
  );
};

