import { Card } from '@/components/ui/card.tsx';
import { FormProvider } from '@/pages/sign-in-page/components/FormContext.tsx';
import { FormsContainer } from '@/pages/sign-in-page/components/FormsContainer.tsx';

const SignInPage = () => {
  return (
    <FormProvider>
      <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-start'>
          Авторизация
        </h2>
        <Card className='p-10 m-5'>
          <FormsContainer />
        </Card>
      </div>
    </FormProvider>
  );
};

export default SignInPage;
