// src/components/research/AbstractModal.jsx
import { Modal } from "../ui/Modal";

export function AbstractModal({ isOpen, abstract, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Full Abstract">
      <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
        {abstract}
      </p>
    </Modal>
  );
}