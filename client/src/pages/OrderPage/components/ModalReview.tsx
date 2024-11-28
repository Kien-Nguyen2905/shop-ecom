import { Modal, Rate } from 'antd';
import React, { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../../components/Input/Input';
import { Button } from '../../../components';
import { TModalRiewProps } from './tyings';

const ModalReview: FC<TModalRiewProps> = ({
  closeModal,
  isModalOpen,
  handleSubmit,
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
      <div className="">
        <Rate onChange={(valueRate) => onChangeRate(valueRate)} />
      </div>
      <form onSubmit={handleSubmit(handlePostReview)}>
        <Input lable="Title review" name="title" required control={control} />
        <Input
          lable="Description review"
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
