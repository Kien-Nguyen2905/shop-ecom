import { Modal, Rate } from 'antd';
import { FC } from 'react';
import Input from '../../../components/Input/Input';
import { Button } from '../../../components';
import { TModalViewProps } from './tyings';

const ModalReview: FC<TModalViewProps> = ({
  closeModal,
  isModalOpen,
  control,
  onChangeRate,
  handlePostReview,
}) => {
  return (
    <Modal
      title="Review Product"
      open={isModalOpen}
      footer={null}
      onCancel={closeModal}
    >
      <div>
        <Rate onChange={(valueRate) => onChangeRate(valueRate)} />
      </div>
      <form onSubmit={handlePostReview}>
        <Input label="Title review" name="title" required control={control} />
        <Input
          label="Description review"
          name="description"
          required
          control={control}
        />
        <div className="mt-5 ml-auto w-max">
          <Button text="Send" />
        </div>
      </form>
    </Modal>
  );
};

export default ModalReview;
