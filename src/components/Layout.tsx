import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { useEffect } from 'react';

const Layout = () => {
  // Add smooth scrolling behavior
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Smooth scroll to top on route change
      window.scrollTo(0, 0);
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header with NavBar */}
      <header className="w-full bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
        <NavBar />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 w-full">
            <Outlet />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Mi App. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
