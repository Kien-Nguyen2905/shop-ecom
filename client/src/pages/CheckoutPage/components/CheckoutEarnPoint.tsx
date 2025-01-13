import React from 'react';
import Input from '../../../components/Input/Input';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components';
import { TCheckoutEarnPointProps } from './tyings';

const CheckoutEarnPoint: React.FC<TCheckoutEarnPointProps> = ({
  availablePoints,
  applyEarnPoint,
  appliedPoints,
}) => {
  const { control, handleSubmit } = useForm<{ point: string }>();

  const handleApplyPoints = (data: { point: string }) => {
    const points = +data.point;
    applyEarnPoint(points);
  };

  return (
    <div className="w-full md:w-[380px] pb-7 flex flex-col gap-3">
      <div>
        <span>
          Available Points: <b className="text-primary">{availablePoints}</b>
        </span>
        {' | '}
        <span>
          Applied Points: <b className="text-primary">{appliedPoints}</b>
        </span>
      </div>
      <div className="flex items-start gap-4">
        <Input
          name="point"
          type="number"
          control={control}
          required
          rules={{
            validate: {
              isPositiveInteger: (value: string) =>
                (/^[1-9]\d*$/.test(value) && +value > 0) ||
                'Points must be a positive number greater than 0',
              isWithinLimit: (value: string) =>
                parseInt(value, 10) <= availablePoints ||
                `Points cannot exceed ${availablePoints}`,
            },
          }}
          className=""
        />
        <Button
          onClick={handleSubmit(handleApplyPoints)}
          className="btn-primary"
          text=" Apply"
        ></Button>
      </div>
    </div>
  );
};

export default CheckoutEarnPoint;
