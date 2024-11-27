import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { generateDesc } from '../../utils'; // Hàm tạo desc tự động

const PaymentPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); // Trạng thái hiển thị modal

  const showModal = () => {
    setIsModalVisible(true); // Mở modal
  };

  const handleCancel = () => {
    setIsModalVisible(false); // Đóng modal
  };

  const desc = generateDesc(); // Tạo desc tự động

  return (
    <div className="container">
      <div className="h-screen">
        <Button type="primary" onClick={showModal}>
          Hiển thị QR Code
        </Button>
        <Modal
          title="Thanh toán qua QR"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null} // Không cần nút "OK" hay "Cancel"
        >
          <div className="text-center">
            <img
              className="dark:invert"
              src={`https://qr.sepay.vn/img?acc=0704590124&bank=MBBank&amount=10000&des=${desc}`}
              alt="QR Code"
              width={180}
              height={38}
            />
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default PaymentPage;
