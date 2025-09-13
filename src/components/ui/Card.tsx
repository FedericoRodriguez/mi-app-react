import React from 'react';
import { motion } from 'framer-motion';

type CardProps = {
  title?: string;
  description?: string;
  children?: React.ReactNode;
  className?: string;
  noPadding?: boolean;
  hoverEffect?: boolean;
};

const Card: React.FC<CardProps> = ({
  title,
  description,
  children,
  className = '',
  noPadding = false,
  hoverEffect = true,
}) => {
  return (
    <motion.div
      className={`relative bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden transition-all duration-200 ${
        hoverEffect ? 'hover:shadow-md hover:-translate-y-0.5' : ''
      } ${className}`}
      whileHover={hoverEffect ? { y: -2 } : {}}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {(title || description) && (
        <div className="px-6 pt-6 pb-2">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </h3>
          )}
          {description && (
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              {description}
            </p>
          )}
        </div>
      )}
      <div className={!noPadding ? 'p-6' : ''}>{children}</div>
    </motion.div>
  );
};

export default Card;
