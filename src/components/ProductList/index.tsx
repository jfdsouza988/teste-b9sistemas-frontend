import React, { useCallback } from 'react'
import { MdAddShoppingCart } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IState } from '../../store';
import { addProductToCartRequest } from '../../store/modules/cart/actions';
import { ICartItem, IProduct } from '../../store/modules/cart/types';
import { formatPrice } from '../../utils/format';
import { Container } from './styles';

import defaultImage from '../../assets/images/clothes.jpg';

interface CatalogItemProps {
  product: IProduct;
}

function ProductList({ product }: CatalogItemProps) {
  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);
  const dispatch = useDispatch();

  function cartItemsAmount(productId: string): Number {
    const quantity: number = cart.find(item => item.product.id === productId)?.quantity ?? 0;

    return quantity;
  }

  const hasFailedStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failedStockCheck.includes(product.id);
  });

  const handleAddProductToCart = useCallback(() => {
    dispatch(addProductToCartRequest(product));
  }, [dispatch, product]);

  return (
    <Container>
      <li>
        <img src={defaultImage} alt="Clothes" />
        <strong>{product.title}</strong>
        <span>{formatPrice(product.price)}</span>
        <button
          type="button"
          data-testid="add-product-button"
          onClick={handleAddProductToCart}
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
      { hasFailedStockCheck && toast.error('Quantidade solicitada fora de estoque')}
    </Container>
  )
}

export default ProductList;