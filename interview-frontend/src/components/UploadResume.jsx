export default function UploadResume({ onUpload }) {
  return (
    <div className="my-4">
      <input
        type="file"
        accept="application/pdf"
        onChange={(e) => onUpload(e.target.files[0])}
        className="block w-full"
      />
    </div>
  );
}
