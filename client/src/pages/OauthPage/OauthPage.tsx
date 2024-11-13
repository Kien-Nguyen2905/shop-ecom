import { Navigate, useLocation } from 'react-router-dom';
import { CUSTOMER_PATHS, LOCAL_STORAGE } from '../../constants';
import { showToast } from '../../libs';

const OauthPage = () => {
  const { search } = useLocation();
  if (!search) {
    return <Navigate to={CUSTOMER_PATHS.ROOT} />;
  }
  // Extract query parameters from the URL using URLSearchParams
  const urlParams = new URLSearchParams(search);
  const accessToken = urlParams.get('access_token');
  const refreshToken = urlParams.get('refresh_token');
  if (accessToken && refreshToken) {
    localStorage.setItem(LOCAL_STORAGE.ACCESS_TOKEN, accessToken);
    localStorage.setItem(LOCAL_STORAGE.REFRESH_TOKEN, refreshToken);
    showToast({
      type: 'success',
      message: 'Successfully',
    });
    return <Navigate to={CUSTOMER_PATHS.ROOT} />;
  }
  return <div>Hello</div>;
};

export default OauthPage;
