// src/components/ui/Select.jsx
export function Select({ options, className = "", ...props }) {
  return (
    <select 
      className={`w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${className}`} 
      {...props}
    >
      {options.map((opt) => (
        <option 
          key={opt.value} 
          value={opt.value}
          disabled={opt.disabled}
        >
          {opt.label}
        </option>
      ))}
    </select>
  );
}