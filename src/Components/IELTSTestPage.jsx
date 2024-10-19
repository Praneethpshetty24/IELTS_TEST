import React, { useState, useEffect } from 'react';
import {
  BookOpen, Award, Clock, Star, Trophy, Brain,
  Rocket, ChevronDown, MapPin, Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './IELTSTestPage.css';

const PerlaStyleNavbar = ({ onGetStarted, onSignIn }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-left">
          {/* Logo */}
          <div className="nav-logo">
            <Trophy className="nav-logo-icon" />
            <span className="nav-logo-text">IELTS Prep</span>
          </div>

          {/* Navigation Links */}
          <div className="nav-links">
            {['Features', 'Resources', 'Solutions', 'Pricing'].map((item) => (
              <button
                key={item}
                className="nav-link"
              >
                <span>{item}</span>
                <ChevronDown className="nav-chevron" />
              </button>
            ))}
          </div>
        </div>

        {/* Auth Buttons */}
        <div className="nav-auth">
          <button className="sign-in-btn" onClick={onSignIn}>
            Sign in
          </button>
          <button className="get-started-btn" onClick={onGetStarted}>
            Get Started
          </button>
        </div>
      </div>
    </nav>
  );
};

const IELTSTestPage = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/pay'); // Navigate to /pay when 'Get Started' is clicked
  };

  const handleSignIn = () => {
    navigate('/'); // Navigate to /log when 'Sign In' is clicked
  };

  const handleStartCareerMode = () => {
    navigate('/'); // Navigate to /log when 'Start Career Mode' is clicked
  };

  const handleStartPracticeMode = () => {
    navigate('/'); // Navigate to /log when 'Start Practice Mode' is clicked
  };

  const handleStartTest = () => {
    navigate('/test'); // Navigate to /test when 'Ready to start' is clicked
  };

  const features = [
    {
      icon: Award,
      title: "Career Mode",
      description: "Achieve a high score to boost your career opportunities worldwide.",
      features: [
        { icon: Star, text: "Performance Insights" },
        { icon: Brain, text: "AI-Powered Feedback" }
      ],
      onStart: handleStartCareerMode
    },
    {
      icon: Rocket,
      title: "Practice Mode",
      description: "Test your skills and improve with unlimited practice questions.",
      features: [
        { icon: BookOpen, text: "Unlimited Tests" },
        { icon: Clock, text: "Flexible Timing" }
      ],
      onStart: handleStartPracticeMode
    }
  ];

  return (
    <div className="page-container">
      <PerlaStyleNavbar onGetStarted={handleGetStarted} onSignIn={handleSignIn} />
      
      {/* Hero Section */}
      <main className="main-content">
        <div className="hero-section">
          {/* Left Column */}
          <div className="hero-text">
            <h1 className="hero-title">
              IELTS Test Preparation
            </h1>
            <p className="hero-description">
              Achieve your dream IELTS score with personalized tests and real-time feedback.
            </p>
          </div>

          {/* Right Column - Feature Preview */}
          <div className="feature-preview">
            <div className="preview-badge">
              <MapPin className="preview-icon" />
              <span>Test Module Preview</span>
            </div>

            {/* Module Features */}
            <div className="module-features">
              <h3 className="features-title">Available Modules</h3>
              <div className="features-grid">
                <span className="feature-tag">Reading</span>
                <span className="feature-tag">Writing</span>
                <span className="feature-tag">Speaking</span>
                <span className="feature-tag">Listening</span>
              </div>
            </div>

            <div className="status-badge" onClick={handleStartTest}>
              <Check className="status-icon" />
              <span>Ready to start</span>
            </div>
          </div>
        </div>

        {/* Cards Section */}
        <div className="cards-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`feature-card ${hoveredCard === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <feature.icon className="card-icon" />
              <h3 className="card-title">{feature.title}</h3>
              <p className="card-description">{feature.description}</p>
              
              <div className="card-features">
                {feature.features.map((item, i) => (
                  <div key={i} className="card-feature">
                    <item.icon className="feature-icon" />
                    <span className="feature-text">{item.text}</span>
                  </div>
                ))}
              </div>
              
              <button className="start-button" onClick={feature.onStart}>
                Start {feature.title}
              </button>
              
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default IELTSTestPage;
