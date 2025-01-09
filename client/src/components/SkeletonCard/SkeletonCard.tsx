import { Skeleton } from 'antd';
import './SkeletonCard.scss';
const SkeletonCard = () => {
  return (
    <div className="flex-1">
      <div className="h-[840px] 2xl:h-[1000px] xl:h-[870px] w-full relative ml-auto">
        <div className="grid w-full h-full grid-cols-2 md:grid-cols-3 gap-[15px] md:gap-[30px] ml-auto">
          {new Array(6).fill('').map((_, index) => (
            <div
              key={index}
              className="h-max max-w-[257px] flex flex-col gap-[10px]"
            >
              <Skeleton.Image
                active
                style={{
                  width: '100%',
                  paddingBottom: '90%',
                  position: 'relative',
                  height: 0,
                }}
                className="image-skeleton"
              />
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
