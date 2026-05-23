import { useEffect, useState } from "react";
import ResearchFormModal from "./components/ResearchFormModal";
import ResearchList from "./components/ResearchList";

function App() {
  const [researchLogs, setResearchLogs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedResearch, setSelectedResearch] = useState(null);
  const [isEdit, setIsEdit] = useState(false);

  // FETCH DATA
  const fetchResearch = () => {
    fetch("http://localhost:5000/api/research")
      .then((res) => res.json())
      .then((data) => setResearchLogs(data))
      .catch((err) => console.error("Database sync runtime failure:", err));
  };

  useEffect(() => {
    fetchResearch();
  }, []);

  // OPEN EDIT
  const handleEdit = (item) => {
    setSelectedResearch(item);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  // CLOSE MODAL (RESET EDIT STATE)
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setSelectedResearch(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans p-6 lg:p-10">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            DCS Research Repository
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Created by Dhan
          </p>
        </div>

        <button
          onClick={() => {
            setIsEdit(false);
            setSelectedResearch(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-bold shadow-md shadow-blue-500/10 hover:shadow-lg transition flex items-center gap-2"
        >
          <span>＋</span> Add Research Entry
        </button>
      </div>

      {/* TABLE */}
      <div className="max-w-7xl mx-auto">
        <ResearchList
          researchLogs={researchLogs}
          onResearchAdded={fetchResearch}
          onEdit={handleEdit}
        />
      </div>

      {/* MODAL (FIXED FOR EDIT SUPPORT) */}
      <ResearchFormModal
        key={selectedResearch?.id || "new"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onResearchAdded={fetchResearch}
        editData={selectedResearch}
        isEdit={isEdit}
      />
    </div>
  );
}

export default App;
