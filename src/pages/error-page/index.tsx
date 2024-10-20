import { ServerCrash } from 'lucide-react';

export const ErrorPage = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <div className='m-4 flex flex-col justify-center items-center'>
        <div className='w-fit flex flex-row items-center gap-2 border-b'>
          <ServerCrash />
          <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-red-700 text-center'>
            Unexpected error occurred!
          </h2>
        </div>
        <p className='leading-7 text-xl text-center'>
          We're working on this issue!
        </p>
      </div>
    </div>
  );
};
