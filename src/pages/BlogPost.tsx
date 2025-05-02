
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { getPostBySlug, blogPosts } from '@/data/blogData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = slug ? getPostBySlug(slug) : undefined;
  
  // Redirect to blog list if post not found
  useEffect(() => {
    if (!post) {
      navigate('/blog', { replace: true });
    }
  }, [post, navigate]);
  
  if (!post) {
    return null;
  }
  
  // Format date in a readable format
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Find next and previous posts
  const currentIndex = blogPosts.findIndex(p => p.id === post.id);
  const nextPost = currentIndex < blogPosts.length - 1 ? blogPosts[currentIndex + 1] : null;
  const prevPost = currentIndex > 0 ? blogPosts[currentIndex - 1] : null;

  return (
    <Layout>
      <article className="py-20 bg-white">
        <div className="container-wide">
          {/* Return to blog link */}
          <div className="mb-8">
            <Link 
              to="/blog" 
              className="inline-flex items-center text-softchat-600 hover:text-softchat-700 font-medium"
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Back to Blog
            </Link>
          </div>

          {/* Featured image */}
          <div className="rounded-xl overflow-hidden shadow-xl mb-10">
            <img 
              src={post.coverImage} 
              alt={post.title} 
              className="w-full h-auto"
            />
          </div>

          {/* Article header */}
          <div className="max-w-4xl mx-auto mb-10">
            <h1 className="heading-lg mb-6">{post.title}</h1>
            
            <div className="flex items-center mb-8">
              <img 
                src={post.author.avatar} 
                alt={post.author.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-medium text-lg">{post.author.name}</p>
                <p className="text-gray-500">{formatDate(post.date)}</p>
              </div>
            </div>
          </div>

          {/* Article content */}
          <div className="max-w-3xl mx-auto prose prose-lg prose-headings:font-bold prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-softchat-600 prose-a:no-underline hover:prose-a:underline">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          {/* Post navigation */}
          <div className="max-w-4xl mx-auto mt-16 border-t border-gray-100 pt-8">
            <div className="flex flex-col md:flex-row md:justify-between">
              {prevPost ? (
                <Link 
                  to={`/blog/${prevPost.slug}`} 
                  className="flex items-center mb-4 md:mb-0 text-softchat-600 hover:text-softchat-700 group"
                >
                  <ChevronLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                  <div>
                    <div className="text-sm text-gray-500">Previous Article</div>
                    <div className="font-medium">{prevPost.title}</div>
                  </div>
                </Link>
              ) : <div></div>}
              
              {nextPost && (
                <Link 
                  to={`/blog/${nextPost.slug}`} 
                  className="flex items-center text-right md:text-right text-softchat-600 hover:text-softchat-700 group"
                >
                  <div>
                    <div className="text-sm text-gray-500">Next Article</div>
                    <div className="font-medium">{nextPost.title}</div>
                  </div>
                  <ChevronRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>

          {/* Suggested posts */}
          <div className="max-w-5xl mx-auto mt-20">
            <h3 className="text-2xl font-bold mb-8">Related Articles</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts
                .filter(p => p.id !== post.id)
                .slice(0, 3)
                .map(post => (
                  <article key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    <Link to={`/blog/${post.slug}`}>
                      <div className="aspect-video bg-gray-100 overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-5">
                      <Link to={`/blog/${post.slug}`}>
                        <h3 className="text-lg font-bold mb-2 hover:text-softchat-600 transition-colors">{post.title}</h3>
                      </Link>
                      <p className="text-sm text-gray-500 mb-2">{formatDate(post.date)}</p>
                      <Link 
                        to={`/blog/${post.slug}`} 
                        className="inline-flex items-center text-softchat-600 text-sm font-medium hover:text-softchat-700 transition-colors"
                      >
                        Read More <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </article>
                ))}
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogPost;
