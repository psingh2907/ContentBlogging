import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * BlogPost entity representing a blog post in the database
 *
 * This entity defines the structure of blog posts stored in the 'blog_posts' table.
 * It includes automatic timestamp management for creation and update times.
 *
 * @entity blog_posts
 * @class BlogPost
 */
@Entity('blog_posts')
export class BlogPost {
  /**
   * Unique identifier for the blog post
   * Auto-generated primary key
   *
   * @type {number}
   * @memberof BlogPost
   */
  @PrimaryGeneratedColumn()
  id: number;

  /**
   * The title of the blog post
   * Maximum length of 255 characters
   *
   * @type {string}
   * @memberof BlogPost
   * @maxLength 255
   */
  @Column({ length: 255 })
  title: string;

  /**
   * The main content/body of the blog post
   * Stored as text type to allow for longer content
   *
   * @type {string}
   * @memberof BlogPost
   */
  @Column('text')
  content: string;

  /**
   * Timestamp when the blog post was created
   * Automatically set when the entity is first saved to the database
   *
   * @type {Date}
   * @memberof BlogPost
   * @readonly
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Timestamp when the blog post was last updated
   * Automatically updated whenever the entity is modified and saved
   *
   * @type {Date}
   * @memberof BlogPost
   * @readonly
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
