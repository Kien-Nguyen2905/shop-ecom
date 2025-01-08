import './index.css';

const Loading = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen ">
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
