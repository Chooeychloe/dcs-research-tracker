// src/components/ui/Input.jsx
export function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${className}`}
      {...props}
    />
  );
}

// src/components/ui/TextArea.jsx
export function TextArea({ className = "", ...props }) {
  return (
    <textarea
      className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${className}`}
      {...props}
    />
  );
}

// src/components/ui/Select.jsx
export function Select({ options, className = "", ...props }) {
  return (
    <select className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${className}`} {...props}>
      {options.map((opt) => (
        <option key={opt.value} { ...opt.disabled && { disabled: true } } value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}