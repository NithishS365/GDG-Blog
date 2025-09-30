import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../contexts/AuthContext';
import { getBlog, updateBlog } from '../utils/blog';

function EditBlog() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingBlog, setLoadingBlog] = useState(true);
  const [originalBlog, setOriginalBlog] = useState(null);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  // Check if user is logged in
  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-xl border border-gray-200 animate-fade-in">
            <span className="block text-6xl mb-6">🔒</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-8">
              Please sign in to your account to edit blog posts
            </p>
            <Link to="/login" className="btn-primary btn-large w-full justify-center">
              <span className="mr-2">🚀</span>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Fetch the blog post
  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoadingBlog(true);
      const blogData = await getBlog(id);
      if (!blogData) {
        setError('Blog post not found');
        setLoadingBlog(false);
        return;
      }

      // Check if current user is the author
      if (blogData.authorId !== currentUser.id) {
        setError('You can only edit your own blog posts');
        setLoadingBlog(false);
        return;
      }

      setOriginalBlog(blogData);
      setTitle(blogData.title);
      setContent(blogData.content);
      setLoadingBlog(false);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog post');
      setLoadingBlog(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simple validation
    if (!title || !content) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    if (title.length < 5) {
      setError('Title must be at least 5 characters');
      setLoading(false);
      return;
    }

    if (content.length < 50) {
      setError('Content must be at least 50 characters');
      setLoading(false);
      return;
    }

    try {
      const updatedData = {
        title: title.trim(),
        content: content.trim(),
        updatedAt: new Date().toISOString()
      };
      
      await updateBlog(id, updatedData);
      console.log('Blog post updated successfully');
      toast.success('Blog post updated successfully! ✨');
      navigate(`/blog/${id}`);
    } catch (error) {
      console.error('Error updating blog:', error);
      
      if (error.code === 'permission-denied') {
        toast.error('Permission denied. You can only edit your own posts.');
        setError('Permission denied. You can only edit your own posts.');
      } else {
        toast.error('Failed to update blog post. Please try again.');
        setError('Failed to update blog post. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  if (loadingBlog) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="loading-spinner mb-6"></div>
        <p className="text-lg lg:text-xl text-gray-600 text-center animate-pulse">
          Loading blog post...
        </p>
      </div>
    );
  }

  if (error && !originalBlog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-xl border border-gray-200 animate-fade-in">
            <span className="block text-6xl mb-6">⚠️</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Error
            </h2>
            <p className="text-red-600 mb-8">
              {error}
            </p>
            <Link to="/" className="btn-primary btn-large w-full justify-center">
              <span className="mr-2">🏠</span>
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-fade-in">
          <Link 
            to={`/blog/${id}`} 
            className="inline-flex items-center text-primary-600 hover:text-primary-500 transition-colors mb-4"
          >
            <span className="mr-2">←</span>
            Back to Blog
          </Link>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            ✏️ Edit Blog Post
          </h1>
          <p className="text-lg text-gray-600">
            Update your blog post with new insights
          </p>
        </div>

        {/* Form */}
        <div className="bg-white shadow-xl rounded-xl border border-gray-200 animate-slide-up">
          <div className="p-6 sm:p-8 lg:p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg animate-slide-up">
                <div className="flex items-center">
                  <span className="text-red-500 mr-2">⚠️</span>
                  <span className="text-red-700 text-sm">{error}</span>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Field */}
              <div className="form-group">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter an engaging title for your blog post"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-sm"
                  disabled={loading}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Title should be at least 5 characters long
                </p>
              </div>
              
              {/* Content Field */}
              <div className="form-group">
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Blog Content *
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your blog content here... Share your insights, experiences, and knowledge with the community!"
                  rows="12"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 text-sm resize-y min-h-[300px]"
                  disabled={loading}
                />
                <p className="mt-1 text-xs text-gray-500">
                  Content should be at least 50 characters long
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-gray-200">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="btn-primary btn-large justify-center flex-1 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner w-5 h-5 mr-2"></div>
                      Updating...
                    </>
                  ) : (
                    <>
                      <span className="mr-2 group-hover:animate-bounce">✨</span>
                      Update Blog Post
                    </>
                  )}
                </button>
                
                <Link 
                  to={`/blog/${id}`} 
                  className="btn-outline btn-large justify-center sm:w-auto group"
                >
                  <span className="mr-2">❌</span>
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Writing Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 animate-fade-in">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            💡 Editing Tips
          </h3>
          <ul className="space-y-2 text-sm text-blue-800">
            <li>• Review your content for clarity and flow</li>
            <li>• Update outdated information or add new insights</li>
            <li>• Check for typos and grammatical errors</li>
            <li>• Consider adding examples to strengthen your points</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default EditBlog;