// src/components/ui/TextArea.jsx

export function TextArea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${className}`}
      {...props}
    />
  );
}