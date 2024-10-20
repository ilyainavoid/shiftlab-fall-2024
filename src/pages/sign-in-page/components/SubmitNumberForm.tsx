import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { ReloadIcon } from '@radix-ui/react-icons';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { createOTP } from '@/shared/api/otps/create-otp.ts';
import { useToast } from '@/hooks/use-toast.ts';
import { Button } from '@/components/ui/button.tsx';
import { useFormContext } from '@/pages/sign-in-page/components/FormContext.tsx';

const formSchema = z.object({
  phone: z.string().min(1, { message: 'Поле является обязательным' }),
});

export const SubmitNumberForm = () => {
  const { setPhone, setDelayTime, setActiveForm } = useFormContext();
  const { toast } = useToast();
  const { mutate, isPending } = useMutation({
    mutationFn: createOTP,
    onSuccess: (data) => {
      setDelayTime(data.data.retryDelay);
      setActiveForm('submitOTP');
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
      phone: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setPhone(values.phone);
    mutate({ params: values });
  };

  return (
    <div>
      <p className='leading-7 text-lg font-regular mb-4 w-full md:w-[60%]'>
        Введите номер телефона для входа в личный кабинет
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-8 flex flex-col'
        >
          <FormField
            control={form.control}
            name='phone'
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type='number'
                    placeholder='Номер телефона'
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className='flex justify-end'>
            {!isPending ? (
              <Button
                variant='custom'
                size='xl'
                type='submit'
              >
                Отправить код
              </Button>
            ) : (
              <Button
                variant='custom'
                size='xl'
                disabled
              >
                <ReloadIcon className='mr-2 h-4 w-4 animate-spin' />
                Отправляем код
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};
