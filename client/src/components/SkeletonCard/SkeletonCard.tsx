import { Skeleton } from 'antd';

const SkeletonCard = () => {
  return (
    <div className="flex-1">
      <div className="h-[790px] w-max relative">
        <div className="grid w-full h-full grid-cols-3 gap-[30px] ml-auto">
          {new Array(6).fill('').map((_, index) => (
            <div
              key={index}
              className="col-6 h-max col-md-4 col-lg-4 w-[257px] flex flex-col gap-[10px]"
            >
              <Skeleton.Image active style={{ width: '100%', height: 275 }} />
              <Skeleton.Input
                active
                style={{ width: '60%', marginTop: '10px' }}
              />
              <Skeleton.Input active block style={{ marginTop: '10px' }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
