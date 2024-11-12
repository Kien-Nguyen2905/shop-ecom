import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingVerify } from '../../components/Loading';
import { useVerifyEmail } from './useVerifyEmail';
import { CUSTOMER_PATHS, LOCAL_STORAGE } from '../../constants';
import { Button } from '../../components/Button';

const VerifyEmailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token') as string;
  const email = localStorage.getItem(LOCAL_STORAGE.EMAIL) as string;
  const { handleRegister, isResending, time, handleResendEmail } =
    useVerifyEmail();

  useEffect(() => {
    if (token) {
      handleRegister({ email_token: token });
    } else {
      navigate(CUSTOMER_PATHS.ROOT);
    }
  }, []);

  return (
    <>
      {token && (
        <div className="absolute top-0 flex items-center justify-center w-full h-full bg-white z-1">
          <LoadingVerify />
        </div>
      )}
      <div className="flex items-center gap-8 flex-col pt-[150px] w-full h-full">
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
    </>
  );
};

export default VerifyEmailPage;
