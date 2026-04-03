const NETWORK_DELAY_MS = 900;

/**
 * Step 1: Server Action (mock)
 * Simulates persisting feedback to a backend.
 */
export async function submitFeedbackAction(payload) {
  const name = payload.name?.trim() ?? '';
  const message = payload.message?.trim() ?? '';
  const rating = Number(payload.rating);

  if (!name) {
    throw new Error('Name is required.');
  }

  if (name.length < 2) {
    throw new Error('Name must be at least 2 characters.');
  }

  if (!message) {
    throw new Error('Feedback message is required.');
  }

  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    throw new Error('Rating must be between 1 and 5.');
  }

  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));

  // Keep a very small chance of failure to demonstrate rollback handling.
  if (Math.random() < 0.06) {
    throw new Error('Server is busy. Please try again.');
  }

  return {
    id: crypto.randomUUID(),
    name,
    message,
    rating,
    createdAt: new Date().toISOString(),
  };
}
