import Modal from 'react-modal';
import { Button } from '../../Form/Button';
import { ButtonContainer, Content } from './styles';

interface MessageModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  message: string;
}

export function MessageModal({
  isOpen,
  onRequestClose,
  message,
}: MessageModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <Content>
        <h3>{message}</h3>
      </Content>

      <ButtonContainer>
        <Button type="button" label="Ok" onClick={onRequestClose} />
      </ButtonContainer>
    </Modal>
  );
}
