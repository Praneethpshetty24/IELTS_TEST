import React, { useState, useEffect } from 'react';
import { Clock, List, X } from 'lucide-react';

const Tests = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60 * 60); // 60 minutes in seconds
  
  useEffect(() => {
    if (timeLeft > 0 && !showRules) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showRules]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const passage = `The Roman Empire was one of the largest and most influential civilizations in world history. At its height, it encompassed territories stretching from Britain to Egypt, from Spain to Iraq. The Romans were master builders and engineers, constructing vast networks of roads, aqueducts, and magnificent buildings, many of which still stand today.

The Roman army was a crucial factor in the empire's success. It was highly disciplined and well-organized, with sophisticated tactics and equipment. Roman soldiers were not just warriors but also builders and engineers. They constructed roads, bridges, and fortifications wherever they went, helping to connect and consolidate the vast empire.

Roman culture and society were highly sophisticated. The Romans developed a complex legal system that forms the basis of many modern legal codes. They were also great admirers of Greek culture, adopting and adapting many aspects of Greek art, architecture, and philosophy. Roman literature, art, and architecture have had a lasting influence on Western civilization.

The Romans also made significant contributions to science and technology. They developed advanced construction techniques, including the use of concrete and the arch, which allowed them to build massive structures like the Colosseum and the Pantheon. They also made advances in medicine, agriculture, and urban planning.`;

  const questions = [
    {
      id: 1,
      type: 'multiple-choice',
      question: "What was a key factor in the Roman Empire's success?",
      options: ['Their navy', 'Their army', 'Their trade routes', 'Their agriculture'],
      answer: 1
    },
    {
      id: 2,
      type: 'multiple-choice',
      question: "Roman soldiers were also:",
      options: ['Teachers', 'Builders', 'Merchants', 'Artists'],
      answer: 1
    },
    {
      id: 3,
      type: 'multiple-choice',
      question: "The Romans adopted aspects of which culture?",
      options: ['Persian', 'Egyptian', 'Greek', 'Chinese'],
      answer: 2
    },
    {
      id: 4,
      type: 'multiple-choice',
      question: "What did Romans develop?",
      options: ['Paper', 'Glass', 'Concrete', 'Compass'],
      answer: 2
    },
    {
      id: 5,
      type: 'multiple-choice',
      question: "The Roman Empire stretched from:",
      options: ['Spain to India', 'Britain to Egypt', 'Greece to Africa', 'France to Arabia'],
      answer: 1
    }
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleSubmitTest = () => {
    // Add your submit logic here
    console.log('Test submitted:', answers);
  };

  const RulesPanel = () => (
    <div className="tests-rules-overlay">
      <div className="tests-rules-panel">
        <h2>IELTS Reading Test Rules</h2>
        <div className="tests-rules-content">
          <ul>
            <li>You have 60 minutes to complete the reading test</li>
            <li>You must complete all questions within the time limit</li>
            <li>Each question is worth one mark</li>
            <li>You can review and change your answers at any time during the test</li>
            <li>Read instructions for each question carefully</li>
            <li>Manage your time wisely - don't spend too long on one question</li>
          </ul>
        </div>
        <button 
          className="tests-start-button"
          onClick={() => setShowRules(false)}
        >
          Start Test
        </button>
      </div>
    </div>
  );

  const ReviewPanel = () => (
    <div className="tests-review-overlay">
      <div className="tests-review-panel">
        <div className="tests-review-header">
          <h2>Question Review</h2>
          <button onClick={() => setShowReview(false)} className="tests-close-button">
            <X size={24} />
          </button>
        </div>
        <div className="tests-question-grid">
          {questions.map((q) => (
            <button
              key={q.id}
              className={`tests-question-button ${answers[q.id] !== undefined ? 'answered' : ''}`}
              onClick={() => {
                setCurrentSection(Math.floor((q.id - 1) / 5));
                setShowReview(false);
              }}
            >
              {q.id}
            </button>
          ))}
        </div>
        <div className="tests-review-legend">
          <div className="tests-legend-item">
            <div className="tests-legend-color answered"></div>
            <span>Attempted</span>
          </div>
          <div className="tests-legend-item">
            <div className="tests-legend-color"></div>
            <span>Not Attempted</span>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="tests-container">
      <nav className="tests-nav">
        <div className="tests-nav-content">
          <div className="tests-parts">
            <button 
              className={`tests-part-button ${currentSection === 0 ? 'active' : ''}`}
              onClick={() => setCurrentSection(0)}
            >
              Part 1
            </button>
            <button 
              className={`tests-part-button ${currentSection === 1 ? 'active' : ''}`}
              onClick={() => setCurrentSection(1)}
            >
              Part 2
            </button>
          </div>
          
          <div className="tests-timer">
            <Clock size={20} />
            <span className={timeLeft < 300 ? 'time-warning' : ''}>
              {formatTime(timeLeft)}
            </span>
          </div>
          
          <div className="tests-nav-actions">
            <button
              onClick={() => setShowReview(true)}
              className="tests-review-button"
            >
              <List size={16} /> Review
            </button>
            <button 
              className="tests-submit-button"
              onClick={handleSubmitTest}
            >
              Submit Test
            </button>
          </div>
        </div>
      </nav>

      <header className="tests-header">
        <h1>IELTS Reading Test</h1>
        <p className="tests-subheader">Academic Module</p>
      </header>
      
      <div className="tests-content">
        <div className="tests-passage">
          <h2>Reading Passage</h2>
          <div className="tests-passage-text">
            {passage.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="tests-questions">
          <h2>Questions {currentSection * 5 + 1}-{currentSection * 5 + 5}</h2>
          <div className="tests-questions-list">
            {questions.slice(currentSection * 5, (currentSection + 1) * 5).map((q) => (
              <div key={q.id} className="tests-question">
                <p className="tests-question-text">
                  <span className="tests-question-number">{q.id}.</span> {q.question}
                </p>
                <div className="tests-options">
                  {q.options.map((option, idx) => (
                    <label key={idx} className="tests-option">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        value={idx}
                        checked={answers[q.id] === idx}
                        onChange={() => handleAnswerChange(q.id, idx)}
                      />
                      <span>{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showReview && <ReviewPanel />}
      {showRules && <RulesPanel />}
    </div>
  );
};

export default Tests;