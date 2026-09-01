import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './AppTutorial.css';

const TUTORIAL_STEPS = [
  {
    title: '👋 Welcome to Bearlearn!',
    description: 'Bearlearn makes learning languages, words, sentences, and grammar super fun and interactive!',
    icon: '🐻'
  },
  {
    title: '📚 Lessons Section',
    description: 'Explore structured lessons on Alphabets, Words, Sentences, and Grammar in multiple languages!',
    icon: '📖'
  },
  {
    title: '🎮 Games Suite',
    description: 'Play fun games like Word Quiz, Picture Match, Word Scramble, and Grammar Challenges to test your knowledge!',
    icon: '🕹️'
  },
  {
    title: '🔊 Interactive Audio',
    description: 'Click on any word or visualizer card to hear its clear native pronunciation!',
    icon: '🔊'
  }
];

export default function AppTutorial() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    // Show on initial visit if not completed before
    const hasSeenTutorial = localStorage.getItem('bearlearn_tutorial_seen');
    if (!hasSeenTutorial) {
      setIsOpen(true);
    }
  }, []);

  const openTutorial = () => {
    setCurrentStep(0);
    setIsOpen(true);
  };

  const closeTutorial = () => {
    setIsOpen(false);
    localStorage.setItem('bearlearn_tutorial_seen', 'true');
  };

  const nextStep = () => {
    if (currentStep + 1 < TUTORIAL_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    } else {
      closeTutorial();
    }
  };

  const stepData = TUTORIAL_STEPS[currentStep];

  return (
    <>
      {/* Floating launch button */}
      <button className="tutorial-trigger-btn" onClick={openTutorial} title="How to use Bearlearn">
        ❓ App Guide
      </button>

      {/* Tutorial Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="tutorial-overlay">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="tutorial-modal"
            >
              <button className="close-x-btn" onClick={closeTutorial}>✕</button>

              <div className="tutorial-icon-wrapper">{stepData.icon}</div>
              <h2>{stepData.title}</h2>
              <p>{stepData.description}</p>

              <div className="step-indicators">
                {TUTORIAL_STEPS.map((_, index) => (
                  <span
                    key={index}
                    className={`dot ${currentStep === index ? 'active' : ''}`}
                    onClick={() => setCurrentStep(index)}
                  />
                ))}
              </div>

              <div className="modal-actions">
                <button className="skip-btn" onClick={closeTutorial}>Skip</button>
                <button className="next-step-btn" onClick={nextStep}>
                  {currentStep + 1 < TUTORIAL_STEPS.length ? 'Next ➔' : 'Got it! 👍'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
