import ReactDOM from 'react-dom';
import { CgClose } from 'react-icons/cg';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useModal } from './useModal';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { TVerifyEmailPayload } from '../../services/Auth/typings';
import { CUSTOMER_PATHS } from '../../constants';

const Modal = () => {
  const {
    activeTab,
    handleSignInClick,
    handleSignUpClick,
    hanldeRegister,
    hanldeLogin,
    isOpen,
    closeModal,
    handleSubmit,
    control,
    isLoadingVerifyEmail,
    googleOAuthUrl,
    isLoadingLogin,
  } = useModal();
  if (!isOpen) return null;
  const onSubmit = (values: TVerifyEmailPayload) => {
    if (activeTab === 'signIn') {
      hanldeLogin?.(values);
    } else {
      hanldeRegister?.(values);
    }
  };
  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full ">
      <div className=" absolute inset-0 bg-[#000] opacity-80 overlay"></div>
      <div className=" relative px-[60px] pt-[37px] pb-[60px] bg-[#fff] rounded-lg w-[550px]">
        <div className="flex items-center border-b ">
          <span
            className={`nav-link relative signIn-class font-PpLight text-2xl py-[9px] px-[10px] w-1/2 text-center cursor-pointer ${
              activeTab === 'signIn' ? 'text-primary active' : 'text-backFont'
            }`}
            onClick={handleSignInClick}
          >
            Sign In
          </span>
          <span
            className={`nav-link relative signUp-class font-PpLight text-2xl py-[9px] px-[10px] w-1/2 text-center cursor-pointer ${
              activeTab === 'signUp' ? 'text-primary active' : 'text-backFont'
            }`}
            onClick={handleSignUpClick}
          >
            Register
          </span>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-5"
        >
          {activeTab === 'signUp' && (
            <Input
              required
              lable="Full name"
              control={control}
              name="full_name"
            ></Input>
          )}
          <Input
            required
            lable={`${
              activeTab === 'signIn' ? 'Email address' : 'Your email address'
            }`}
            control={control}
            name="email"
          ></Input>
          <Input
            type="password"
            required
            lable="Password"
            control={control}
            name="password"
          ></Input>
          {activeTab === 'signUp' && (
            <Input
              type="password"
              required
              lable="Confirm password"
              control={control}
              name="confirm_password"
            />
          )}
          <div className="flex">
            <Link
              to={CUSTOMER_PATHS.FORGOT_PASSWORD}
              onClick={() => closeModal()}
              className="hover:text-primary"
            >
              Forgot Your Password?
            </Link>
            <Button
              loading={isLoadingLogin || isLoadingVerifyEmail}
              className="ml-auto"
              text={`${activeTab === 'signIn' ? 'LOG IN' : 'REGISTER'}`}
            ></Button>
          </div>
        </form>
        <div className="flex flex-col items-center justify-center gap-6">
          <span>or sign in with</span>
          <Link
            to={googleOAuthUrl}
            className="flex items-center gap-3 px-5 py-2 border hover:text-primary"
          >
            <FcGoogle /> Login With Google
          </Link>
        </div>
        <CgClose
          className="absolute cursor-pointer top-5 right-5 "
          size={20}
          onClick={closeModal}
        />
      </div>
    </div>,
    document.querySelector('body')!,
  );
};

export default Modal;
