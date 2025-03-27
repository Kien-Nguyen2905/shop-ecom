import { Button } from '../../components/Button';
import Input from '../../components/Input/Input';
import { useForgotPasswordPage } from './useForgotPasswordPage';

const ForgotPasswordPage = () => {
  const {
    handleSubmit,
    handleSendOrResend,
    isFirstTimeSend,
    time,
    control,
    isLoading,
    token,
  } = useForgotPasswordPage();

  return (
    <div className="container">
      <div className="flex items-center gap-8 flex-col pt-[150px] w-full h-screen">
        <h3 className="xl:text-[30px] text-primary">
          {token
            ? 'Please enter new password'
            : 'Please enter your email of account'}
        </h3>
        <form
          className="flex flex-col w-full md:w-1/3 gap-5"
          onSubmit={handleSubmit(handleSendOrResend)}
        >
          {!token ? (
            <Input control={control} required name="email" label="Email" />
          ) : (
            <>
              <Input
                type="password"
                control={control}
                required
                name="password"
                label="New password"
              />
              <Input
                type="password"
                control={control}
                required
                name="confirm_password"
                label="New confirm password"
              />
            </>
          )}
          <Button
            className={`w-[165px] block ml-auto ${
              time > 0 || isLoading ? ' cursor-not-allowed opacity-50' : ''
            }`}
            text={
              token
                ? 'Reset'
                : time > 0
                ? `Resend Email (${time}s)`
                : isFirstTimeSend
                ? 'Send'
                : 'Resend Email'
            }
            loading={isLoading}
          ></Button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
