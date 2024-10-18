import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import {
  BookOpen, Award, Clock, Star, Trophy, Brain,
  BarChart, Rocket, ChevronDown, Layout, Headphones,
  BookMarked, Users, Mail, Settings
} from 'lucide-react';
import './IELTSTestPage.css'; 

const Navbar = ({ onGetStarted }) => { // Accept onGetStarted as a prop
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = {
    features: {
      title: 'Features',
      items: [
        { icon: Layout, label: 'Test Modules', desc: 'Reading, Writing, Speaking & Listening' },
        { icon: Headphones, label: 'Audio Labs', desc: 'Practice with real test scenarios' },
        { icon: BookMarked, label: 'Study Material', desc: 'Comprehensive learning resources' },
        { icon: BarChart, label: 'Progress Tracking', desc: 'Detailed performance analytics' }
      ]
    },
    resources: {
      title: 'Resources',
      items: [
        { icon: BookOpen, label: 'Study Guide', desc: 'Structured learning path' },
        { icon: Users, label: 'Community', desc: 'Connect with other learners' },
        { icon: Mail, label: 'Newsletter', desc: 'Weekly tips and updates' },
        { icon: Settings, label: 'Tools', desc: 'Practice tools and utilities' }
      ]
    }
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-logo">
          <Trophy className="nav-logo-icon" />
          <span className="nav-logo-text">IELTS Prep</span>
        </div>

        <div className="nav-items">
          {Object.entries(navItems).map(([key, section]) => (
            <div
              key={key}
              className="relative"
              onMouseEnter={() => setActiveDropdown(key)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="nav-item-button">
                <span>{section.title}</span>
                <ChevronDown className="nav-dropdown-icon" />
              </button>

              {activeDropdown === key && (
                <div className="nav-dropdown">
                  {section.items.map((item, index) => (
                    <a key={index} href="#" className="nav-dropdown-item">
                      <item.icon className="nav-dropdown-icon" />
                      <div>
                        <div className="nav-dropdown-text">{item.label}</div>
                        <div className="nav-dropdown-desc">{item.desc}</div>
                      </div>
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button className="nav-item-button">Sign in</button>
          <button className="cta-button" onClick={onGetStarted}>Get Started</button>
        </div>
      </div>
    </nav>
  );
};

const IELTSTestPage = () => {
  const [hoveredMode, setHoveredMode] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGetStarted = () => {
    navigate('/pay'); // Navigate to /pay
  };

  const handleStartTest = () => {
    navigate('/test'); // Navigate to /test
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <Navbar onGetStarted={handleGetStarted} /> {/* Pass down the handler to Navbar */}
      
      <header className="header">
        <h1 className="header-title">IELTS Test Preparation</h1>
        <p className="header-desc">
          Achieve your dream IELTS score with personalized tests and real-time feedback.
        </p>
      </header>

      <main>
        <div className="cards-container">
          <div
            className="card"
            onMouseEnter={() => setHoveredMode('career')}
            onMouseLeave={() => setHoveredMode(null)}
          >
            <Award className="card-icon" />
            <h3 className="card-title">Career Mode</h3>
            <p className="card-desc">Achieve a high score to boost your career opportunities worldwide.</p>
            <div className="card-features">
              <div className="card-feature">
                <Star className="card-feature-icon" />
                <span>Performance Insights</span>
              </div>
              <div className="card-feature">
                <Brain className="card-feature-icon" />
                <span>AI-Powered Feedback</span>
              </div>
            </div>
            <button className="card-button" onClick={handleStartTest}>Start Career Mode</button>
          </div>

          <div
            className="card"
            onMouseEnter={() => setHoveredMode('practice')}
            onMouseLeave={() => setHoveredMode(null)}
          >
            <Rocket className="card-icon" />
            <h3 className="card-title">Practice Mode</h3>
            <p className="card-desc">Test your skills and improve with unlimited practice questions.</p>
            <div className="card-features">
              <div className="card-feature">
                <BookOpen className="card-feature-icon" />
                <span>Unlimited Tests</span>
              </div>
              <div className="card-feature">
                <Clock className="card-feature-icon" />
                <span>Flexible Timing</span>
              </div>
            </div>
            <button className="card-button" onClick={handleStartTest}>Start Practice Mode</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default IELTSTestPage;
