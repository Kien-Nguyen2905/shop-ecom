import { Link } from 'react-router-dom';
import { Button } from '../../components';

const NotFoundPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center gap-5 p-6 text-center bg-white rounded-lg shadow-lg">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="mt-4 text-lg text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link to={'/'}>
          <Button text="Go Back Home"></Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
