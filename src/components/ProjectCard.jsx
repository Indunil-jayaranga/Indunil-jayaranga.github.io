import React from 'react';
import { Link } from 'react-router-dom';
import './components.css';

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/readings/${project.slug}`} className="project-card-link">
      <div className="project-card">
        <div className="project-card-image">
          <img src={project.image} alt={project.title} />
        </div>
        <div className="project-card-content">
          <h3 className="project-card-title">{project.title}</h3>
          <p className="project-card-category">{project.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard; 