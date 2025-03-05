import React, { useState, useEffect } from 'react';
import { db } from '../../firebase'; // Adjust path to your firebase.js
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import './Feedback.css'; // We'll create this next

const Feedback = () => {
  const [feedbackText, setFeedbackText] = useState('');
  const [rating, setRating] = useState(0);
  const [feedbackList, setFeedbackList] = useState([]);
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch feedback from Firestore in real-time
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'feedback'), (snapshot) => {
      const feedbackData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFeedbackList(feedbackData);
    });
    return () => unsubscribe(); // Cleanup subscription
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!feedbackText || rating === 0) {
      alert('Please provide feedback and a rating!');
      return;
    }

    try {
      await addDoc(collection(db, 'feedback'), {
        text: feedbackText,
        rating: rating,
        timestamp: new Date().toISOString(),
      });
      setFeedbackText('');
      setRating(0);
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  // Render stars for rating
  const renderStars = (currentRating, isInteractive = false) => {
    return (
      <div className="star-rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`star ${star <= (isInteractive ? hoverRating || currentRating : currentRating) ? 'filled' : ''}`}
            onClick={isInteractive ? () => setRating(star) : null}
            onMouseEnter={isInteractive ? () => setHoverRating(star) : null}
            onMouseLeave={isInteractive ? () => setHoverRating(0) : null}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="feedback-container">
      <h1 className="title">Share Your Feedback</h1>
      
      {/* Feedback Form */}
      <form className="feedback-form" onSubmit={handleSubmit}>
        <textarea
          value={feedbackText}
          onChange={(e) => setFeedbackText(e.target.value)}
          placeholder="Tell us what you think..."
          className="feedback-input"
          rows="4"
        />
        <div className="rating-section">
          <p>Rate your experience:</p>
          {renderStars(rating, true)}
        </div>
        <button type="submit" className="submit-button">
          Submit Feedback
        </button>
      </form>

      {/* Feedback List */}
      <div className="feedback-list">
        <h2>Recent Feedback</h2>
        {feedbackList.length === 0 ? (
          <p>No feedback yet. Be the first!</p>
        ) : (
          feedbackList
            .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) // Sort by newest first
            .map((feedback) => (
              <div key={feedback.id} className="feedback-card">
                <p className="feedback-text">"{feedback.text}"</p>
                <div className="feedback-rating">
                  {renderStars(feedback.rating)}
                </div>
                <span className="feedback-date">
                  {new Date(feedback.timestamp).toLocaleDateString()}
                </span>
              </div>
            ))
        )}
      </div>
    </div>
  );
};

export default Feedback;