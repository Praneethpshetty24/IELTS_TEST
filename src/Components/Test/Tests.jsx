import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, List, X, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './Tests.css';

const Tests = () => {
  const navigate = useNavigate(); // Initialize navigate
  const [currentSection, setCurrentSection] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [showRules, setShowRules] = useState(true);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (timeLeft > 0 && !showRules && !showResults) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft, showRules, showResults]);

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

  const calculateScore = () => {
    const correctAnswers = questions.filter((q) => answers[q.id] === q.answer).length;
    setScore(correctAnswers);
    setShowResults(true);
  };

  const RulesPanel = () => (
    <div className="tests-rules-overlay">
      <div className="tests-rules-panel">
        <h2>IELTS Reading Test Rules</h2>
        <div className="tests-rules-content">
          <ul>
            <li>You have 10 minutes to complete the reading test</li>
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

  const ResultsPanel = () => (
    <div className="tests-results-overlay">
      <div className="tests-results-panel">
        <h2>Your Results</h2>
        <p>You answered {score} out of {questions.length} questions correctly.</p>
        <button onClick={() => {
          setShowResults(false);
          setShowRules(true);
          setAnswers({});
          setTimeLeft(10 * 60);
          setCurrentSection(0);
          setScore(0);
        }}>
          Restart Test
        </button>
        <button onClick={() => navigate('/')}>Back</button> {/* Corrected this line */}
      </div>
    </div>
  );

  return (
    <div className="tests-container">
      <header className="tests-header">
        <h1>IELTS Reading Test</h1>
        <div className="tests-timer">
          <Clock size={20} />
          <span>{formatTime(timeLeft)}</span>
        </div>
        <div className="tests-header-buttons">
          <button
            onClick={() => setShowReview(true)}
            className="tests-review-button"
          >
            <List size={16} /> Review Questions
          </button>
          <button onClick={calculateScore}>Submit</button>
        </div>
      </header>
      
      {!showResults && (
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
            <h2>Questions {currentSection * 5 + 1}-{Math.min((currentSection + 1) * 5, questions.length)}</h2>
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

            <div className="tests-navigation">
              <div className="tests-nav-buttons">
                <button
                  onClick={() => setCurrentSection(prev => Math.max(0, prev - 1))}
                  disabled={currentSection === 0}
                  className="tests-nav-button"
                >
                  <ChevronLeft /> Previous
                </button>
                <button
                  onClick={() => setCurrentSection(prev => Math.min(1, prev + 1))}
                  disabled={currentSection === 1}
                  className="tests-nav-button"
                >
                  Next <ChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {showReview && <ReviewPanel />}
      {showRules && <RulesPanel />}
      {showResults && <ResultsPanel />}
    </div>
  );
};

export default Tests;
