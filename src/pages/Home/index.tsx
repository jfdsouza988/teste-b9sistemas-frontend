import { useState, useEffect } from 'react';
import { MdPostAdd, MdChecklist } from 'react-icons/md';
import Modal from 'react-modal';
import { AddProductModal } from '../../components/Modals/AddProduct';

import ProductList from '../../components/ProductList';
import api from '../../services/api';
import { IProduct } from '../../store/modules/cart/types';
import { ActionBox, Container, Message, Order } from './styles';

Modal.setAppElement('#root');

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);

  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);

  function handleOpenAddProductModal() {
    setIsAddProductModalOpen(true);
  }

  function handleCloseAddProductModal() {
    setIsAddProductModalOpen(false);
  }

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
      <ActionBox>
        <Order to="/orders">
          <button
            type="button"
            data-testid="add-product-button"
            onClick={handleOpenAddProductModal}
          >
            <div data-testid="cart-product-quantity">
              <MdChecklist size={16} color="#FFF" />
            </div>

            <span>MINHAS VENDAS</span>
          </button>
        </Order>
        <button
          type="button"
          data-testid="add-product-button"
          onClick={handleOpenAddProductModal}
        >
          <div data-testid="cart-product-quantity">
            <MdPostAdd size={16} color="#FFF" />
          </div>

          <span>CADASTRAR NOVO PRODUTO</span>
        </button>
      </ActionBox>
      {!products.length && <Message>Não há produtos no seu catálogo...</Message>}
      <Container>
        {products.map(product => (
          <ProductList key={product.id} product={product} />
        ))}
      </Container>
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onRequestClose={handleCloseAddProductModal}
      />
    </>
  );
};

