import { useActionState, useMemo, useOptimistic, useState } from 'react';
import { submitFeedbackAction } from './actions/feedback';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import './App.css';

const INITIAL_FEEDBACK = [
  {
    id: 'seed-1',
    name: 'Riya',
    message: 'Clean UI and very easy onboarding flow.',
    rating: 5,
    createdAt: new Date(Date.now() - 1000 * 60 * 48).toISOString(),
  },
  {
    id: 'seed-2',
    name: 'Arjun',
    message: 'Would love better keyboard shortcuts in the dashboard.',
    rating: 4,
    createdAt: new Date(Date.now() - 1000 * 60 * 130).toISOString(),
  },
];

function App() {
  const [feedbacks, setFeedbacks] = useState(INITIAL_FEEDBACK);
  const [optimisticFeedbacks, addOptimisticFeedback] = useOptimistic(
    feedbacks,
    (currentFeedbacks, optimisticItem) => [optimisticItem, ...currentFeedbacks],
  );

  const [actionState, submitAction, isPending] = useActionState(
    async (_, payload) => {
      try {
        const savedFeedback = await submitFeedbackAction(payload);
        setFeedbacks((current) => [savedFeedback, ...current]);
        return { error: '' };
      } catch (submitError) {
        return {
          error: submitError.message || 'Unable to submit feedback right now.',
        };
      }
    },
    { error: '' },
  );

  const totalFeedback = optimisticFeedbacks.length;
  const averageRating = useMemo(() => {
    if (!optimisticFeedbacks.length) {
      return 0;
    }

    const sum = optimisticFeedbacks.reduce((acc, item) => acc + item.rating, 0);
    return (sum / optimisticFeedbacks.length).toFixed(1);
  }, [optimisticFeedbacks]);

  const handleSubmit = ({ name, message, rating }) => {
    const optimisticFeedback = {
      id: `temp-${crypto.randomUUID()}`,
      name,
      message,
      rating,
      createdAt: new Date().toISOString(),
      pending: true,
    };

    addOptimisticFeedback(optimisticFeedback);
    submitAction({ name, message, rating });
  };

  return (
    <main className="app-shell">
      <header className="app-header">
        <p className="eyebrow">Day 4 Mini Project</p>
        <h1>Smart Feedback</h1>
        <p>Share your experience with us</p>
      </header>

      <section className="stats-card" aria-label="Feedback summary">
        <article className="stat-item">
          <strong>{totalFeedback}</strong>
          <span>Total Reviews</span>
        </article>
        <article className="stat-item">
          <strong>{averageRating}</strong>
          <span>Avg Rating</span>
        </article>
        <article className="stat-item">
          <strong>{isPending ? 'Syncing' : 'Synced'}</strong>
          <span>Status</span>
        </article>
      </section>

      {actionState.error ? <p className="error-banner">{actionState.error}</p> : null}

      <section className="content-grid">
        <FeedbackForm onSubmit={handleSubmit} isSubmitting={isPending} />
        <FeedbackList feedbacks={optimisticFeedbacks} />
      </section>
    </main>
  );
}

export default App;
