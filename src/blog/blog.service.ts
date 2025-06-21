import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BlogPost } from './entities/blog-post.entity';

/**
 * Data Transfer Object for creating a new blog post
 * @interface CreateBlogPostDto
 */
export interface CreateBlogPostDto {
  /** Optional ID for the blog post (auto-generated if not provided) */
  id?: number;
  /** The title of the blog post */
  title: string;
  /** The content/body of the blog post */
  content: string;
}

/**
 * Data Transfer Object for updating an existing blog post
 * @interface UpdateBlogPostDto
 */
export interface UpdateBlogPostDto {
  /** Optional updated title for the blog post */
  title?: string;
  /** Optional updated content for the blog post */
  content?: string;
}

/**
 * Service responsible for managing blog posts
 *
 * This service handles all CRUD operations for blog posts including:
 * - Creating new blog posts
 * - Retrieving blog posts (all or by ID)
 * - Updating existing blog posts
 * - Deleting blog posts
 *
 * @class BlogService
 */
@Injectable()
export class BlogService {
  /**
   * Creates an instance of BlogService
   * @param {Repository<BlogPost>} blogPostRepository - TypeORM repository for BlogPost entity
   */
  constructor(
    @InjectRepository(BlogPost)
    private readonly blogPostRepository: Repository<BlogPost>,
  ) {}

  /**
   * Creates a new blog post
   *
   * @param {CreateBlogPostDto} createBlogPostDto - The data for creating a new blog post
   * @returns {Promise<BlogPost>} The created blog post with generated ID and timestamps
   * @throws {BadRequestException} When title or content is empty/invalid
   *
   * @example
   * ```typescript
   * const newPost = await blogService.create({
   *   title: "My First Post",
   *   content: "This is my first blog post content."
   * });
   * ```
   */
  async create(createBlogPostDto: CreateBlogPostDto): Promise<BlogPost> {
    try {
      // Validate input
      if (!createBlogPostDto.title?.trim()) {
        throw new BadRequestException('Title is required');
      }
      if (!createBlogPostDto.content?.trim()) {
        throw new BadRequestException('Content is required');
      }

      // Create new blog post (id will be auto-generated)
      const blogPost = this.blogPostRepository.create({
        title: createBlogPostDto.title.trim(),
        content: createBlogPostDto.content.trim(),
      });

      return await this.blogPostRepository.save(blogPost);
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Failed to create blog post');
    }
  }

  /**
   * Retrieves all blog posts from the database
   *
   * @returns {Promise<BlogPost[]>} Array of all blog posts, ordered by creation date (newest first)
   * @throws {BadRequestException} When database operation fails
   *
   * @example
   * ```typescript
   * const allPosts = await blogService.findAll();
   * console.log(`Found ${allPosts.length} blog posts`);
   * ```
   */
  async findAll(): Promise<BlogPost[]> {
    try {
      return await this.blogPostRepository.find({
        order: { createdAt: 'DESC' }, // Most recent first
      });
    } catch {
      throw new BadRequestException('Failed to fetch blog posts');
    }
  }

  /**
   * Retrieves a single blog post by its ID
   *
   * @param {number} id - The ID of the blog post to retrieve
   * @returns {Promise<BlogPost>} The blog post with the specified ID
   * @throws {BadRequestException} When the ID is invalid (not a positive number)
   * @throws {NotFoundException} When no blog post exists with the given ID
   *
   * @example
   * ```typescript
   * try {
   *   const post = await blogService.findOne(1);
   *   console.log(`Found post: ${post.title}`);
   * } catch (error) {
   *   console.error('Post not found');
   * }
   * ```
   */
  async findOne(id: number): Promise<BlogPost> {
    try {
      if (!id || id <= 0) {
        throw new BadRequestException('Invalid blog post ID');
      }

      const blogPost = await this.blogPostRepository.findOne({
        where: { id },
      });

      if (!blogPost) {
        throw new NotFoundException(`Blog post with ID ${id} not found`);
      }

      return blogPost;
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to fetch blog post');
    }
  }

  /**
   * Updates an existing blog post
   *
   * @param {number} id - The ID of the blog post to update
   * @param {UpdateBlogPostDto} updateBlogPostDto - The updated data for the blog post
   * @returns {Promise<BlogPost>} The updated blog post
   * @throws {NotFoundException} When no blog post exists with the given ID
   * @throws {BadRequestException} When the update data is invalid or the operation fails
   *
   * @example
   * ```typescript
   * const updatedPost = await blogService.update(1, {
   *   title: "Updated Title",
   *   content: "Updated content here..."
   * });
   * ```
   */
  async update(
    id: number,
    updateBlogPostDto: UpdateBlogPostDto,
  ): Promise<BlogPost> {
    try {
      // First, check if the blog post exists
      await this.findOne(id);

      // Validate input
      if (
        updateBlogPostDto.title !== undefined &&
        !updateBlogPostDto.title.trim()
      ) {
        throw new BadRequestException('Title cannot be empty');
      }
      if (
        updateBlogPostDto.content !== undefined &&
        !updateBlogPostDto.content.trim()
      ) {
        throw new BadRequestException('Content cannot be empty');
      }

      // Update the blog post
      const updateData: Partial<BlogPost> = {};
      if (updateBlogPostDto.title) {
        updateData.title = updateBlogPostDto.title.trim();
      }
      if (updateBlogPostDto.content) {
        updateData.content = updateBlogPostDto.content.trim();
      }

      await this.blogPostRepository.update(id, updateData);

      // Return the updated blog post
      return await this.findOne(id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to update blog post');
    }
  }

  /**
   * Deletes a blog post by its ID
   *
   * @param {number} id - The ID of the blog post to delete
   * @returns {Promise<void>} Promise that resolves when the blog post is successfully deleted
   * @throws {NotFoundException} When no blog post exists with the given ID
   * @throws {BadRequestException} When the deletion operation fails
   *
   * @example
   * ```typescript
   * try {
   *   await blogService.remove(1);
   *   console.log('Blog post deleted successfully');
   * } catch (error) {
   *   console.error('Failed to delete blog post:', error.message);
   * }
   * ```
   */
  async remove(id: number): Promise<void> {
    try {
      // First, check if the blog post exists
      await this.findOne(id);

      // Delete the blog post
      await this.blogPostRepository.delete(id);
    } catch (error) {
      if (
        error instanceof NotFoundException ||
        error instanceof BadRequestException
      ) {
        throw error;
      }
      throw new BadRequestException('Failed to delete blog post');
    }
  }
}
