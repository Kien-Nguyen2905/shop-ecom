import ReactDOM from 'react-dom';
import { CgClose } from 'react-icons/cg';
import Input from '../Input/Input';
import Button from '../Button/Button';
import { useModal } from './useModal';
import { Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { CUSTOMER_PATHS, MODAL_TABS } from '../../constants';
import { OverPlay } from '../OverPlay';

const Modal = () => {
  const {
    activeTab,
    handleSignInClick,
    handleSignUpClick,
    onSubmit,
    isOpenModal,
    closeModal,
    control,
    isLoadingRegister,
    googleOAuthUrl,
    isLoadingLogin,
  } = useModal();

  return ReactDOM.createPortal(
    <div
      className={`${
        isOpenModal ? 'block' : 'hidden'
      } fixed inset-0 z-50 flex items-center justify-center w-full h-full`}
    >
      <OverPlay />
      <div className="relative z-20 px-[60px] pt-[37px] pb-[60px] bg-white rounded-lg w-[550px]">
        <div className="flex items-center border-b ">
          <span
            className={`nav-link relative signIn-class font-PpLight text-2xl py-[9px] px-[10px] w-1/2 text-center cursor-pointer ${
              activeTab === MODAL_TABS.SIGN_IN
                ? 'text-primary active'
                : 'text-backPrimary'
            }`}
            onClick={handleSignInClick}
          >
            Sign In
          </span>
          <span
            className={`nav-link relative signUp-class font-PpLight text-2xl py-[9px] px-[10px] w-1/2 text-center cursor-pointer ${
              activeTab === MODAL_TABS.SIGN_UP
                ? 'text-primary active'
                : 'text-backPrimary'
            }`}
            onClick={handleSignUpClick}
          >
            Register
          </span>
        </div>
        <form onSubmit={onSubmit} className="flex flex-col gap-4 pt-5">
          {activeTab === MODAL_TABS.SIGN_UP && (
            <Input
              required
              label="Full name"
              control={control}
              name="full_name"
            ></Input>
          )}
          <Input
            required
            label={`${
              activeTab === MODAL_TABS.SIGN_IN
                ? 'Email address'
                : 'Your email address'
            }`}
            control={control}
            name="email"
          ></Input>
          <Input
            type="password"
            required
            label="Password"
            control={control}
            name="password"
          ></Input>
          {activeTab === MODAL_TABS.SIGN_UP && (
            <Input
              type="password"
              required
              label="Confirm password"
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
              loading={isLoadingLogin || isLoadingRegister}
              className="ml-auto"
              text={`${
                activeTab === MODAL_TABS.SIGN_IN ? 'LOG IN' : 'REGISTER'
              }`}
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
    document.querySelector('body') as Element,
  );
};

export default Modal;
