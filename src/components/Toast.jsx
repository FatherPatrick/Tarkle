import { useEffect } from 'react';
import './Toast.css';

function Toast({ message, onDismiss }) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onDismiss();
    }, 2000);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  if (!message) return null;

  return (
    <div className="toast" role="alert" aria-live="polite">
      {message}
    </div>
  );
}

export default Toast;
