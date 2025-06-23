import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { useInView } from 'react-intersection-observer';
import { articlesPromise } from '../data/articleLoader';
import './components.css';

const ProjectDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { ref: headerRef, inView: headerInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: imageRef, inView: imageInView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const { ref: contentRef, inView: contentInView } = useInView({ triggerOnce: true, threshold: 0.1 });

  useEffect(() => {
    articlesPromise.then(articles => {
      const matchedPost = articles.find(p => p.slug === slug);
      if (matchedPost) {
        setPost(matchedPost);
      } else {
        setError('The requested article was not found.');
      }
      setLoading(false);
      window.scrollTo(0, 0);
    });
  }, [slug]);

  if (loading) {
    return (
        <div className="project-detail-container">
            <div className="loading-indicator">
                <p>Loading article...</p>
            </div>
        </div>
    );
  }

  if (error) {
    return (
        <div className="project-detail-container">
            <p className="error-message">{error}</p>
        </div>
    );
  }

  if (!post) {
    return null; // Should be covered by loading/error states
  }

  return (
    <div className="article-container">
      <div className="project-detail-container">
        <article className="markdown-body">
          <header 
            ref={headerRef} 
            className={`article-header fade-in-section ${headerInView ? 'is-visible' : ''}`}
          >
            <h1>{post.frontmatter.title}</h1>
            <p className="article-meta">
              <span>{post.frontmatter.date}</span>
            </p>
          </header>
          {post.frontmatter.image && (
            <img 
              ref={imageRef}
              src={`${import.meta.env.BASE_URL}${post.frontmatter.image.replace(/^\//, '')}`}
              alt={`Banner for ${post.frontmatter.title}`} 
              className={`article-banner fade-in-section ${imageInView ? 'is-visible' : ''}`}
            />
          )}
          <div 
            ref={contentRef}
            className={`article-content fade-in-section ${contentInView ? 'is-visible' : ''}`}
          >
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </article>
      </div>
    </div>
  );
};

export default ProjectDetail; 