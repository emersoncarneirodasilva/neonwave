interface Props {
  open: boolean;
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  onConfirm(): void;
  onCancel(): void;
}

export function ConfirmDialog({
  open,
  title = "Confirmar ação",
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  danger = false,
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
      <div className="modal rounded-lg p-5 w-full max-w-sm shadow-lg">
        <h2 className="modal-title text-lg mb-2">{title}</h2>

        <p className="text-sm mb-4">{message}</p>

        <div className="flex justify-end gap-2">
          <button onClick={onCancel} className="modal-btn-secondary">
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={danger ? "modal-btn-danger" : "modal-btn-primary"}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
