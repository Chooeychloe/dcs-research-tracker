// src/components/research/DeleteConfirmModal.jsx
import { Modal } from "../ui/Modal";

export function DeleteConfirmModal({ isOpen, onClose, onConfirm }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Confirm Delete" maxWidth="max-w-md">
      <p className="text-sm text-gray-600 mt-2">
        Are you sure you want to delete this research record? This action cannot be undone.
      </p>
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <button onClick={onClose} className="px-4 py-2 text-sm border rounded hover:bg-gray-50">
          Cancel
        </button>
        <button onClick={onConfirm} className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700">
          Delete
        </button>
      </div>
    </Modal>
  );
}