import { Flex, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const LoadingSpin = () => {
  return (
    <Flex align="center" gap="middle">
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
    </Flex>
  );
};

export default LoadingSpin;
