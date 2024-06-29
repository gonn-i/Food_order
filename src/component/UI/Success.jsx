export default function LoadingSpinner({ context }) {
  return (
    <div className="spinner-container">
      <div>
        <div className="spinner"></div>
        <h3>{context} 👀</h3>
      </div>
    </div>
  );
}
