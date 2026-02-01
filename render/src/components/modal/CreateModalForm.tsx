import { useState } from "react";

export type ModalField =
  | {
      type: "text";
      name: string;
      label: string;
      placeholder?: string;
    }
  | {
      type: "select";
      name: string;
      label: string;
      options: { id: number; name: string }[];
    };

interface Props<T extends Record<string, any>> {
  title: string;
  fields: ModalField[];
  initialValues: T;
  onSave(values: T): void;
  onClose(): void;
}

export function CreateEntityModal<T extends Record<string, any>>({
  title,
  fields,
  initialValues,
  onSave,
  onClose,
}: Props<T>) {
  const [values, setValues] = useState<T>(initialValues);

  function updateField(name: string, value: any) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSave(values);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center modal-overlay">
      <form onSubmit={handleSubmit} className="modal w-80 p-6 space-y-4">
        <h2 className="modal-title text-lg">{title}</h2>

        <div className="space-y-3">
          {fields.map((field) =>
            field.type === "text" ? (
              <input
                key={field.name}
                placeholder={field.placeholder ?? field.label}
                value={values[field.name] ?? ""}
                onChange={(e) => updateField(field.name, e.target.value)}
                className="modal-input"
              />
            ) : (
              <select
                key={field.name}
                value={values[field.name]}
                onChange={(e) =>
                  updateField(field.name, Number(e.target.value))
                }
                className="modal-select"
              >
                {field.options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            )
          )}
        </div>

        <div className="flex justify-end gap-2 pt-3">
          <button
            type="button"
            onClick={onClose}
            className="modal-btn-secondary"
          >
            Cancelar
          </button>

          <button type="submit" className="modal-btn-primary">
            Criar
          </button>
        </div>
      </form>
    </div>
  );
}
