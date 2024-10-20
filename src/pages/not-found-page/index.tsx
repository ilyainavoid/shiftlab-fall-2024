import { SearchX } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <div className='m-4 flex flex-col justify-center items-center'>
        <div className='w-fit flex flex-row items-center gap-2'>
          <SearchX />
          <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-yellow-500 text-center'>
            Page not found
          </h2>
        </div>
        <p className='leading-7 text-xl border-t text-center'>
          It seems like the page you're looking for doesn't exist
        </p>
      </div>
    </div>
  );
};
