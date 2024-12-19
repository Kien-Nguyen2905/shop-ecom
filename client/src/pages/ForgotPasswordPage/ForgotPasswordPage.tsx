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
    isLoadding,
    token,
  } = useForgotPasswordPage();

  return (
    <div className="flex items-center gap-8 flex-col pt-[150px] w-full h-[500px]">
      <h3 className="xl:text-[30px] text-primary">
        {token
          ? 'Please enter new password'
          : 'Please enter your email of account'}
      </h3>
      <form
        className="flex flex-col w-1/4 gap-5"
        onSubmit={handleSubmit(handleSendOrResend)}
      >
        {!token ? (
          <Input control={control} required name="email" lable="Email" />
        ) : (
          <>
            <Input
              type="password"
              control={control}
              required
              name="password"
              lable="New password"
            />
            <Input
              type="password"
              control={control}
              required
              name="confirm_password"
              lable="New confirm password"
            />
          </>
        )}
        <Button
          className={`w-[165px] block ml-auto ${
            time > 0 || isLoadding ? ' cursor-not-allowed opacity-50' : ''
          }`}
          text={
            token
              ? 'Reset' // Hiển thị "Reset" nếu có token
              : time > 0
              ? `Resend Email (${time}s)`
              : isFirstTimeSend
              ? 'Send'
              : 'Resend Email'
          }
          // disabled={isLoadding || (time > 0 && !token)}
          loading={isLoadding}
        ></Button>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
