// Blog management utilities using localStorage
export const blogService = {
  // Get all blogs
  getAllBlogs: () => {
    return JSON.parse(localStorage.getItem('gdg_blogs') || '[]');
  },

  // Get blogs by user
  getUserBlogs: (userId) => {
    const blogs = blogService.getAllBlogs();
    return blogs.filter(blog => blog.authorId === userId);
  },

  // Get single blog by ID
  getBlogById: (id) => {
    const blogs = blogService.getAllBlogs();
    return blogs.find(blog => blog.id === id);
  },

  // Create new blog
  createBlog: (blogData, user) => {
    const blogs = blogService.getAllBlogs();
    const newBlog = {
      id: Date.now().toString(),
      ...blogData,
      authorId: user.id,
      authorName: user.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    blogs.push(newBlog);
    localStorage.setItem('gdg_blogs', JSON.stringify(blogs));
    return { success: true, blog: newBlog };
  },

  // Update blog
  updateBlog: (id, blogData, userId) => {
    const blogs = blogService.getAllBlogs();
    const blogIndex = blogs.findIndex(blog => blog.id === id && blog.authorId === userId);
    
    if (blogIndex === -1) {
      return { success: false, message: 'Blog not found or unauthorized' };
    }

    blogs[blogIndex] = {
      ...blogs[blogIndex],
      ...blogData,
      updatedAt: new Date().toISOString()
    };

    localStorage.setItem('gdg_blogs', JSON.stringify(blogs));
    return { success: true, blog: blogs[blogIndex] };
  },

  // Delete blog
  deleteBlog: (id, userId) => {
    const blogs = blogService.getAllBlogs();
    const blogIndex = blogs.findIndex(blog => blog.id === id && blog.authorId === userId);
    
    if (blogIndex === -1) {
      return { success: false, message: 'Blog not found or unauthorized' };
    }

    blogs.splice(blogIndex, 1);
    localStorage.setItem('gdg_blogs', JSON.stringify(blogs));
    return { success: true };
  },

  // Search blogs
  searchBlogs: (query) => {
    const blogs = blogService.getAllBlogs();
    return blogs.filter(blog => 
      blog.title.toLowerCase().includes(query.toLowerCase()) ||
      blog.content.toLowerCase().includes(query.toLowerCase()) ||
      blog.authorName.toLowerCase().includes(query.toLowerCase())
    );
  }
};

// Export individual functions for compatibility with original components
export const getAllBlogs = () => {
  return JSON.parse(localStorage.getItem('gdg_blogs') || '[]');
};

export const getBlog = (id) => {
  const blogs = getAllBlogs();
  return blogs.find(blog => blog.id === id);
};

export const createBlog = (blogData) => {
  const blogs = getAllBlogs();
  const newBlog = {
    id: Date.now().toString(),
    title: blogData.title,
    content: blogData.content,
    author: blogData.author,
    authorEmail: blogData.authorEmail,
    authorId: blogData.authorId || blogData.uid, // Support both authorId and uid
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  blogs.push(newBlog);
  localStorage.setItem('gdg_blogs', JSON.stringify(blogs));
  return newBlog.id;
};

export const updateBlog = (id, blogData) => {
  const blogs = getAllBlogs();
  const blogIndex = blogs.findIndex(blog => blog.id === id);
  
  if (blogIndex === -1) {
    throw new Error('Blog not found');
  }

  blogs[blogIndex] = {
    ...blogs[blogIndex],
    ...blogData,
    updatedAt: new Date().toISOString()
  };

  localStorage.setItem('gdg_blogs', JSON.stringify(blogs));
  return blogs[blogIndex];
};

export const deleteBlog = (id) => {
  const blogs = getAllBlogs();
  const blogIndex = blogs.findIndex(blog => blog.id === id);
  
  if (blogIndex === -1) {
    throw new Error('Blog not found');
  }

  blogs.splice(blogIndex, 1);
  localStorage.setItem('gdg_blogs', JSON.stringify(blogs));
  return true;
};