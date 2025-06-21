import axios from 'axios';

/**
 * Base URL for the blog API
 * @constant {string}
 */
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

/**
 * Interface representing a blog post
 * @interface BlogPost
 */
export interface BlogPost {
  /** Unique identifier for the blog post */
  id: number;
  /** Title of the blog post */
  title: string;
  /** Content/body of the blog post */
  content: string;
}

/**
 * Interface for creating a new blog post
 * @interface CreateBlogPost
 */
export interface CreateBlogPost {
  /** Optional ID for the blog post (usually auto-generated) */
  id: number;
  /** Title of the new blog post */
  title: string;
  /** Content/body of the new blog post */
  content: string;
}

/**
 * Interface for updating an existing blog post
 * @interface UpdateBlogPost
 */
export interface UpdateBlogPost {
  /** Optional updated title */
  title?: string;
  /** Optional updated content */
  content?: string;
}

/**
 * Axios instance configured for the blog API
 * @constant {AxiosInstance}
 */
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Service object containing all blog-related API operations
 *
 * This service provides methods to interact with the blog API endpoints:
 * - GET /blog - Retrieve all blog posts
 * - GET /blog/:id - Retrieve a specific blog post
 * - POST /blog - Create a new blog post
 * - PUT /blog/:id - Update an existing blog post
 * - DELETE /blog/:id - Delete a blog post
 *
 * @namespace blogService
 */
export const blogService = {
  /**
   * Retrieves all blog posts from the server
   *
   * @async
   * @function getAllPosts
   * @returns {Promise<BlogPost[]>} Promise resolving to an array of blog posts
   * @throws {Error} When the API request fails
   *
   * @example
   * ```typescript
   * try {
   *   const posts = await blogService.getAllPosts();
   *   console.log(`Found ${posts.length} blog posts`);
   * } catch (error) {
   *   console.error('Failed to fetch posts:', error);
   * }
   * ```
   */
  getAllPosts: async (): Promise<BlogPost[]> => {
    const response = await api.get('/blog');
    return response.data;
  },

  /**
   * Retrieves a single blog post by its ID
   *
   * @async
   * @function getPost
   * @param {number} id - The ID of the blog post to retrieve
   * @returns {Promise<BlogPost>} Promise resolving to the requested blog post
   * @throws {Error} When the API request fails or post is not found
   *
   * @example
   * ```typescript
   * try {
   *   const post = await blogService.getPost(1);
   *   console.log(`Post title: ${post.title}`);
   * } catch (error) {
   *   console.error('Post not found:', error);
   * }
   * ```
   */
  getPost: async (id: number): Promise<BlogPost> => {
    const response = await api.get(`/blog/${id}`);
    return response.data;
  },

  /**
   * Creates a new blog post on the server
   *
   * @async
   * @function createPost
   * @param {CreateBlogPost} post - The blog post data to create
   * @returns {Promise<void>} Promise that resolves when the post is created
   * @throws {Error} When the API request fails or validation errors occur
   *
   * @example
   * ```typescript
   * try {
   *   await blogService.createPost({
   *     id: 1,
   *     title: "My New Post",
   *     content: "This is the content of my new post."
   *   });
   *   console.log('Post created successfully');
   * } catch (error) {
   *   console.error('Failed to create post:', error);
   * }
   * ```
   */
  createPost: async (post: CreateBlogPost): Promise<void> => {
    await api.post('/blog', post);
  },

  /**
   * Updates an existing blog post on the server
   *
   * @async
   * @function updatePost
   * @param {number} id - The ID of the blog post to update
   * @param {UpdateBlogPost} post - The updated blog post data
   * @returns {Promise<void>} Promise that resolves when the post is updated
   * @throws {Error} When the API request fails, post is not found, or validation errors occur
   *
   * @example
   * ```typescript
   * try {
   *   await blogService.updatePost(1, {
   *     title: "Updated Title",
   *     content: "Updated content here."
   *   });
   *   console.log('Post updated successfully');
   * } catch (error) {
   *   console.error('Failed to update post:', error);
   * }
   * ```
   */
  updatePost: async (id: number, post: UpdateBlogPost): Promise<void> => {
    await api.put(`/blog/${id}`, post);
  },

  /**
   * Deletes a blog post from the server
   *
   * @async
   * @function deletePost
   * @param {number} id - The ID of the blog post to delete
   * @returns {Promise<void>} Promise that resolves when the post is deleted
   * @throws {Error} When the API request fails or post is not found
   *
   * @example
   * ```typescript
   * try {
   *   await blogService.deletePost(1);
   *   console.log('Post deleted successfully');
   * } catch (error) {
   *   console.error('Failed to delete post:', error);
   * }
   * ```
   */
  deletePost: async (id: number): Promise<void> => {
    await api.delete(`/blog/${id}`);
  },
};
