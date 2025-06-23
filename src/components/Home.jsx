    import React, { useState, useEffect } from 'react';
    import { Link } from 'react-router-dom';
    import { useInView } from 'react-intersection-observer';
    import ProjectCard from './ProjectCard';
    import { articlesPromise } from '../data/articleLoader.js';
    import './components.css';

    const AnimatedCard = ({ article }) => {
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
        <div ref={ref} className={`card-container ${inView ? 'visible' : ''}`}>
        <ProjectCard project={projectData} />
        </div>
    );
    };

    const Home = () => {
    const titles = ['Cyber Security Researcher', 'SOC Analyst', 'Threat Hunter'];
    const [titleIndex, setTitleIndex] = useState(0);
    const [subIndex, setSubIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [dots, setDots] = useState('');
    const [featuredProjects, setFeaturedProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    const { ref: aboutRef, inView: aboutInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: projectsRef, inView: projectsInView } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: missionRef, inView: missionInView } = useInView({ triggerOnce: true, threshold: 0.1 });

    useEffect(() => {
        // Phase 1: A title is fully typed, start animating dots
        if (!isDeleting && subIndex === titles[titleIndex].length) {
        if (dots.length < 3) {
            const timer = setTimeout(() => setDots(prev => prev + '.'), 300);
            return () => clearTimeout(timer);
        } else {
            // Phase 2: Dots are done, pause, then start deleting
            const timer = setTimeout(() => setIsDeleting(true), 1000);
            return () => clearTimeout(timer);
        }
        }

        // Phase 4: A title is fully deleted, switch to the next one
        if (isDeleting && subIndex === 0) {
        setIsDeleting(false);
        setTitleIndex(prevIndex => (prevIndex + 1) % titles.length);
        setDots(''); // Reset dots for the next cycle
        return;
        }

        // Phase 3: The main typing/deleting engine
        const typingSpeed = 120;
        const deletingSpeed = 60;
        const timeout = isDeleting ? deletingSpeed : typingSpeed;

        const timer = setTimeout(() => {
        setSubIndex(prev => prev + (isDeleting ? -1 : 1));
        }, timeout);

        return () => clearTimeout(timer);
    }, [subIndex, isDeleting, titleIndex, titles, dots]);

    useEffect(() => {
        articlesPromise.then(articles => {
        setFeaturedProjects(articles.slice(0, 4));
        setLoading(false);
        });
    }, []);

    const displayedText = titles[titleIndex].substring(0, subIndex);

    // Show blinking cursor '|' only when typing or deleting
    const showCursor = !(!isDeleting && subIndex === titles[titleIndex].length);

    return (
        <div className="home-container">
        {/* Hero Section */}
        <section className="hero-section">
            <h1 className="hero-headline hero-headline-animated">
            <span>
                {displayedText}
                <span className={showCursor ? 'typing-effect' : 'typing-dots'}>
                {showCursor ? '|' : dots}
                </span>
            </span>
            </h1>
            <Link to="/readings" className="button-primary hero-cta">
            Explore Readings
            </Link>
        </section>

        {/* About Me Teaser */}
        <section 
            ref={aboutRef}
            className={`about-teaser-section fade-in-section ${aboutInView ? 'is-visible' : ''}`}
        >
            <div className="about-teaser-content">
            <h2>Who Am I,</h2>
            <p>
                A passionate cybersecurity researcher and analyst dedicated to navigating the complex digital landscape, identifying threats, and engineering robust defensive strategies.
            </p>
            <Link to="/about" className="button-primary">
                More About Me
            </Link>
            </div>
            <div className="about-teaser-image">
            <img src="/images/portrait.jpg" alt="A portrait of xINDUNIL" />
            </div>
        </section>

        {/* Projects Highlight Section */}
        <section 
            ref={projectsRef}
            className={`projects-highlight-section fade-in-section ${projectsInView ? 'is-visible' : ''}`}
        >
            <h2 className="section-title">Featured Readings</h2>
            <div className="projects-grid">
            {loading ? (
                <p>Loading readings...</p>
            ) : (
                featuredProjects.map(article => (
                <AnimatedCard key={article.slug} article={article} />
                ))
            )}
            </div>
            <div className="explore-more-link">
            <Link to="/readings" className="button-primary">
                Explore All Readings
            </Link>
            </div>
        </section>

        {/* Testimonial Section -> Mission Statement */}
        <section 
            ref={missionRef}
            className={`testimonial-section fade-in-section ${missionInView ? 'is-visible' : ''}`}
        >
            <blockquote className="mission-blockquote">
            {"\"Driven by a passion to protect, create, and inspire, I use my cybersecurity skills to help make the digital world safer while shaping a more beautiful and innovative future through technology. My work combines technical excellence with a vision for a better digital world, blending security expertise with creativity and forward-thinking solutions\"".split(' ').map((word, index) => (
                <span key={index} className="animated-word" style={{ transitionDelay: `${index * 0.02}s` }}>
                {word}
                </span>
            ))}
            </blockquote>
        </section>
        </div>
    );
    };

    export default Home; 