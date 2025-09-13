import { useState, useEffect, useCallback, KeyboardEvent } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface UserSearchProps {
  search: string;
  setSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
  onSearch?: (query: string) => void;
  autoFocus?: boolean;
}

const UserSearch: React.FC<UserSearchProps> = ({
  search,
  setSearch,
  placeholder = 'Buscar por nombre o usuario...',
  className = '',
  onSearch,
  autoFocus = false,
}) => {
  const [localSearch, setLocalSearch] = useState<string>(search);
  const [isFocused, setIsFocused] = useState<boolean>(false);

  // Sync local state with prop
  useEffect(() => {
    setLocalSearch(search);
  }, [search]);

  // Debounce search updates
  useEffect(() => {
    const timer = setTimeout(() => {
      if (localSearch !== search) {
        setSearch(localSearch);
        if (onSearch) {
          onSearch(localSearch);
        }
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearch, search, setSearch, onSearch]);

  const clearSearch = useCallback((): void => {
    setLocalSearch('');
    setSearch('');
    if (onSearch) {
      onSearch('');
    }
  }, [setSearch, onSearch]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Escape') {
      clearSearch();
    } else if (e.key === 'Enter' && onSearch) {
      onSearch(localSearch);
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div 
        className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
        aria-hidden="true"
      >
        <FiSearch className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={localSearch}
        onChange={(e) => setLocalSearch(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={`block w-full pl-10 pr-10 py-2.5 text-sm border ${
          isFocused 
            ? 'border-primary-500 ring-1 ring-primary-500' 
            : 'border-gray-300 dark:border-gray-600'
        } rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition duration-150 ease-in-out`}
        aria-label={placeholder}
        aria-describedby="search-description"
      />
      <div id="search-description" className="sr-only">
        Presiona Enter para buscar
      </div>
      {localSearch && (
        <button
          type="button"
          onClick={clearSearch}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 rounded-full p-1"
          aria-label="Limpiar búsqueda"
        >
          <FiX className="h-5 w-5" />
        </button>
      )}
    </div>
  );
};

export default UserSearch;
