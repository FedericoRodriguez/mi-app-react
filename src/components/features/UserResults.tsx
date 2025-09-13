import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiChevronRight } from 'react-icons/fi';
import { useSelectedUser } from '../../contexts/SelectedUserContext';
import { User } from '../../types';

type Props = {
  users: User[];
};

const UserResults: React.FC<Props> = ({ users }) => {
  const { setSelectedUser } = useSelectedUser();

  if (users.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 dark:text-gray-400">No se encontraron usuarios</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {users.map((user, index) => (
          <motion.div
            key={user.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ delay: index * 0.05, duration: 0.2 }}
          >
            <div
              onClick={() => setSelectedUser(user)}
              className="group flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-primary-300 dark:hover:border-primary-700"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400">
                  <FiUser className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      @{user.username}
                    </p>
                    <span className="text-gray-300 dark:text-gray-600">•</span>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {user.email}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                  ID: {user.id}
                </span>
                <FiChevronRight className="h-5 w-5 text-gray-400 group-hover:text-primary-500 transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default UserResults;
