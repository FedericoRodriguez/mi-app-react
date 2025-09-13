import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiMail, FiPhone, FiGlobe, FiSearch } from 'react-icons/fi';

import UserPosts from './UserPosts';
import UserResults from './UserResults';
import { useSelectedUser } from '../../contexts/SelectedUserContext';
import { User } from '../../types';
import { getUsers, searchUsers, ApiError } from '../../services';
import Card from '../ui/Card';

// Add props type for refresh
type UserListProps = {
  refresh: boolean;
};

const UserList: React.FC<UserListProps> = ({ refresh }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState('');
  const { selectedUser, setSelectedUser } = useSelectedUser();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const data = await getUsers();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        const errorMessage =
          err instanceof ApiError
            ? `Error ${err.status}: ${err.message}`
            : err instanceof Error
            ? err.message
            : 'Error desconocido';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [refresh]);

  useEffect(() => {
    const filtered = searchUsers(users, search);
    setFilteredUsers(filtered);
  }, [search, users]);

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-900/50">
        <div className="text-center py-8">
          <div className="text-red-500 dark:text-red-400 text-5xl mb-4">⚠️</div>
          <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Error al cargar usuarios</h3>
          <p className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Reintentar
          </button>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm transition-colors"
          placeholder="Buscar usuarios..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-4"
        >
          {filteredUsers.length > 0 ? (
            <UserResults users={filteredUsers} />
          ) : (
            <Card className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">No se encontraron usuarios</p>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <Card className="mt-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0">
                  <div className="h-20 w-20 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 text-2xl">
                    <FiUser />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {selectedUser.name}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        @{selectedUser.username}
                      </p>
                    </div>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <span className="sr-only">Cerrar</span>
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start">
                      <FiMail className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</p>
                        <a
                          href={`mailto:${selectedUser.email}`}
                          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          {selectedUser.email}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiPhone className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Teléfono</p>
                        <a
                          href={`tel:${selectedUser.phone}`}
                          className="text-sm text-gray-900 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-400"
                        >
                          {selectedUser.phone}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <FiGlobe className="h-5 w-5 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Sitio web</p>
                        <a
                          href={`https://${selectedUser.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
                        >
                          {selectedUser.website}
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">Publicaciones recientes</h4>
                    <UserPosts userId={selectedUser.id} />
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default UserList
