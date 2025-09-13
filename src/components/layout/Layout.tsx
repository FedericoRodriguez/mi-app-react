import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import { ReactNode } from 'react';

interface LayoutProps {
  children?: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50">
        <NavBar />
      </header>
      <main className="flex-grow bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          {children || <Outlet />}
        </div>
      </main>
      <footer className="bg-gray-900 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Mi App React. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
