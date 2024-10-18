import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, CheckCircle, Circle, BarChart3 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const questions = {
  listening: [
    {
      id: 'l1',
      type: 'listening',
      question: 'What is the main topic of the professor\'s discussion?',
      options: [
        { id: 'l1a', text: 'Environmental sustainability' },
        { id: 'l1b', text: 'Climate change effects' },
        { id: 'l1c', text: 'Renewable energy sources' }
      ]
    },
    {
      id: 'l2',
      type: 'listening',
      question: 'What percentage of renewable energy is suggested by 2030?',
      options: [
        { id: 'l2a', text: '30%' },
        { id: 'l2b', text: '40%' },
        { id: 'l2c', text: '50%' }
      ]
    },
    {
      id: 'l3',
      type: 'listening',
      question: 'Which country leads in solar power implementation?',
      options: [
        { id: 'l3a', text: 'China' },
        { id: 'l3b', text: 'Germany' },
        { id: 'l3c', text: 'United States' }
      ]
    }
  ],
  reading: [
    {
      id: 'r1',
      type: 'reading',
      question: 'What is the main challenge cities face in the 21st century?',
      options: [
        { id: 'r1a', text: 'Population growth' },
        { id: 'r1b', text: 'Infrastructure development' },
        { id: 'r1c', text: 'Environmental protection' }
      ]
    },
    {
      id: 'r2',
      type: 'reading',
      question: 'What percentage of the world\'s population will live in cities by 2050?',
      options: [
        { id: 'r2a', text: '65%' },
        { id: 'r2b', text: '68%' },
        { id: 'r2c', text: '70%' }
      ]
    },
    {
      id: 'r3',
      type: 'reading',
      question: 'Which solution is suggested as most effective for sustainable urban development?',
      options: [
        { id: 'r3a', text: 'Smart city technology' },
        { id: 'r3b', text: 'Green infrastructure' },
        { id: 'r3c', text: 'Public transportation' }
      ]
    }
  ],
  writing: [
    {
      id: 'w1',
      type: 'writing',
      question: 'The graph shows the percentage of internet users in four countries between 2000 and 2020. Summarize the main features and make comparisons where relevant.',
    },
    {
      id: 'w2',
      type: 'writing',
      question: 'Some people believe that traditional medicine is better than modern medicine. To what extent do you agree or disagree?',
    },
    {
      id: 'w3',
      type: 'writing',
      question: 'Describe a time when you helped someone in need. Include who you helped, what you did, why you helped them, and how you felt.',
    }
  ]
};

function Tests() {
  const [currentSection, setCurrentSection] = useState('listening');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showScore, setShowScore] = useState(false);

  const allQuestions = [...questions.listening, ...questions.reading, ...questions.writing];
  const currentQuestion = allQuestions[currentQuestionIndex];

  const handleOptionSelect = (optionId) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleWritingInput = (value) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: value
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      if (currentQuestionIndex === questions.listening.length - 1) {
        setCurrentSection('reading');
      } else if (currentQuestionIndex === questions.listening.length + questions.reading.length - 1) {
        setCurrentSection('writing');
      }
    } else {
      setShowScore(true);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      if (currentQuestionIndex === questions.listening.length) {
        setCurrentSection('listening');
      } else if (currentQuestionIndex === questions.listening.length + questions.reading.length) {
        setCurrentSection('reading');
      }
    }
  };

  const scoreData = [
    { name: 'Listening', score: 7.5 },
    { name: 'Reading', score: 8.0 },
    { name: 'Writing', score: 7.0 },
    { name: 'Overall', score: 7.5 }
  ];

  if (showScore) {
    return (
      <div className="test-container">
        <div className="test-card">
          <div className="score-card">
            <h2 className="score-title">Your IELTS Score</h2>
            <div className="score-chart">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={scoreData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 9]} ticks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="test-container">
      <h1>JUST FOR DEMO</h1>
      <div className="test-card">
        <div className="test-header">
          <h1>IELTS {currentSection.charAt(0).toUpperCase() + currentSection.slice(1)} Test</h1>
          <div className="progress-indicator">
            {allQuestions.map((_, index) => (
              <div
                key={index}
                className={`progress-dot ${index === currentQuestionIndex ? 'active' : ''}`}
              />
            ))}
          </div>
        </div>

        <div className="question-container">
          <div className="section-title">Question {currentQuestionIndex + 1} of {allQuestions.length}</div>
          <div className="question-content">
            <p className="question-text">{currentQuestion.question}</p>
            {currentQuestion.type !== 'writing' ? (
              <div className="options-grid">
                {currentQuestion.options.map(option => (
                  <div
                    key={option.id}
                    className={`option-item ${answers[currentQuestion.id] === option.id ? 'selected' : ''}`}
                    onClick={() => handleOptionSelect(option.id)}
                  >
                    {answers[currentQuestion.id] === option.id ? (
                      <CheckCircle className="w-5 h-5 text-blue-500" />
                    ) : (
                      <Circle className="w-5 h-5 text-gray-300" />
                    )}
                    {option.text}
                  </div>
                ))}
              </div>
            ) : (
              <textarea
                className="writing-input"
                value={answers[currentQuestion.id] || ''}
                onChange={(e) => handleWritingInput(e.target.value)}
                placeholder="Write your answer here..."
              />
            )}
          </div>
        </div>

        <div className="navigation-buttons">
          <button
            className="nav-button secondary"
            onClick={handlePrev}
            disabled={currentQuestionIndex === 0}
          >
            <ArrowLeft className="w-4 h-4" />
            Previous
          </button>
          <button
            className="nav-button primary"
            onClick={handleNext}
          >
            {currentQuestionIndex === allQuestions.length - 1 ? (
              <>
                Submit Test
                <BarChart3 className="w-4 h-4" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Tests;
