import React, { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import ProjectCard from './ProjectCard';
import { articlesPromise } from '../data/articleLoader';
import './components.css';

const AnimatedCard = ({ article, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const projectData = {
    slug: article.slug,
    title: article.frontmatter.title,
    description: article.frontmatter.description,
    image: article.frontmatter.image,
  };

  return (
    <div 
      ref={ref} 
      className={`card-container ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <ProjectCard project={projectData} />
    </div>
  );
};

function Projects({ searchTerm }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const { ref: headerRef, inView: headerInView } = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  useEffect(() => {
    articlesPromise.then(loadedArticles => {
      setArticles(loadedArticles);
      setLoading(false);
    });
  }, []);

  const filteredArticles = searchTerm
    ? articles.filter(article =>
        (article.frontmatter.title?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (article.frontmatter.description?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (article.content?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      )
    : articles;

  if (loading) {
    return <div className="loading-container">Loading articles...</div>;
  }

  return (
    <div className="projects-container">
      <header 
        ref={headerRef}
        className={`page-header fade-in-section ${headerInView ? 'is-visible' : ''}`}
      >
        <h1>Readings</h1>
        <p className="readings-subtitle">A collection of my research, findings, and thoughts on various topics in cybersecurity.</p>
      </header>
      <div className="project-grid">
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article, index) => (
            <AnimatedCard key={article.slug} article={article} index={index} />
          ))
        ) : (
          searchTerm && <p className="no-results-message">No articles found matching your search.</p>
        )}
      </div>
    </div>
  );
}

export default Projects; 