import { useState } from "react";

const API_URL = "http://localhost:5000";

function ResearchList({ researchLogs, onResearchAdded, onEdit }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedAbstract, setSelectedAbstract] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const filteredLogs = researchLogs.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      (item.title || "").toLowerCase().includes(q) ||
      (item.authors || "").toLowerCase().includes(q) ||
      (item.adviser || "").toLowerCase().includes(q)
    );
  });

  const handleDelete = (id) => {
    setDeleteId(id); // open modal
  };

  const confirmDelete = () => {
    fetch(`${API_URL}/api/research/${deleteId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        onResearchAdded && onResearchAdded();
        setDeleteId(null); // close modal
      })
      .catch((err) => console.error(err));
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "Finished":
        return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "Part B":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Part A":
        return "bg-amber-100 text-amber-800 border-amber-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-6">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Research Repository</h2>

        <input
          className="border rounded px-3 py-2 text-sm w-72"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500">
            <tr>
              <th className="px-4 py-3 text-left">Title</th>
              <th className="px-4 py-3 text-left">Abstract</th>
              <th className="px-4 py-3 text-left">Adviser / Critic</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Assets</th>
              <th className="px-4 py-3 text-left">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {filteredLogs.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                {/* TITLE */}
                <td className="px-4 py-3">
                  <div className="font-bold">{item.title}</div>
                  <div className="text-xs text-blue-600">{item.authors}</div>
                </td>

                {/* ABSTRACT (CLICKABLE) */}
                <td className="px-4 py-3">
                  <button
                    onClick={() => setSelectedAbstract(item.abstract)}
                    className="text-xs text-gray-600 hover:text-blue-600 text-left"
                  >
                    {item.abstract?.length > 120
                      ? item.abstract.slice(0, 120) + "..."
                      : item.abstract}
                  </button>

                  <div className="text-[10px] text-blue-500 mt-1">
                    Click to view full abstract
                  </div>
                </td>

                {/* ADVISER / CRITIC */}
                <td className="px-4 py-3 text-xs">
                  <div>
                    <b>Adviser:</b> <br />
                    {item.adviser}
                  </div>
                  <div>
                    <b>Critic:</b> <br />
                    {item.critic}
                  </div>
                </td>

                {/* STATUS */}
                <td className="px-4 py-3">
                  <span
                    className={`text-xs px-2 py-1 rounded border ${getStatusBadgeColor(item.status)}`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* ASSETS */}
                <td className="px-4 py-3 space-y-1">
                  {item.pdf_url && (
                    <a
                      href={`${API_URL}${item.pdf_url}`}
                      target="_blank"
                      className="block text-xs text-red-600"
                    >
                      📄 Manuscript
                    </a>
                  )}

                  {item.website_url && (
                    <a
                      href={item.website_url}
                      target="_blank"
                      className="block text-xs text-indigo-600"
                    >
                      🌐 <br /> Website
                    </a>
                  )}
                </td>

                {/* ACTIONS */}
                <td className="px-4 py-3 space-y-1">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(item)}
                      className="block text-xs bg-yellow-500 text-white px-2 py-1 rounded"
                    >
                      Edit
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="block text-xs bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-bold text-gray-800">Confirm Delete</h2>

            <p className="text-sm text-gray-600 mt-2">
              Are you sure you want to delete this research record? This action
              cannot be undone.
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 text-sm border rounded hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-sm bg-red-600 text-white rounded hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {selectedAbstract && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg relative flex flex-col max-h-[80vh]">
            {/* HEADER (always visible) */}
            <div className="flex justify-between items-center border-b px-5 py-3 sticky top-0 bg-white z-10">
              <h3 className="text-lg font-bold">Full Abstract</h3>

              <button
                onClick={() => setSelectedAbstract(null)}
                className="text-gray-500 text-2xl leading-none hover:text-black"
              >
                ×
              </button>
            </div>

            {/* BODY (scrollable) */}
            <div className="p-5 overflow-y-auto">
              <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
                {selectedAbstract}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResearchList;
