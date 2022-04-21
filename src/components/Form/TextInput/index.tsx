import {
  forwardRef,
  InputHTMLAttributes,
  ForwardRefRenderFunction,
} from 'react';
import { FieldError } from 'react-hook-form';
import { ErrorMessage, InputStyle, Label } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label?: string;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, label, error = null, ...rest },
  ref
) => {
  return (
    <>
      {!!label && <Label htmlFor={name}>{label}</Label>}

      <InputStyle id={name} name={name} ref={ref} {...rest} />
      {!!error && (
        <ErrorMessage className="error">{error.message}</ErrorMessage>
      )}
    </>
  );
};

export const Input = forwardRef(InputBase);
