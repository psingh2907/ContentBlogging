import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BlogPost } from '../services/api';
import { Button } from './ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from './ui/Card';
import {
  ClockIcon,
  EyeIcon,
  PencilIcon,
  TrashIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';
import {
  getReadingTime,
  formatDate,
  getRelativeTime,
  truncateText,
} from '../utils/cn';
import toast from 'react-hot-toast';

interface BlogCardProps {
  post: BlogPost;
  onDelete: (id: number) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const readingTime = getReadingTime(post.content);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      setIsDeleting(true);
      try {
        await onDelete(post.id);
        toast.success('Post deleted successfully');
      } catch (error) {
        toast.error('Failed to delete post');
        setIsDeleting(false);
      }
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
      className="group h-full"
    >
      <Card
        variant="default"
        hover="lift"
        className="h-full overflow-hidden transition-all duration-300 group-hover:shadow-glow"
      >
        {/* Header with gradient background */}
        <CardHeader className="relative bg-gradient-to-br from-primary-50 via-purple-50 to-pink-50 dark:from-primary-900/20 dark:via-purple-900/20 dark:to-pink-900/20 pb-8">
          {/* Decorative pattern */}
          <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern
                  id={`pattern-${post.id}`}
                  patternUnits="userSpaceOnUse"
                  width="20"
                  height="20"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="2"
                    fill="currentColor"
                    className="text-primary-400"
                  />
                </pattern>
              </defs>
              <rect
                width="100"
                height="100"
                fill={`url(#pattern-${post.id})`}
              />
            </svg>
          </div>

          {/* Post metadata */}
          <div className="relative z-10 flex items-center justify-between mb-4">
            <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center space-x-1">
                <CalendarIcon className="h-4 w-4" />
                <span>Post #{post.id}</span>
              </div>
              <div className="flex items-center space-x-1">
                <ClockIcon className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>

            {/* View count (placeholder) */}
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <EyeIcon className="h-4 w-4" />
              <span>{Math.floor(Math.random() * 100) + 10}</span>
            </div>
          </div>

          {/* Title */}
          <Link to={`/post/${post.id}`} className="group/title block">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight group-hover/title:text-primary-600 dark:group-hover/title:text-primary-400 transition-colors duration-200">
              {truncateText(post.title, 60)}
            </h3>
          </Link>
        </CardHeader>

        {/* Content */}
        <CardContent className="flex-1">
          <Link to={`/post/${post.id}`}>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200">
              {truncateText(post.content, 150)}
            </p>
          </Link>
        </CardContent>

        {/* Footer */}
        <CardFooter className="border-t border-gray-100 dark:border-gray-800 justify-between pt-4">
          <div className="flex items-center space-x-2">
            {/* Author avatar placeholder */}
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {post.title.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                Anonymous
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                Article ID: {post.id}
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            <Link to={`/edit/${post.id}`}>
              <Button
                size="sm"
                variant="ghost"
                leftIcon={<PencilIcon className="h-4 w-4" />}
              >
                Edit
              </Button>
            </Link>

            <Button
              size="sm"
              variant="ghost"
              onClick={handleDelete}
              loading={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20"
            >
              <TrashIcon className="h-4 w-4" />
            </Button>
          </div>
        </CardFooter>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-600/0 to-purple-600/0 group-hover:from-primary-600/5 group-hover:to-purple-600/5 transition-all duration-300 pointer-events-none" />
      </Card>
    </motion.div>
  );
};

export default BlogCard;
