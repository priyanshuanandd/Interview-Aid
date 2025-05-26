export default function UploadResume({ onUpload }) {
  return (
    <div className="my-4 text-center">
      <label className="inline-block cursor-pointer px-4 py-2 bg-green-100 text-green-700 border border-green-300 rounded-lg shadow hover:bg-green-200 transition duration-200">
        Upload Resume
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => onUpload(e.target.files[0])}
          className="hidden"
        />
      </label>
    </div>
  );
}
