import { useState } from "react";
import axios from "axios";
import UploadResume from "./components/UploadResume";

function App() {
  const [resumeText, setResumeText] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleResumeUpload = async (file) => {
    const formData = new FormData();
    formData.append("resume", file);

    try {
      setUploading(true);
      const res = await axios.post("http://localhost:5000/api/upload-resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.data.success) {
        setResumeText(res.data.resumeText);
        alert("Resume uploaded and parsed successfully.");
      } else {
        alert("Failed to parse resume.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading resume.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-bold mb-4">Interview Q&A Bot</h1>

      <UploadResume onUpload={handleResumeUpload} />
      {uploading && <p className="text-sm text-blue-500">Uploading and extracting...</p>}

      {resumeText && (
        <div className="mt-4 bg-gray-100 p-4 rounded max-h-60 overflow-y-auto text-sm">
          <p className="font-semibold mb-2">Extracted Resume Text:</p>
          <p>{resumeText.slice(0, 1000)}...</p>
        </div>
      )}
    </div>
  );
}

export default App;
