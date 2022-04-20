import React, { useState, useEffect, useCallback } from 'react';
import { MdAddShoppingCart } from 'react-icons/md';

import { ProductList } from './styles';
import api from '../../services/api';
import { formatPrice } from '../../utils/format';
import { ICartItem, IProduct } from '../../store/modules/cart/types';
import { addProductToCartRequest } from '../../store/modules/cart/actions';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { IState } from '../../store';

export default function Home() {
  const dispatch = useDispatch();
  const [catalog, setCatalog] = useState<IProduct[]>([]);
  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);

  function cartItemsAmount(productId: string): Number {
    const quantity: number = cart.find(item => item.product.id === productId)?.quantity ?? 0;

    return quantity;
  }

  useEffect(() => {
    async function loadProducts() {
      api.get('product').then(response => {
        setCatalog(response.data);
      })
    }

    loadProducts();
  }, []);

  const handleAddProductToCart = useCallback((product: IProduct) => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch]);

  return (
    <>
      {catalog.map(product => (
        <ProductList key={product.id}>
          <li>
            <img src="https://rocketseat-cdn.s3-sa-east-1.amazonaws.com/modulo-redux/tenis1.jpg" alt="Tênis de Caminhada Leve Confortável" />
            <strong>{product.title}</strong>
            <span>{formatPrice(product.price)}</span>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => handleAddProductToCart(product)}
            >
              <div data-testid="cart-product-quantity">
                <>
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount(product.id)}
                </>
              </div>

              <span>ADICIONAR AO PEDIDO</span>
            </button>
          </li>
        </ProductList>
      ))}
    </>
  );
};

