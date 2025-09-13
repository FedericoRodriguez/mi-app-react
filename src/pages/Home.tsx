import { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { FiRefreshCw, FiUserPlus, FiUsers, FiInfo } from 'react-icons/fi';

import Card from '../components/ui/Card';
import UserList from '../components/features/UserList';
import { SelectedUserProvider } from '../contexts/SelectedUserContext';
import { setNewUser } from '../services/userService';

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Home = () => {
  const [count, setCount] = useState<number>(0);
  const [nombre, setNombre] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [refreshUsers, setRefreshUsers] = useState<boolean>(false);
  const [showWelcome, setShowWelcome] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = (): void => {
    setRefreshUsers(prev => !prev);
  };

  const manejarCambio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNombre(e.target.value);
  };

  const incrementar = () => {
    setCount(prev => prev + 1);
  };

  const postUser = async () => {
    if (!nombre.trim()) return;
    
    setIsLoading(true);
    try {
      await setNewUser(nombre);
      setNombre('');
      setRefreshUsers(prev => !prev);
    } catch (error) {
      console.error('Error al crear usuario:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SelectedUserProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <AnimatePresence>
          {showWelcome && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-blue-50 dark:bg-blue-900/30 border-l-4 border-blue-500 p-4 mb-6"
            >
              <div className="flex items-center">
                <FiInfo className="h-5 w-5 text-blue-500 mr-2" />
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  ¡Bienvenido a la aplicación de gestión de usuarios!
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
              Mi primera app en React + TypeScript
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-3 text-lg">
              Una aplicación moderna con diseño responsivo y accesible
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* User Form Card */}
            <motion.div variants={itemVariants}>
              <Card
                title="Panel de Control"
                description="Gestiona tu perfil y preferencias"
                hoverEffect
                className="h-full"
              >
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Nombre
                    </label>
                    <input
                      type="text"
                      value={nombre}
                      onChange={manejarCambio}
                      placeholder="Ingresa tu nombre"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white transition duration-200"
                      onKeyDown={(e) => e.key === 'Enter' && postUser()}
                    />
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={incrementar}
                      className="px-4 py-2.5 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors flex items-center justify-center"
                    >
                      <span>Contador:</span>
                      <span className="ml-1.5 bg-primary-700/80 px-2.5 py-0.5 rounded-md text-sm font-medium">
                        {count}
                      </span>
                    </button>

                    <button
                      onClick={postUser}
                      disabled={!nombre.trim() || isLoading}
                      className={`px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-all flex-1 flex items-center justify-center ${
                        !nombre.trim() || isLoading
                          ? 'bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500 cursor-not-allowed'
                          : 'bg-green-600 text-white hover:bg-green-700 shadow-md hover:shadow-lg'
                      }`}
                    >
                      {isLoading ? (
                        <>
                          <FiRefreshCw className="animate-spin mr-2" />
                          Procesando...
                        </>
                      ) : (
                        <>
                          <FiUserPlus className="mr-2" />
                          {nombre.trim() ? `Guardar ${nombre}` : 'Guardar Usuario'}
                        </>
                      )}
                    </button>
                  </div>

                  {nombre && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700"
                    >
                      <p className="text-gray-700 dark:text-gray-300">
                        Hola, <span className="font-semibold text-primary-600 dark:text-primary-400">{nombre}</span>! 👋
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        Tu correo sería: {nombre.toLowerCase().replace(/\s+/g, '')}@example.com
                      </p>
                    </motion.div>
                  )}
                </div>
              </Card>
            </motion.div>

            {/* User List Card */}
            <motion.div variants={itemVariants} className="h-full flex flex-col">
              <Card
                title="Lista de Usuarios"
                description="Explora y gestiona los usuarios registrados"
                hoverEffect
                className="h-full flex flex-col"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <FiUsers className="mr-2 text-primary-600 dark:text-primary-400" />
                    Usuarios Registrados
                  </h3>
                  <button
                    onClick={handleRefresh}
                    disabled={isLoading}
                    className="p-2 text-gray-500 hover:text-primary-600 dark:text-gray-400 dark:hover:text-primary-400 focus:outline-none transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    aria-label="Actualizar lista"
                  >
                    <FiRefreshCw className={`h-5 w-5 ${isLoading ? 'animate-spin' : ''}`} />
                  </button>
                </div>
                
                <div className="flex-1 overflow-hidden">
                  <div className="h-full overflow-y-auto pr-2 -mr-2">
                    <UserList refresh={refreshUsers} />
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </SelectedUserProvider>
  );
};

export default Home;
