import { Navigate, useLocation } from 'react-router-dom';
import { ADMIN_PATHS, CUSTOMER_PATHS, LOCAL_STORAGE } from '../../constants';
import { showToast } from '../../libs';

const OauthPage = () => {
  const { search } = useLocation();
  // check nếu đăng nhập rồi mà vẫn còn vào trang oauth
  const accessTokenExist = localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN);
  const refreshTokenExits = localStorage.getItem(LOCAL_STORAGE.REFRESH_TOKEN);
  if (!search || accessTokenExist || refreshTokenExits) {
    return <Navigate to={CUSTOMER_PATHS.ROOT} />;
  }
  // Extract query parameters from the URL using URLSearchParams
  const urlParams = new URLSearchParams(search);
  const accessToken = urlParams.get('access_token');
  const refreshToken = urlParams.get('refresh_token');
  const role = urlParams.get('role');
  if (accessToken && refreshToken && role) {
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
    localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);
    localStorage.setItem(LOCAL_STORAGE.ROLE, role || '');
    showToast({
      type: 'success',
      message: 'Login Successfully',
    });
  } else {
    showToast({
      type: 'error',
      message: 'Failed',
    });
  }
  return (
    <Navigate to={role === '0' ? ADMIN_PATHS.ROOT : CUSTOMER_PATHS.ROOT} />
  );
};

export default OauthPage;
