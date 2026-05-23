import { useState, useEffect } from "react";

const API_URL = "http://localhost:5000";

const emptyForm = {
  title: "",
  authors: "",
  abstract: "",
  adviser: "",
  critic: "",
  status: "MOR",
  website_url: "",
};

function ResearchFormModal({
  isOpen,
  onClose,
  onResearchAdded,
  editData,
  isEdit,
}) {
  const [formData, setFormData] = useState(emptyForm);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    if (isEdit && editData) {
      setFormData({
        title: editData.title || "",
        authors: editData.authors || "",
        abstract: editData.abstract || "",
        adviser: editData.adviser || "",
        critic: editData.critic || "",
        status: editData.status || "MOR",
        website_url: editData.website_url || "",
      });
    } else {
      setFormData(emptyForm);
    }

    setPdfFile(null);
  }, [isEdit, editData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetAndClose = () => {
    setFormData(emptyForm);
    setPdfFile(null);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("title", formData.title);
    data.append("authors", formData.authors);
    data.append("abstract", formData.abstract);
    data.append("adviser", formData.adviser);
    data.append("critic", formData.critic);
    data.append("status", formData.status);
    data.append("website_url", formData.website_url);

    if (pdfFile) {
      data.append("pdf_file", pdfFile);
    }

    const url = isEdit
      ? `${API_URL}/api/research/${editData.id}`
      : `${API_URL}/api/research`;

    const method = isEdit ? "PUT" : "POST";

    fetch(url, {
      method,
      body: data,
    })
      .then((res) => res.json())
      .then(() => {
        onResearchAdded(); // refresh parent
        resetAndClose();
      })
      .catch((err) => console.error("Save error:", err));
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {isEdit ? "Edit Research Record" : "Add Research Record"}
          </h2>

          <button
            onClick={resetAndClose}
            className="text-gray-500 text-xl font-bold"
          >
            ×
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="authors"
            value={formData.authors}
            onChange={handleChange}
            placeholder="Authors"
            className="w-full border p-2 rounded"
            required
          />

          <textarea
            name="abstract"
            value={formData.abstract}
            onChange={handleChange}
            placeholder="Abstract"
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="adviser"
            value={formData.adviser}
            onChange={handleChange}
            placeholder="Adviser"
            className="w-full border p-2 rounded"
            required
          />

          <input
            name="critic"
            value={formData.critic}
            onChange={handleChange}
            placeholder="Critic"
            className="w-full border p-2 rounded"
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="MOR">MOR</option>
            <option value="Part A">Part A</option>
            <option value="Part B">Part B</option>
            <option value="Finished">Finished</option>
          </select>

          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setPdfFile(e.target.files[0])}
            className="w-full border p-2 rounded"
          />

          <input
            name="website_url"
            value={formData.website_url}
            onChange={handleChange}
            placeholder="Website URL"
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-2 pt-4 border-t">

            <button
              type="button"
              onClick={resetAndClose}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {isEdit ? "Update" : "Save"}
            </button>

          </div>
        </form>
      </div>
    </div>
  );
}

export default ResearchFormModal;