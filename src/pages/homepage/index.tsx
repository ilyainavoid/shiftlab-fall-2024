import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button.tsx';

const Homepage = () => {
  const navigate = useNavigate();
  return (
    <div className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <Button
        onClick={() => navigate('/sign-in')}
        variant='custom'
        size='xl'
      >
        Войти
      </Button>
    </div>
  );
};

export default Homepage;
