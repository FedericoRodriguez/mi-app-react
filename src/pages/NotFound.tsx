import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-4">
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-6">Página no encontrada</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Lo sentimos, no pudimos encontrar la página que estás buscando.
      </p>
      <Link
        to="/"
        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-200"
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default NotFound;
