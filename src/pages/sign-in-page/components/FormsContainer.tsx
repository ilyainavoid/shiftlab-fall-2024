import { useFormContext } from '@/pages/sign-in-page/components/FormContext.tsx';
import { SubmitNumberForm } from '@/pages/sign-in-page/components/SubmitNumberForm.tsx';
import { SubmitOtp } from '@/pages/sign-in-page/components/SubmitOtpForm.tsx';

export const FormsContainer = () => {
  const { activeForm } = useFormContext();

  return (
    <>{activeForm === 'createOTP' ? <SubmitNumberForm /> : <SubmitOtp />}</>
  );
};
