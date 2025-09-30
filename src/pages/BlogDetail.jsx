import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getBlog, deleteBlog } from '../utils/blog';
import { useAuth } from '../contexts/AuthContext';

function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlog();
  }, [id]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const blogData = await getBlog(id);
      if (blogData) {
        setBlog(blogData);
      } else {
        setBlog(null);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching blog:', error);
      setBlog(null);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    setDeleting(true);
    try {
      await deleteBlog(id);
      toast.success('Blog post deleted successfully! 🗑️');
      navigate('/');
    } catch (error) {
      console.error('Error deleting blog:', error);
      toast.error('Failed to delete blog post. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  // Check if current user is the author of this blog
  const isAuthor = currentUser && blog && blog.authorId === currentUser.uid;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="loading-spinner mb-6"></div>
        <p className="text-lg lg:text-xl text-gray-600 text-center animate-pulse">
          Loading blog post...
        </p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center">
          <div className="bg-white py-8 px-6 sm:px-10 shadow-xl rounded-xl border border-gray-200 animate-fade-in">
            <span className="block text-6xl mb-6">📭</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Blog Not Found
            </h2>
            <p className="text-gray-600 mb-8">
              The blog post you're looking for doesn't exist or has been removed.
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Navigation */}
        <div className="mb-8 animate-fade-in">
          <Link 
            to="/" 
            className="inline-flex items-center text-primary-600 hover:text-primary-500 transition-colors mb-6"
          >
            <span className="mr-2">←</span>
            Back to Home
          </Link>
        </div>

        {/* Blog Article */}
        <article className="bg-white shadow-xl rounded-xl border border-gray-200 animate-slide-up">
          {/* Header */}
          <div className="p-6 sm:p-8 lg:p-10 border-b border-gray-200">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {blog.title}
            </h1>
            
            {/* Author and Date Info */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">
                    {(blog.author || 'A').charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {blog.author || 'Anonymous'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {blog.authorEmail || 'Author'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <span className="text-gray-400">📅</span>
                  <span className="text-sm">
                    {formatDate(blog.createdAt)}
                  </span>
                </div>
                
                {blog.updatedAt && blog.updatedAt !== blog.createdAt && (
                  <div className="flex items-center gap-1">
                    <span className="text-gray-400">✏️</span>
                    <span className="text-sm italic">
                      Updated {formatDate(blog.updatedAt)}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Author Actions */}
            {isAuthor && (
              <div className="flex flex-wrap gap-3 pt-6 border-t border-gray-200">
                <Link 
                  to={`/edit/${id}`} 
                  className="btn-primary group"
                >
                  <span className="mr-2">✏️</span>
                  Edit Post
                </Link>
                <button 
                  onClick={handleDelete} 
                  disabled={deleting}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {deleting ? (
                    <>
                      <div className="inline-block w-4 h-4 border-2 border-white border-r-transparent rounded-full animate-spin mr-2"></div>
                      Deleting...
                    </>
                  ) : (
                    <>
                      <span className="mr-2">🗑️</span>
                      Delete Post
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="p-6 sm:p-8 lg:p-10">
            <div className="prose prose-lg max-w-none">
              {blog.content.split('\n\n').map((paragraph, index) => (
                paragraph.trim() && (
                  <p key={index} className="mb-6 leading-relaxed text-gray-700">
                    {paragraph.trim()}
                  </p>
                )
              ))}
            </div>
          </div>
          
          {/* Footer */}
          <div className="p-6 sm:p-8 lg:p-10 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex flex-wrap gap-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                  Blog Post
                </span>
                {blog.category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
                    {blog.category}
                  </span>
                )}
              </div>
              
              <div className="text-sm text-gray-500">
                Article ID: {id}
              </div>
            </div>
          </div>
        </article>

        {/* Related Actions */}
        <div className="mt-8 text-center animate-fade-in">
          <Link to="/" className="btn-primary btn-large group">
            <span className="mr-2 group-hover:animate-bounce">📚</span>
            Read More Stories
          </Link>
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;