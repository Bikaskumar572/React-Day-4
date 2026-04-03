function formatDate(isoDate) {
  return new Intl.DateTimeFormat('en-US', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(isoDate));
}

function FeedbackList({ feedbacks }) {
  if (feedbacks.length === 0) {
    return (
      <section className="feedback-list-card">
        <h2>Latest Feedback</h2>
        <p className="empty-state">No feedback yet. Be the first to share your thoughts.</p>
      </section>
    );
  }

  return (
    <section className="feedback-list-card">
      <h2>Latest Feedback</h2>
      <ul className="feedback-list">
        {feedbacks.map((item) => (
          <li key={item.id} className={`feedback-item ${item.pending ? 'pending' : ''}`}>
            <div className="item-top-row">
              <div className="item-meta">
                <strong>{item.name}</strong>
                <small>{'★'.repeat(item.rating)}</small>
              </div>
              <span>{formatDate(item.createdAt)}</span>
            </div>
            <p>{item.message}</p>
            {item.pending ? <small>Syncing with server...</small> : null}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default FeedbackList;
