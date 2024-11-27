import { FC, useEffect } from 'react';
import { Button, Modal } from 'antd';
import { TPaymentQRProps } from './tyings';

const PaymentQR: FC<TPaymentQRProps> = ({
  isOpen,
  total,
  desc,
  handleCancel,
  handleConfirmClose,
  isConfirmVisible,
  setIsConfirmVisible,
  handleTransactionSePay,
}) => {
  useEffect(() => {
    let intervalId: number;
    if (isOpen) {
      handleTransactionSePay;
      intervalId = setInterval(handleTransactionSePay, 2500);

      return () => clearInterval(intervalId);
    }
  }, [isOpen]);
  return (
    <div className="container">
      <div className="h-screen">
        <Modal
          title="Thanh toán qua QR"
          open={isOpen}
          onCancel={handleCancel}
          footer={null}
          className="flex items-center justify-center"
        >
          <img
            className="w-[300px] h-[300px]"
            src={`https://qr.sepay.vn/img?acc=0704590124&bank=MBBank&amount=${total}&des=${desc}`}
            alt="QR Code"
          />
        </Modal>

        <Modal
          title="Xác nhận"
          open={isConfirmVisible}
          onCancel={() => setIsConfirmVisible(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsConfirmVisible(false)}>
              Hủy
            </Button>,
            <Button key="confirm" type="primary" onClick={handleConfirmClose}>
              Xác nhận
            </Button>,
          ]}
        >
          <p>Nếu đóng thanh toán thì giao dịch sẽ bị huỷ</p>
        </Modal>
      </div>
    </div>
  );
};

export default PaymentQR;
