import { useState } from "react";
import { API_URL } from "../../config/constants";
import { ResearchRow } from "./ResarchRow";
import { AbstractModal } from "./AbstractModal";
import { DeleteConfirmModal } from "./DeleteConfirmModal";

const ITEMS_PER_PAGE = 5;

export default function ResearchList({
  researchLogs,
  onResearchAdded,
  onEdit,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAbstract, setSelectedAbstract] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); 
  };
  const filteredLogs = researchLogs.filter((item) => {
    const q = searchQuery.toLowerCase();
    return (
      (item.title || "").toLowerCase().includes(q) ||
      (item.authors || "").toLowerCase().includes(q) ||
      (item.adviser || "").toLowerCase().includes(q)
    );
  });

  const totalItems = filteredLogs.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE) || 1;

  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPageItems = filteredLogs.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const confirmDelete = () => {
    fetch(`${API_URL}/api/research/${deleteId}`, { method: "DELETE" })
      .then((res) => res.json())
      .then(() => {
        if (onResearchAdded) onResearchAdded();
        setDeleteId(null);

        if (currentPageItems.length === 1 && currentPage > 1) {
          setCurrentPage((prev) => prev - 1);
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="w-full bg-white rounded-xl shadow p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Research Repository
          </h2>
          <p className="text-xs text-gray-500 mt-0.5">
            Showing {totalItems === 0 ? 0 : indexOfFirstItem + 1} to{" "}
            {Math.min(indexOfLastItem, totalItems)} of {totalItems} entries
          </p>
        </div>
        <input
          className="border rounded-lg px-3 py-2 text-sm w-full sm:w-72 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          placeholder="Search items..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>

      <div className="overflow-x-auto border rounded-lg">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-xs uppercase text-gray-500 font-semibold border-b">
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
            {currentPageItems.length > 0 ? (
              currentPageItems.map((item) => (
                <ResearchRow
                  key={item.id}
                  item={item}
                  onEdit={onEdit}
                  onDelete={setDeleteId}
                  onViewAbstract={setSelectedAbstract}
                />
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-8 text-gray-400">
                  No matching records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4 pt-4 border-t text-sm">
          <span className="text-gray-600">
            Page {currentPage} of {totalPages}
          </span>

          <div className="flex gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed font-medium transition"
            >
              Previous
            </button>

            <div className="hidden sm:flex gap-1">
              {[...Array(totalPages)].map((_, index) => {
                const pageNumber = index + 1;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    className={`w-8 h-8 rounded-lg border text-sm font-medium transition ${
                      currentPage === pageNumber
                        ? "bg-blue-600 text-white border-blue-600"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent disabled:cursor-not-allowed font-medium transition"
            >
              Next
            </button>
          </div>
        </div>
      )}

      <DeleteConfirmModal
        isOpen={Boolean(deleteId)}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
      />

      <AbstractModal
        isOpen={Boolean(selectedAbstract)}
        abstract={selectedAbstract}
        onClose={() => setSelectedAbstract(null)}
      />
    </div>
  );
}
