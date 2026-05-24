// src/components/ui/Modal.jsx
export function Modal({ isOpen, onClose, title, children, maxWidth = "max-w-2xl" }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className={`bg-white rounded-xl shadow-xl w-full ${maxWidth} max-h-[90vh] overflow-y-auto p-6`}>
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button onClick={onClose} className="text-gray-500 text-2xl font-bold hover:text-gray-700 transition leading-none">
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}