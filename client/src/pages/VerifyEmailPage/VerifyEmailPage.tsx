import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Loading } from '../../components/Loading';
import { LOCAL_STORAGE } from '../../constants';
import { Button } from '../../components/Button';
import { useVerifyEmailPage } from './useVerifyEmailPage';

const VerifyEmailPage = () => {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token') as string;
  const email = localStorage.getItem(LOCAL_STORAGE.EMAIL) as string;
  const { handleRegisterByEmail, isResending, time, handleResendEmail } =
    useVerifyEmailPage();

  useEffect(() => {
    if (token) {
      handleRegisterByEmail({ email_token: token });
    }
  }, []);

  return (
    <div className="container">
      {token && (
        <div className="absolute top-0 flex items-center justify-center w-full h-full bg-white z-1">
          <Loading />
        </div>
      )}
      <div className="flex items-center gap-8 flex-col pt-[150px] w-full h-screen">
        <h3 className="xl:text-[30px] text-primary">Vui lòng xác minh email</h3>
        <Button
          onClick={() => handleResendEmail({ email })}
          className={`w-[165px] ${
            time > 0 || isResending ? ' cursor-not-allowed opacity-50' : ''
          }`}
          text={time > 0 ? `Resend Email (${time}s)` : 'Resend Email'}
          disabled={time > 0}
          loading={isResending}
        ></Button>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
