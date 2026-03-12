function ConfirmLeaveModal({
  isOpen,
  title = 'Leave Current Game?',
  message = "You are about to leave this page, you will lose this game's progress. Are you sure?",
  confirmLabel = 'Leave Page',
  cancelLabel = 'Stay Here',
  onConfirm,
  onCancel,
}) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="confirm-leave-backdrop" role="presentation">
      <section
        aria-describedby="confirm-leave-message"
        aria-labelledby="confirm-leave-title"
        aria-modal="true"
        className="confirm-leave-modal"
        role="dialog"
      >
        <h2 id="confirm-leave-title">{title}</h2>
        <p id="confirm-leave-message">{message}</p>
        <div className="confirm-leave-actions">
          <button className="confirm-leave-cancel" onClick={onCancel} type="button">
            {cancelLabel}
          </button>
          <button className="confirm-leave-confirm" onClick={onConfirm} type="button">
            {confirmLabel}
          </button>
        </div>
      </section>
    </div>
  )
}

export default ConfirmLeaveModal
