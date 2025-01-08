import { FC, useEffect, useState } from 'react';
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
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds (600 seconds)
  // Effect for transaction polling every 2.5 seconds
  useEffect(() => {
    let intervalId: number;

    if (isOpen) {
      setTimeLeft(600); // Reset the countdown
      // Start the transaction polling every 2.5 seconds
      handleTransactionSePay(); // Call immediately to handle the first transaction
      intervalId = setInterval(handleTransactionSePay, 3000);

      // Cleanup the interval when the modal is closed
      return () => clearInterval(intervalId);
    }
  }, [isOpen]);

  // Effect for countdown timer every second
  useEffect(() => {
    let countdownInterval: number;

    if (isOpen) {
      // Countdown every second
      countdownInterval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(countdownInterval);
            handleCancel(true);
            return prev;
          }
        });
      }, 1000);

      return () => clearInterval(countdownInterval);
    }
  }, [isOpen, handleCancel]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}`;
  };

  return (
    <div className={`${isOpen ? '' : 'hidden'} container`}>
      <div className="h-screen">
        <div></div>
        <Modal
          title={`Thanh toán qua QR: ${formatTime(timeLeft)}`}
          open={isOpen}
          onCancel={() => handleCancel()}
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
