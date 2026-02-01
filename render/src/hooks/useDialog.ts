import { useDialogContext } from "../contexts/DialogContext";

export function useDialog() {
  const { confirm } = useDialogContext();

  function confirmDialog(message: string) {
    return confirm(message, {
      title: "Confirmação",
    });
  }

  function confirmDelete(message: string) {
    return confirm(message, {
      title: "Excluir",
      confirmText: "Excluir",
      cancelText: "Cancelar",
      danger: true,
    });
  }

  return {
    confirmDialog,
    confirmDelete,
  };
}
