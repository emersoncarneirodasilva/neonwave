import { createContext, useContext, useState, type ReactNode } from "react";
import { ConfirmDialog } from "../components/ui/ConfirmDialog";
interface DialogContextData {
  confirm(message: string, options?: ConfirmOptions): Promise<boolean>;
}

interface ConfirmOptions {
  title?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
}

const DialogContext = createContext<DialogContextData | null>(null);

export function DialogProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    message: string;
    options?: ConfirmOptions;
    resolve?: (value: boolean) => void;
  } | null>(null);

  function confirm(
    message: string,
    options?: ConfirmOptions
  ): Promise<boolean> {
    return new Promise((resolve) => {
      setState({ message, options, resolve });
    });
  }

  function handleClose(result: boolean) {
    state?.resolve?.(result);
    setState(null);
  }

  return (
    <DialogContext.Provider value={{ confirm }}>
      {children}

      {state && (
        <ConfirmDialog
          open
          title={state.options?.title}
          message={state.message}
          confirmText={state.options?.confirmText}
          cancelText={state.options?.cancelText}
          danger={state.options?.danger}
          onConfirm={() => handleClose(true)}
          onCancel={() => handleClose(false)}
        />
      )}
    </DialogContext.Provider>
  );
}

export function useDialogContext() {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog fora do DialogProvider");
  return ctx;
}
