import Modal from 'react-modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../Form/TextInput';
import CurrencyInput from 'react-currency-input-field';
import { ButtonContainer, Content, Form, Label } from './styles';
import api from '../../../services/api';
import { Button } from '../../Form/Button';
import { MessageModal } from '../Message';
import { useState } from 'react';
import { IProduct } from '../../../store/modules/cart/types';

interface UpdateProductModalModalProps {
  product: IProduct;
  isOpen: boolean;
  onRequestClose: () => void;
}

type UpdateProductFormData = {
  title: string;
  price: string;
  quantity: string;
};

const UpdateProductFormSchema = yup.object().shape({
  title: yup.string().required('Descrição obrigatória'),
  quantity: yup.string().required('Quantidade não informada'),
  price: yup.string().required('Informe o preço do produto'),
});

export function UpdateProductModal({
  isOpen,
  onRequestClose,
  product,
}: UpdateProductModalModalProps) {

  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<UpdateProductFormData>({ resolver: yupResolver(UpdateProductFormSchema) });

  const handleUpdateProduct: SubmitHandler<UpdateProductFormData> = async (values) => {
    const data = {
      title: values.title,
      price: parseFloat(values.price),
      quantity: parseInt(values.quantity)
    };

    await api
      .post(`product/${product.id}`, {
        title: data.title,
        quantity: data.quantity,
        price: data.price,
      })
      .then(() => {
        setMessage('Produto atualizado com sucesso');
      }).catch((err: any) => {
        setMessage(err.response.data?.message);
      }).finally(() => {
        onRequestClose();
        setIsMessageModalOpen(true);
      });
  };

  function handleCloseMessageModal() {
    setIsMessageModalOpen(false);
    window.location.reload();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >
        <Content>
          <h2>Editar produto</h2>
        </Content>
        <Form onSubmit={handleSubmit(handleUpdateProduct)}>
          <Input
            id="title"
            type="text"
            label="Descrição"
            error={errors.title}
            {...register("title")}
            value={product.title}
            placeholder="Digite a descriçao do produto..."
          />

          <Input
            id="quantity"
            type="number"
            label="Quantidade"
            error={errors.quantity}
            {...register("quantity")}
            value={product.quantity}
            placeholder="Digite a quantidade do produto..."
          />

          <Label>Preço</Label>
          <CurrencyInput
            id="price"
            type="text"
            {...register("price")}
            placeholder="39.90"
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalLength={2}
            value={product.price}
            disableGroupSeparators={true}
            allowNegativeValue={false}
          />
          <ButtonContainer>
            <Button type="button" label="Cancelar" onClick={onRequestClose} />
            <Button
              type="submit"
              label="Atualizar"
              isLoading={formState.isSubmitting}
            />
          </ButtonContainer>
        </Form>
      </Modal>

      <MessageModal
        isOpen={isMessageModalOpen}
        onRequestClose={handleCloseMessageModal}
        message={message}
      />
    </>
  );
}
