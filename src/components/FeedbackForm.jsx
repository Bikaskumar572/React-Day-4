import { useState } from 'react';

const RATING_OPTIONS = [1, 2, 3, 4, 5];

function FeedbackForm({ onSubmit, isSubmitting }) {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = (event) => {
    event.preventDefault();

    const cleanName = name.trim();
    const cleanMessage = message.trim();
    if (!cleanName || !cleanMessage) {
      return;
    }

    onSubmit({ name: cleanName, message: cleanMessage, rating });
    setName('');
    setMessage('');
    setRating(5);
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h2>Share Your Feedback</h2>
        <p>Your feedback helps us improve the product experience.</p>
      </div>

      <label htmlFor="name" className="field-label">
        Name
      </label>
      <input
        id="name"
        className="text-input"
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
        placeholder="Enter your name"
        maxLength={40}
      />

      <label htmlFor="message" className="field-label">
        Feedback
      </label>
      <textarea
        id="message"
        className="text-input"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Tell us what worked well and what can be better..."
        rows={4}
        maxLength={300}
      />

      <fieldset className="rating-group">
        <legend className="field-label">Rating</legend>
        <div className="rating-options" role="radiogroup" aria-label="Rating from 1 to 5">
          {RATING_OPTIONS.map((value) => (
            <label key={value} className={`rating-chip ${rating === value ? 'selected' : ''}`}>
              <input
                type="radio"
                name="rating"
                value={value}
                checked={rating === value}
                onChange={() => setRating(value)}
              />
              {value}
            </label>
          ))}
        </div>
      </fieldset>

      <button type="submit" className="submit-btn" disabled={isSubmitting || !name.trim() || !message.trim()}>
        {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
}

export default FeedbackForm;
