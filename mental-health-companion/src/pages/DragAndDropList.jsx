import { useState, useRef } from "react";

const DragAndDropImageUpload = () => {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  };

  const processFiles = (selectedFiles) => {
    // Filter only image files
    const imageFiles = selectedFiles.filter((file) =>
      file.type.startsWith("image")
    );
    if (imageFiles.length) {
      // Filter out duplicates by comparing file name and size
      const uniqueImageFiles = imageFiles.filter((file) => {
        return !files.some(
          (existingFile) =>
            existingFile.name === file.name && existingFile.size === file.size
        );
      });
      if (uniqueImageFiles.length) {
        const newImages = uniqueImageFiles.map((file) => ({
          url: URL.createObjectURL(file),
          file,
        }));
        setImages((prev) => [...prev, ...newImages]);
        setFiles((prev) => [...prev, ...uniqueImageFiles]);
      }
    }
  };

  const handleFileSelect = (e) => {
    const selectedFiles = Array.from(e.target.files);
    processFiles(selectedFiles);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    files.forEach((file) => formData.append("images", file));
    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        alert("Images uploaded successfully!");
      } else {
        alert("Upload failed");
      }
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
      alert("Error uploading images");
    }
  };

  const handleRemoveImage = (index) => {
    URL.revokeObjectURL(images[index].url);
    setImages((prev) => prev.filter((_, i) => i !== index));
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-md mx-auto pt-[10px] flex flex-col items-center h-screen">
      <div
        className={`relative w-full h-48 border-2 border-dashed rounded flex flex-col justify-center items-center text-gray-600 cursor-pointer transition-all duration-300 ${
          isDragActive ? "border-blue-400 bg-gray-100 blur-sm" : "border-gray-400 bg-white"
        }`}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <label
          htmlFor="file-upload"
          className="w-full h-full flex flex-col justify-center items-center"
        >
          {isDragActive ? (
            <p className="text-blue-600 font-bold">Release to upload</p>
          ) : (
            <>
              <p>Drag & Drop Images Here</p>
              <p className="mt-2 text-sm text-blue-600 underline">
                Or browse to select files
              </p>
            </>
          )}
        </label>
        <input
          id="file-upload"
          type="file"
          multiple
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
      </div>

      {images.length > 0 && (
        <div className="mt-4 grid grid-cols-3 gap-2">
          {images.map((img, index) => (
            <div key={index} className="relative border">
              <img
                src={img.url}
                alt={`Uploaded ${index}`}
                className=" object-contain"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-1 rounded"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded"
        >
          Upload Images
        </button>
      )}
    </div>
  );
};

export default DragAndDropImageUpload;
