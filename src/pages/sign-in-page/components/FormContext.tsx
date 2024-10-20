import { createContext, ReactNode, useContext, useState } from 'react';

type FormType = 'createOTP' | 'submitOTP';
interface FormContextType {
  activeForm: FormType;
  phone: string;
  delayTime: string;
  setActiveForm: (activeForm: FormType) => void;
  setPhone: (phone: string) => void;
  setDelayTime: (delayTime: string) => void;
}
interface FormProviderProps {
  children: ReactNode;
}
const FormContext = createContext<FormContextType | undefined>(undefined);
export const FormProvider = ({ children }: FormProviderProps) => {
  const [activeForm, setActiveForm] = useState<FormType>('createOTP');
  const [phone, setPhone] = useState('');
  const [delayTime, setDelayTime] = useState('');
  return (
    <FormContext.Provider
      value={{
        activeForm,
        phone,
        delayTime,
        setPhone,
        setDelayTime,
        setActiveForm,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};
