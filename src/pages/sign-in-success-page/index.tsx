import { useQuery } from '@tanstack/react-query';

import { UserDataTable } from '@/pages/sign-in-success-page/components/UserDataTable.tsx';
import { getSession } from '@/shared/api/users/session.ts';
import { Skeleton } from '@/components/ui/skeleton.tsx';

const SignInSuccessPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['session'],
    queryFn: async () => getSession({}),
    select: (data) => data.data,
  });

  return (
    <div className='w-[100vw] h-[100vh] flex flex-col items-center justify-center'>
      <h2 className='scroll-m-20 pb-2 mb-5 text-3xl font-semibold tracking-tight first:mt-0 text-green-400 text-center'>
        Successfully authorized!
      </h2>
      <div className='w-[70%] flex flex-col items-center justify-center'>
        {isLoading ? (
          <Skeleton className='w-[70vw] h-[50px] rounded-md' />
        ) : (
          <UserDataTable user={data?.user} />
        )}
      </div>
    </div>
  );
};

export default SignInSuccessPage;
