import { useState, useEffect } from 'react';

import ProductList from '../../components/ProductList';
import api from '../../services/api';
import { IProduct } from '../../store/modules/cart/types';

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
      {products.map(product => (
        <ProductList key={product.id} product={product}/>        
      ))}
    </>
  );
};

