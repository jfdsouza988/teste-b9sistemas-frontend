import React, { useCallback, useState } from 'react'
import { MdAddShoppingCart, MdDelete, MdMode } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { IState } from '../../store';
import { addProductToCartRequest } from '../../store/modules/cart/actions';
import { ICartItem, IProduct } from '../../store/modules/cart/types';
import { formatPrice } from '../../utils/format';
import { Container } from './styles';

import defaultImage from '../../assets/images/clothes.jpg';
import api from '../../services/api';
import { MessageModal } from '../Modals/Message';
import { UpdateProductModal } from '../Modals/updateProduct';

interface CatalogItemProps {
  product: IProduct;
}

function ProductList({ product }: CatalogItemProps) {
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [isUpdateProductModalOpen, setIsUpdateProductModalOpen] = useState(false);
  const [message, setMessage] = useState('');
  const cart = useSelector<IState, ICartItem[]>(state => state.cart.items);
  const dispatch = useDispatch();

  function handleOpenUpdateProductModal() {
    setIsUpdateProductModalOpen(true);
  }

  function handleCloseUpdateProductModal() {
    setIsUpdateProductModalOpen(false);
  }

  function cartItemsAmount(productId: string): Number {
    const quantity: number = cart.find(item => item.product.id === productId)?.quantity ?? 0;

    return quantity;
  }

  const hasFailedStockCheck = useSelector<IState, boolean>(state => {
    return state.cart.failedStockCheck.includes(product.id);
  });

  const handleAddProductToCart = useCallback((product: IProduct) => {
    if (hasFailedStockCheck) {
      toast.error('Quantidade solicitada fora de estoque');
    }
    dispatch(addProductToCartRequest(product));
  }, [dispatch, hasFailedStockCheck]);

  async function handleDeleteProduct(productId: string) {

    await api.delete(`product/${productId}`).then(() => {
      setMessage('Produto removido com sucesso');
    }).catch((err) => {
      setMessage(err.response.data?.message);
    }).finally(() => {
      setIsMessageModalOpen(true);
    })
  }

  function handleCloseMessageModal() {
    setIsMessageModalOpen(false);
    window.location.reload();
  }

  return (
    <>
      <Container>
        <img src={defaultImage} alt="Imagem ilustrativa padrão" />
        <strong>{product.title}</strong>
        <span>{formatPrice(product.price)}</span>
        <p>{product.stock === 1 ? `${product.stock} item` : `${product.stock} itens`} em estoque</p>
        <div className="action-buttons">
          <button
            className="add-button"
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

          <button
            type="button"
            data-testid="update-product"
            onClick={handleOpenUpdateProductModal}
          >
            <MdMode size={20} />
          </button>

          <button
            type="button"
            data-testid="remove-product"
            onClick={() => handleDeleteProduct(product.id)}
          >
            <MdDelete size={20} />
          </button>
        </div>

        <UpdateProductModal
          product={product}
          isOpen={isUpdateProductModalOpen}
          onRequestClose={handleCloseUpdateProductModal}
        />
      </Container>

      <MessageModal
        isOpen={isMessageModalOpen}
        onRequestClose={handleCloseMessageModal}
        message={message}
      />
    </>
  )
}

export default ProductList;