import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMessageSquare, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import PostComments from './PostComments';
import Card from '../ui/Card';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

type Props = {
  userId: number;
};

const UserPosts: React.FC<Props> = ({ userId }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [expandedPosts, setExpandedPosts] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/posts?userId=${userId}`
        );
        if (!res.ok) throw new Error('Error al obtener los posts');
        const data = await res.json();
        setPosts(data);
      } catch (err: unknown) {
        const errorMessage =
          err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleToggleComments = (postId: number) => {
    setSelectedPostId((prev) => (prev === postId ? null : postId));
  };

  const toggleExpand = (postId: number) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-3"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-lg text-sm">
        Error al cargar los posts: {error}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-6">
        <p className="text-gray-500 dark:text-gray-400">Este usuario no tiene publicaciones.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Publicaciones recientes</h3>
      <AnimatePresence>
        {posts.map((post) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Card className="overflow-hidden">
              <div 
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                onClick={() => toggleExpand(post.id)}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-base font-medium text-gray-900 dark:text-white mb-2 pr-4">
                    {post.title}
                  </h4>
                  <button 
                    className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleToggleComments(post.id);
                    }}
                  >
                    <FiMessageSquare className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="relative
                  ${expandedPosts[post.id] ? '' : 'max-h-20 overflow-hidden'}
                  transition-all duration-200 ease-in-out
                ">
                  <p className="text-sm text-gray-600 dark:text-gray-300 whitespace-pre-line">
                    {post.body}
                  </p>
                  {!expandedPosts[post.id] && (
                    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent dark:from-gray-800 dark:to-transparent"></div>
                  )}
                </div>
                
                {post.body.length > 200 && (
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(post.id);
                    }}
                    className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 inline-flex items-center"
                  >
                    {expandedPosts[post.id] ? (
                      <>
                        Mostrar menos <FiChevronUp className="ml-1 h-4 w-4" />
                      </>
                    ) : (
                      <>
                        Leer más <FiChevronDown className="ml-1 h-4 w-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              <AnimatePresence>
                {selectedPostId === post.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-gray-200 dark:border-gray-700">
                      <PostComments postId={post.id} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default UserPosts;
