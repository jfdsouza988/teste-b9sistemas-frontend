import Modal from 'react-modal';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Input } from '../../Form/TextInput';
import CurrencyInput from 'react-currency-input-field';
import { ButtonContainer, Content, Form, Label } from './styles';
import api from '../../../services/api';
import { Button } from '../../Form/Button';
import { toast } from 'react-toastify';

interface AddProductModalModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

type AddProductFormData = {
  title: string;
  price: string;
  quantity: string;
};

const AddProductFormSchema = yup.object().shape({
  title: yup.string().required('Descrição obrigatória'),
  quantity: yup.string().required('Quantidade não informada'),
  price: yup.string().required('Informe o preço do produto'),
});

export function AddProductModal({
  isOpen,
  onRequestClose,
}: AddProductModalModalProps) {

  const {
    register,
    handleSubmit,
    formState,
    formState: { errors },
  } = useForm<AddProductFormData>({ resolver: yupResolver(AddProductFormSchema) });

  const handleAddNewProduct: SubmitHandler<AddProductFormData> = async (values) => {
    const data = {
      title: values.title,
      price: parseFloat(values.price),
      quantity: parseInt(values.quantity)
    };
    
    await api
      .post('product', {
        title: data.title,
        quantity: data.quantity,
        price: data.price,
      })
      .then(() => {
        toast.success('Produto cadastrado com sucesso');
      }).catch((err: any) => {
        toast.error(err.response.data?.message);
      }).finally(() => {
        onRequestClose();
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Content>
        <h2>Cadastrar novo produto</h2>
      </Content>
      <Form onSubmit={handleSubmit(handleAddNewProduct)}>
        <Input
          id="title"
          type="text"
          label="Descrição"
          error={errors.title}
          {...register("title")}
          placeholder="Digite a descriçao do produto..."
        />

        <Input
          id="quantity"
          type="number"
          label="Quantidade"
          error={errors.quantity}
          {...register("quantity")}
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
          disableGroupSeparators={true}
          allowNegativeValue={false}
        />
        <ButtonContainer>
          <Button type="button" label="Cancelar" onClick={onRequestClose} />
          <Button
            type="submit"
            label="Cadastrar"
            isLoading={formState.isSubmitting}
          />
        </ButtonContainer>
      </Form>
    </Modal>
  );
}
