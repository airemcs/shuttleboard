import { useState, useRef } from "react";
import { FiImage, FiX } from "react-icons/fi";

interface FileUploadProps {
  label: string;
  required?: boolean;
  accept?: string;
  maxSize?: number;
  hint?: string;
  onChange?: (file: File | null) => void;
}

export default function FileUpload({
  label,
  required = false,
  accept = "image/jpeg,image/png",
  maxSize = 5,
  hint = "JPG, PNG up to 5MB • Recommended: 1:1 or 1.91:1 ratio",
  onChange,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > maxSize * 1024 * 1024) {
        alert(`File size must be less than ${maxSize}MB`);
        return;
      }

      setFileName(file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      onChange?.(file);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    setFileName(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    onChange?.(null);
  };

  return (
    <div className="flex flex-col gap-y-2.5">
      <span className="font-sf-medium text-primary-black text-base">
        {label} {required ? <span className="text-[#DC2626]">*</span> : <span className="text-[#9CA3AF] font-sf-regular tracking-wide">(Optional)</span>}
      </span>

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="sr-only"
      />

      {preview ? (
        <div className="relative w-full rounded-md border border-[#E1E5EA] overflow-hidden">
          <img src={preview} alt="Preview" className="w-full h-48 object-cover" />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-100 cursor-pointer"
          >
            <FiX className="size-4 text-[#4A5568]" />
          </button>
          <div className="p-2 bg-white border-t border-[#E1E5EA]">
            <span className="text-sm text-[#4A5568] truncate block">{fileName}</span>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          className="flex flex-col items-center gap-y-3 py-10 px-4 border-2 border-dashed border-[#D1D5DB] rounded-md cursor-pointer hover:border-primary-green hover:bg-[#FAFBFC] transition-colors"
        >
          <div className="size-16 bg-primary-green-light rounded-xl flex items-center justify-center">
            <FiImage className="size-7 text-primary-green" />
          </div>
          <span className="font-sf-bold text-primary-green">Upload Event Flyer</span>
          <span className="font-sf-regular text-xs text-[#9CA3AF] text-center">{hint}</span>
        </div>
      )}
    </div>
  );
}