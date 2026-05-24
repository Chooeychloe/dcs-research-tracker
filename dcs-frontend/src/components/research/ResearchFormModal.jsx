import { useState } from "react";
import { API_URL, STATUS_OPTIONS, EMPTY_FORM } from "../../config/constants";
import { Modal } from "../ui/Modal";
import { Input } from "../ui/Input";
import { TextArea } from "../ui/TextArea";
import { Select } from "../ui/Select";

export default function ResearchFormModal({ isOpen, onClose, onResearchAdded, editData, isEdit }) {
  
  const [formData, setFormData] = useState(() => {
    if (isEdit && editData) {
      return {
        title: editData.title || "",
        authors: editData.authors || "",
        abstract: editData.abstract || "",
        adviser: editData.adviser || "",
        critic: editData.critic || "",
        status: editData.status || "MOR",
        website_url: editData.website_url || "",
      };
    }
    return EMPTY_FORM;
  });

  const [pdfFile, setPdfFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetAndClose = () => {
    setFormData(EMPTY_FORM);
    setPdfFile(null);
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (pdfFile) data.append("pdf_file", pdfFile);

    const url = isEdit ? `${API_URL}/api/research/${editData.id}` : `${API_URL}/api/research`;
    const method = isEdit ? "PUT" : "POST";

    fetch(url, { method, body: data })
      .then((res) => res.json())
      .then(() => {
        onResearchAdded();
        resetAndClose();
      })
      .catch((err) => console.error("Save error:", err));
  };

  return (
    <Modal isOpen={isOpen} onClose={resetAndClose} title={isEdit ? "Edit Research Record" : "Add Research Record"}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
        <Input name="authors" value={formData.authors} onChange={handleChange} placeholder="Authors" required />
        <TextArea name="abstract" value={formData.abstract} onChange={handleChange} placeholder="Abstract" rows="4" required />
        <Input name="adviser" value={formData.adviser} onChange={handleChange} placeholder="Adviser" required />
        <Input name="critic" value={formData.critic} onChange={handleChange} placeholder="Critic" required />
        
        <Select name="status" value={formData.status} onChange={handleChange} options={STATUS_OPTIONS} />
        
        <Input type="file" accept="application/pdf" onChange={(e) => setPdfFile(e.target.files[0])} />
        <Input name="website_url" value={formData.website_url} onChange={handleChange} placeholder="Website URL" />

        <div className="flex justify-end gap-2 pt-4 border-t">
          <button type="button" onClick={resetAndClose} className="px-4 py-2 border rounded hover:bg-gray-50">
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            {isEdit ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
}