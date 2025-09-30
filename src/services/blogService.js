// Blog service functions that mimic the original API calls
import { blogService as localBlogService } from '../utils/blog';

export const getAllBlogs = async () => {
  try {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return localBlogService.getAllBlogs();
  } catch (error) {
    throw new Error('Failed to fetch blogs');
  }
};

export const getBlogById = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    return localBlogService.getBlogById(id);
  } catch (error) {
    throw new Error('Failed to fetch blog');
  }
};

export const createBlog = async (blogData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = JSON.parse(localStorage.getItem('gdg_user') || '{}');
    return localBlogService.createBlog(blogData, user);
  } catch (error) {
    throw new Error('Failed to create blog');
  }
};

export const updateBlog = async (id, blogData) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = JSON.parse(localStorage.getItem('gdg_user') || '{}');
    return localBlogService.updateBlog(id, blogData, user.id);
  } catch (error) {
    throw new Error('Failed to update blog');
  }
};

export const deleteBlog = async (id) => {
  try {
    await new Promise(resolve => setTimeout(resolve, 200));
    const user = JSON.parse(localStorage.getItem('gdg_user') || '{}');
    return localBlogService.deleteBlog(id, user.id);
  } catch (error) {
    throw new Error('Failed to delete blog');
  }
};