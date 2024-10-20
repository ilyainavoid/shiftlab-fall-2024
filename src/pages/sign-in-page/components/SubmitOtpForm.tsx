import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { useToast } from '@/hooks/use-toast.ts';
import { Button } from '@/components/ui/button.tsx';
import { useFormContext } from '@/pages/sign-in-page/components/FormContext.tsx';
import { signIn } from '@/shared/api/users/sign-in.ts';
import { SubmitOTPPayload } from '@/entities/api/api';
import { NAVIGATION_ROUTES } from '@/app/routing/routes.ts';
import { createOTP } from '@/shared/api/otps/create-otp.ts';

const formSchema = z.object({
  phone: z.string().min(1, { message: 'Поле является обязательным' }),
  code: z
    .string()
    .min(1, { message: 'Поле является обязательным' })
    .length(6, { message: 'Код должен содержать 6 цифр' }),
});

export const SubmitOtp = () => {
  const navigate = useNavigate();
  const { phone, delayTime, setDelayTime } = useFormContext();
  const { toast } = useToast();
  const [retryAvailable, setRetryAvailable] = useState(true);
  const [timeLeft, setTimeLeft] = useState(Number(delayTime) / 1000);

  useEffect(() => {
    if (!retryAvailable) {
      const interval = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            setRetryAvailable(true);
            clearInterval(interval);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [retryAvailable]);

  const { mutate: authorize, isPending: isAuthorizing } = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      localStorage.setItem('token', data.data.token);
      navigate(NAVIGATION_ROUTES.SUCCESS);
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Ошибка :(',
        description: 'Не удалось войти в аккаунт: проверочный код неверный!',
      });
    },
  });

  const { mutate: retry, isPending: isRetrying } = useMutation({
    mutationFn: createOTP,
    onSuccess: (data) => {
      setDelayTime(data.data.retryDelay);
      setRetryAvailable(false);
      setTimeLeft(Math.ceil(Number(data.data.retryDelay) / 1000));
    },
    onError: () => {
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
      });
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      phone: phone,
      code: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const payload: SubmitOTPPayload = {
      phone: phone,
      code: Number(values.code),
    };
    authorize({ params: payload });
  };

  const onRetry = () => {
    retry({ params: { phone: phone } });
  };

  return (
    <div>
      <p className='leading-7 text-lg font-regular mb-4 w-full md:w-[60%]'>
        Введите номер телефона для входа в личный кабинет
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6 flex flex-col'
        >
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    disabled
                    type='number'
                    placeholder='Номер телефона'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='code'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Проверочный код'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            {retryAvailable ? (
              <Button
                type='button'
                variant='customLink'
                size='reset'
                onClick={onRetry}
                disabled={isRetrying}
              >
                {isRetrying ? 'Отправляем код...' : 'Запросить код еще раз'}
              </Button>
            ) : (
              <Button
                type='button'
                variant='customLink'
                size='reset'
                onClick={onRetry}
                disabled
              >
                Отправить код повторно через {timeLeft}
              </Button>
            )}
          </div>
          <div className='flex justify-end'>
            {!isAuthorizing ? (
              <Button
                variant='custom'
                size='xl'
                type='submit'
              >
                Войти
              </Button>
            ) : (
              <Button
                variant='custom'
                size='xl'
                disabled
              >
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                Проверяем код
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
