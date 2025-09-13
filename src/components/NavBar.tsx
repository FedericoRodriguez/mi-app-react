import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FiHome, FiUser, FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';
import UserSearch from './features/UserSearch';

const NavBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle theme initialization and changes
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      setTheme('dark');
    }
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const navItems = [
    { to: '/', icon: <FiHome className="w-5 h-5" />, label: 'Inicio' },
    { to: '/users', icon: <FiUser className="w-5 h-5" />, label: 'Usuarios' },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Mobile Menu Button */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/" className="text-xl font-bold text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors">
                Mi App
              </Link>
            </div>
            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {navItems.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    location.pathname === item.to
                      ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                  } transition-colors`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-6">
            <UserSearch 
              search={searchQuery}
              setSearch={handleSearch}
              placeholder="Buscar usuarios..."
              className="w-full max-w-md"
            />
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <FiSun className="h-5 w-5" />
              ) : (
                <FiMoon className="h-5 w-5" />
              )}
            </button>
            
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden p-2 rounded-md text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {/* Mobile Search */}
            <div className="px-4 py-3">
              <UserSearch 
                search={searchQuery}
                setSearch={handleSearch}
                placeholder="Buscar usuarios..."
              />
            </div>
            
            {/* Mobile Navigation Links */}
            {navItems.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center px-4 py-3 text-base font-medium rounded-md ${
                  location.pathname === item.to
                    ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
