import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BlogPost, blogService } from '../services/api';
import BlogCard from '../components/BlogCard';
import HeroSection from '../components/HeroSection';
import { Button } from '../components/ui/Button';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  PlusIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Home: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    // Filter posts based on search term
    const filtered = posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.content.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredPosts(filtered);
  }, [posts, searchTerm]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const fetchedPosts = await blogService.getAllPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error fetching posts:', error);
      toast.error('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id: number) => {
    try {
      await blogService.deletePost(id);
      setPosts(posts.filter((post) => post.id !== id));
      toast.success('Post deleted successfully');
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Failed to delete post');
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <HeroSection postCount={posts.length} />

      {/* Main Content */}
      <div className="relative -mt-32 pb-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Content Card */}
          <div className="rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl border border-gray-200/50 dark:bg-gray-900/80 dark:border-gray-800/50 p-8 lg:p-12">
            {/* Section Header */}
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
              <div className="mb-6 lg:mb-0">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Latest Articles
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400">
                  Discover stories, thinking, and expertise from our community
                </p>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="relative">
                  <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search articles..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full sm:w-80 rounded-lg border border-gray-300 bg-white/50 pl-10 pr-4 py-3 text-sm placeholder-gray-500 backdrop-blur-sm transition-all focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 dark:border-gray-600 dark:bg-gray-800/50 dark:text-white dark:placeholder-gray-400"
                  />
                </div>

                {/* Create Post Button */}
                <Link to="/create">
                  <Button
                    variant="gradient"
                    size="lg"
                    leftIcon={<PlusIcon className="h-5 w-5" />}
                    className="w-full sm:w-auto"
                  >
                    Write Article
                  </Button>
                </Link>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <div className="flex flex-col items-center space-y-4">
                  <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600 dark:border-primary-800 dark:border-t-primary-400"></div>
                  <p className="text-gray-600 dark:text-gray-400">
                    Loading articles...
                  </p>
                </div>
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredPosts.length === 0 && searchTerm === '' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="rounded-full bg-primary-100 p-6 dark:bg-primary-900/30">
                  <BookOpenIcon className="h-12 w-12 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  No articles yet
                </h3>
                <p className="mt-2 max-w-sm text-gray-600 dark:text-gray-400">
                  Be the first to share your story with the world. Create your
                  first blog post today!
                </p>
                <Link to="/create" className="mt-6">
                  <Button
                    variant="gradient"
                    size="lg"
                    leftIcon={<PlusIcon className="h-5 w-5" />}
                  >
                    Write Your First Article
                  </Button>
                </Link>
              </motion.div>
            )}

            {/* Search Empty State */}
            {!loading && filteredPosts.length === 0 && searchTerm !== '' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center justify-center py-20 text-center"
              >
                <div className="rounded-full bg-gray-100 p-6 dark:bg-gray-800">
                  <MagnifyingGlassIcon className="h-12 w-12 text-gray-400" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-gray-900 dark:text-white">
                  No articles found
                </h3>
                <p className="mt-2 max-w-sm text-gray-600 dark:text-gray-400">
                  Try adjusting your search terms or browse all articles below.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm('')}
                  className="mt-4"
                >
                  Clear Search
                </Button>
              </motion.div>
            )}

            {/* Blog Posts Grid */}
            {!loading && filteredPosts.length > 0 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
                id="posts"
              >
                <AnimatePresence>
                  {filteredPosts.map((post) => (
                    <motion.div
                      key={post.id}
                      variants={itemVariants}
                      layout
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <BlogCard post={post} onDelete={handleDeletePost} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Results Summary */}
            {!loading && filteredPosts.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 border-t border-gray-200 pt-8 text-center dark:border-gray-800"
              >
                <p className="text-gray-600 dark:text-gray-400">
                  {searchTerm ? (
                    <>
                      Showing {filteredPosts.length} of {posts.length} articles
                      {searchTerm && ` matching "${searchTerm}"`}
                    </>
                  ) : (
                    `${posts.length} ${posts.length === 1 ? 'article' : 'articles'} published`
                  )}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
