import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, List, X } from 'lucide-react';
import './Tests.css';

const Tests = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [showReview, setShowReview] = useState(false);
  const [answers, setAnswers] = useState({});
  
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
    },
    {
      id: 6,
      type: 'fill-blank',
      sentence: "The Roman Empire stretched from Britain to ______.",
      answer: "Egypt"
    },
    {
      id: 7,
      type: 'fill-blank',
      sentence: "Roman soldiers helped to ______ and consolidate the vast empire.",
      answer: "connect"
    },
    {
      id: 8,
      type: 'fill-blank',
      sentence: "The Romans developed advanced ______ techniques.",
      answer: "construction"
    },
    {
      id: 9,
      type: 'fill-blank',
      sentence: "Roman ______ and architecture have had a lasting influence.",
      answer: "literature"
    },
    {
      id: 10,
      type: 'fill-blank',
      sentence: "The Romans developed a complex ______ system.",
      answer: "legal"
    }
  ];

  const handleAnswerChange = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

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
          {questions.map((q) => {
            const isAnswered = answers[q.id] !== undefined;
            return (
              <button
                key={q.id}
                className={`tests-question-button ${isAnswered ? 'answered' : ''}`}
                onClick={() => {
                  setCurrentSection(q.id <= 5 ? 0 : 1);
                  setShowReview(false);
                }}
              >
                {q.id}
              </button>
            );
          })}
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
      <div className="tests-header">
        <h1>IELTS Mock Test</h1>
      </div>
      <div className="tests-main-content">
        <div className="tests-passage-section">
          <h2>Passage</h2>
          <p>{passage}</p>
        </div>
        <div className="tests-questions-section">
          <h2>Questions</h2>
          {questions.slice(currentSection * 5, currentSection * 5 + 5).map((q) => (
            <div key={q.id} className="tests-question-item">
              <p>{q.question}</p>
              <div className="tests-options">
                {q.options.map((option, index) => (
                  <label key={index}>
                    <input
                      type="radio"
                      name={`question-${q.id}`}
                      value={index}
                      onChange={() => handleAnswerChange(q.id, index)}
                      checked={answers[q.id] === index}
                    />
                    {option}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <div className="tests-navigation">
            <div className="tests-nav-content">
              <button
                className="tests-nav-button"
                onClick={() => setCurrentSection((prev) => Math.max(prev - 1, 0))}
                disabled={currentSection === 0}
              >
                <ChevronLeft /> Previous
              </button>
              <button
                className="tests-nav-button"
                onClick={() => setCurrentSection((prev) => Math.min(prev + 1, 1))}
                disabled={currentSection === 1}
              >
                Next <ChevronRight />
              </button>
            </div>
            <button className="tests-review-button" onClick={() => setShowReview(true)}>
              Review Questions
            </button>
          </div>
        </div>
      </div>
      {showReview && <ReviewPanel />}
    </div>
  );
};

export default Tests;
