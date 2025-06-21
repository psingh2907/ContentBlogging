import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/Button';
import {
  ArrowRightIcon,
  PencilSquareIcon,
  BookOpenIcon,
} from '@heroicons/react/24/outline';

interface HeroSectionProps {
  postCount: number;
}

const HeroSection: React.FC<HeroSectionProps> = ({ postCount }) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 dark:opacity-10">
        <svg
          className="h-full w-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 60 60"
        >
          <defs>
            <pattern
              id="grid"
              width="60"
              height="60"
              patternUnits="userSpaceOnUse"
            >
              <circle
                cx="30"
                cy="30"
                r="2"
                fill="currentColor"
                className="text-gray-400"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-10 left-10 h-64 w-64 rounded-full bg-gradient-to-r from-primary-400 to-purple-400 opacity-10 blur-3xl animate-pulse-slow"></div>
      <div
        className="absolute bottom-10 right-10 h-96 w-96 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-10 blur-3xl animate-pulse-slow"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <span className="inline-flex items-center rounded-full bg-primary-100 px-4 py-2 text-sm font-medium text-primary-800 dark:bg-primary-900/30 dark:text-primary-300">
              <BookOpenIcon className="mr-2 h-4 w-4" />
              {postCount} {postCount === 1 ? 'Story' : 'Stories'} Published
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mx-auto max-w-4xl text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl"
          >
            Share Your
            <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
              {' '}
              Stories
            </span>
            <br />
            With The World
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-gray-600 dark:text-gray-300"
          >
            Create beautiful blog posts, share your thoughts, and connect with
            readers from around the globe. Your voice matters—let it be heard.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link to="/create">
              <Button
                size="xl"
                variant="gradient"
                className="group"
                leftIcon={<PencilSquareIcon className="h-5 w-5" />}
                rightIcon={
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                }
              >
                Start Writing
              </Button>
            </Link>

            <a href="#posts">
              <Button
                size="xl"
                variant="outline"
                leftIcon={<BookOpenIcon className="h-5 w-5" />}
              >
                Explore Posts
              </Button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-16 flex flex-wrap items-center justify-center gap-8 text-center"
          >
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                {postCount}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {postCount === 1 ? 'Published Story' : 'Published Stories'}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                ∞
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Possibilities
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                24/7
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                Always Online
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
