import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;
const SpinLoading = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <Spin indicator={antIcon} />
    </div>
  );
};

export default SpinLoading;
