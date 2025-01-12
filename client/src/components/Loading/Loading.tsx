import './index.css';

const Loading = () => {
  return (
    <div className="flex items-center justify-center bg-white w-screen h-screen fixed inset-0 z-50">
      <div className="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loading;
