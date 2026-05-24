// src/components/research/ResearchRow.jsx
import { API_URL } from "../../config/constants";

export function ResearchRow({ item, onEdit, onDelete, onViewAbstract }) {
  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Finished": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Part B": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Part A": return "bg-amber-100 text-amber-800 border-amber-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-4 py-3">
        <div className="font-bold text-gray-900">{item.title}</div>
        <div className="text-xs text-blue-600 font-medium">{item.authors}</div>
      </td>

      <td className="px-4 py-3">
        <button
          onClick={() => onViewAbstract(item.abstract)}
          className="text-xs text-gray-600 hover:text-blue-600 text-left block max-w-xs group"
        >
          <span className="line-clamp-2 group-hover:underline">
            {item.abstract}
          </span>
          <span className="text-[10px] text-blue-500 mt-1 block font-medium">Click to view full abstract</span>
        </button>
      </td>

      <td className="px-4 py-3 text-xs space-y-1 text-gray-700">
        <div><b>Adviser:</b> {item.adviser}</div>
        <div><b>Critic:</b> {item.critic}</div>
      </td>

      <td className="px-4 py-3">
        <span className={`text-xs px-2 py-0.5 rounded border font-medium ${getStatusBadgeColor(item.status)}`}>
          {item.status}
        </span>
      </td>

      <td className="px-4 py-3 space-y-1">
        {item.pdf_url && (
          <a href={`${API_URL}${item.pdf_url}`} target="_blank" rel="noreferrer" className="block text-xs text-red-600 hover:underline">
            📄 Manuscript
          </a>
        )}
        {item.website_url && (
          <a href={item.website_url} target="_blank" rel="noreferrer" className="block text-xs text-indigo-600 hover:underline">
            🌐 Website
          </a>
        )}
      </td>

      <td className="px-4 py-3 text-xs">
        <div className="flex gap-1.5">
          {onEdit && (
            <button onClick={() => onEdit(item)} className="bg-amber-500 hover:bg-amber-600 text-white px-2.5 py-1 rounded transition">
              Edit
            </button>
          )}
          <button onClick={() => onDelete(item.id)} className="bg-red-500 hover:bg-red-600 text-white px-2.5 py-1 rounded transition">
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}