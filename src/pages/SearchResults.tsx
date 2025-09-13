import { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiAlertCircle, FiArrowLeft, FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';
import Card from '../components/ui/Card';
import UserSearch from '../components/features/UserSearch';
import { User } from '../types';

interface SearchParams {
  q?: string;
  [key: string]: string | undefined;
}

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Parse search query from URL
  const getSearchParams = useCallback((): SearchParams => {
    const params = new URLSearchParams(location.search);
    const searchParams: SearchParams = {};
    
    for (const [key, value] of params.entries()) {
      searchParams[key] = value;
    }
    
    return searchParams;
  }, [location.search]);

  const performSearch = useCallback(async (query: string): Promise<void> => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you would fetch from your API
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users?q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Error al buscar usuarios');
      }
      
      const data: User[] = await response.json();
      setSearchResults(data);
    } catch (err) {
      console.error('Search error:', err);
      setError('Error al realizar la búsqueda. Por favor, inténtalo de nuevo.');
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  }, [setSearchResults, setIsLoading, setError]);

  const handleSearch = useCallback((query: string): void => {
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`, { replace: true });
    } else {
      navigate('/search', { replace: true });
    }
  }, [navigate]);

  const handleBack = useCallback((): void => {
    navigate(-1);
  }, [navigate]);

  // Handle search when query changes
  useEffect(() => {
    const { q = '' } = getSearchParams();
    setSearchQuery(q);
    
    if (q.trim()) {
      performSearch(q);
    } else {
      setSearchResults([]);
    }
  }, [getSearchParams, performSearch]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-6 flex items-center text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 transition-colors"
        >
          <FiArrowLeft className="mr-2" /> Volver
        </button>
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {searchQuery ? `Resultados para "${searchQuery}"` : 'Búsqueda'}
          </h1>
          <div className="max-w-2xl">
            <UserSearch
              search={searchQuery}
              setSearch={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Buscar por nombre o correo..."
              autoFocus
            />
          </div>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiAlertCircle className="h-5 w-5 text-red-500" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
              </div>
            </div>
          </div>
        ) : searchResults.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {searchResults.map((user) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card hoverEffect>
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                        <FiUser className="h-6 w-6 text-primary-600 dark:text-primary-400" />
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mt-1">
                          <FiMail className="mr-1.5 h-4 w-4 flex-shrink-0" />
                          <span>{user.email}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          @{user.username}
                        </p>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : searchQuery ? (
          <div className="text-center py-12">
            <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No se encontraron resultados</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              No hay usuarios que coincidan con "{searchQuery}".
            </p>
          </div>
        ) : (
          <div className="text-center py-12">
            <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">Realiza una búsqueda</h3>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Ingresa un término de búsqueda para encontrar usuarios.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
