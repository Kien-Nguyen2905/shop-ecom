import { Button, Input, message, Modal } from 'antd';
import { useState } from 'react';

interface ModalEarnPointProps {
  onApply: (earnPoint: number) => void; // Callback để gửi earnPoint lên CartInvoice
}

const ModalEarnPoint: React.FC<ModalEarnPointProps> = ({ onApply }) => {
  const [earnPoint, setEarnPoint] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleApplyEarnPoint = () => {
    if (earnPoint <= 0) {
      message.error('EarnPoint must be greater than 0!');
      return;
    }
    onApply(earnPoint); // Gửi giá trị earnPoint lên CartInvoice
    message.success('EarnPoint applied successfully!');
    setIsModalOpen(false);
  };

  const openModalEarnPoint = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <div className="block ml-auto w-max">
        <Button onClick={openModalEarnPoint} type="primary">
          Apply EarnPoint
        </Button>
      </div>
      <Modal
        title="Apply EarnPoint"
        open={isModalOpen}
        onOk={handleApplyEarnPoint}
        onCancel={handleCancel}
        okText="Apply"
        cancelText="Cancel"
      >
        <p>Enter your EarnPoint:</p>
        <Input
          type="number"
          value={earnPoint}
          onChange={(e) => setEarnPoint(Number(e.target.value))}
          placeholder="Enter EarnPoint"
        />
      </Modal>
    </div>
  );
};

export default ModalEarnPoint;
