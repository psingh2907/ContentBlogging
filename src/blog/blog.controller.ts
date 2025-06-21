import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
} from '@nestjs/common';
import {
  BlogService,
  CreateBlogPostDto,
  UpdateBlogPostDto,
} from './blog.service';

/**
 * Controller responsible for handling HTTP requests related to blog posts
 *
 * This controller provides RESTful endpoints for:
 * - Creating new blog posts (POST /blog)
 * - Retrieving all blog posts (GET /blog)
 * - Retrieving a specific blog post (GET /blog/:id)
 * - Updating blog posts (PUT /blog/:id)
 * - Deleting blog posts (DELETE /blog/:id)
 *
 * @class BlogController
 * @route /blog
 */
@Controller('blog')
export class BlogController {
  /**
   * Creates an instance of BlogController
   * @param {BlogService} blogService - The blog service for handling business logic
   */
  constructor(private readonly blogService: BlogService) {}

  /**
   * Creates a new blog post
   *
   * @route POST /blog
   * @param {CreateBlogPostDto} createBlogPostDto - The blog post data from request body
   * @returns {Promise<{message: string, post: BlogPost}>} Success message with created blog post
   * @throws {BadRequestException} When validation fails or creation fails
   *
   * @example
   * POST /blog
   * Content-Type: application/json
   *
   * {
   *   "title": "My First Blog Post",
   *   "content": "This is the content of my blog post."
   * }
   *
   * Response:
   * {
   *   "message": "Blog post created successfully",
   *   "post": {
   *     "id": 1,
   *     "title": "My First Blog Post",
   *     "content": "This is the content of my blog post.",
   *     "createdAt": "2023-12-01T10:00:00.000Z",
   *     "updatedAt": "2023-12-01T10:00:00.000Z"
   *   }
   * }
   */
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createBlogPostDto: CreateBlogPostDto) {
    const post = await this.blogService.create(createBlogPostDto);
    return {
      message: 'Blog post created successfully',
      post,
    };
  }

  /**
   * Retrieves all blog posts
   *
   * @route GET /blog
   * @returns {Promise<BlogPost[]>} Array of all blog posts ordered by creation date (newest first)
   * @throws {BadRequestException} When database operation fails
   *
   * @example
   * GET /blog
   *
   * Response:
   * [
   *   {
   *     "id": 2,
   *     "title": "Second Post",
   *     "content": "Content of second post",
   *     "createdAt": "2023-12-02T10:00:00.000Z",
   *     "updatedAt": "2023-12-02T10:00:00.000Z"
   *   },
   *   {
   *     "id": 1,
   *     "title": "First Post",
   *     "content": "Content of first post",
   *     "createdAt": "2023-12-01T10:00:00.000Z",
   *     "updatedAt": "2023-12-01T10:00:00.000Z"
   *   }
   * ]
   */
  @Get()
  async findAll() {
    return await this.blogService.findAll();
  }

  /**
   * Retrieves a specific blog post by ID
   *
   * @route GET /blog/:id
   * @param {number} id - The ID of the blog post to retrieve (automatically parsed from URL parameter)
   * @returns {Promise<BlogPost>} The blog post with the specified ID
   * @throws {BadRequestException} When the ID is invalid
   * @throws {NotFoundException} When no blog post exists with the given ID
   *
   * @example
   * GET /blog/1
   *
   * Response:
   * {
   *   "id": 1,
   *   "title": "My First Blog Post",
   *   "content": "This is the content of my blog post.",
   *   "createdAt": "2023-12-01T10:00:00.000Z",
   *   "updatedAt": "2023-12-01T10:00:00.000Z"
   * }
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.blogService.findOne(id);
  }

  /**
   * Updates an existing blog post
   *
   * @route PUT /blog/:id
   * @param {number} id - The ID of the blog post to update (automatically parsed from URL parameter)
   * @param {UpdateBlogPostDto} updateBlogPostDto - The updated blog post data from request body
   * @returns {Promise<{message: string, post: BlogPost}>} Success message with updated blog post
   * @throws {NotFoundException} When no blog post exists with the given ID
   * @throws {BadRequestException} When validation fails or update fails
   *
   * @example
   * PUT /blog/1
   * Content-Type: application/json
   *
   * {
   *   "title": "Updated Blog Post Title",
   *   "content": "Updated content here."
   * }
   *
   * Response:
   * {
   *   "message": "Blog post updated successfully",
   *   "post": {
   *     "id": 1,
   *     "title": "Updated Blog Post Title",
   *     "content": "Updated content here.",
   *     "createdAt": "2023-12-01T10:00:00.000Z",
   *     "updatedAt": "2023-12-01T11:00:00.000Z"
   *   }
   * }
   */
  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateBlogPostDto: UpdateBlogPostDto,
  ) {
    const post = await this.blogService.update(id, updateBlogPostDto);
    return {
      message: 'Blog post updated successfully',
      post,
    };
  }

  /**
   * Deletes a blog post by ID
   *
   * @route DELETE /blog/:id
   * @param {number} id - The ID of the blog post to delete (automatically parsed from URL parameter)
   * @returns {Promise<{message: string}>} Success message confirming deletion
   * @throws {NotFoundException} When no blog post exists with the given ID
   * @throws {BadRequestException} When deletion fails
   *
   * @example
   * DELETE /blog/1
   *
   * Response:
   * {
   *   "message": "Blog post deleted successfully"
   * }
   */
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.blogService.remove(id);
    return {
      message: 'Blog post deleted successfully',
    };
  }
}
