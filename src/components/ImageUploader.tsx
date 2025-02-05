"use client";

import { Label } from "@/components/ui/label";
import { Trash, UploadCloud } from "lucide-react";
import React, { useRef, useState } from "react";
import axios from "axios";
import { Loader } from "@/components/loader";
import Image from "next/image";

type ImageUploaderProps = {
  name: string;
  onChange: (url: string | null) => void; // ✅ Update form state
};

const ImageUploader = ({ name, onChange }: ImageUploaderProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;
    const file = event.target.files[0];
    setLoading(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const response = await axios.post("/api/image", {
          filePath: reader.result,
        });
        setImageUrl(response.data.imageUrl);
        onChange(response.data.imageUrl); // ✅ Pass image URL to form
      };
    } catch (error) {
      setError("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!imageUrl) return;
    setLoading(true);
    setError(null);

    try {
      const urlParts = imageUrl.split("/");
      const publicIdWithExtension = urlParts[urlParts.length - 1];
      const publicId = publicIdWithExtension.split(".")[0];

      await axios.delete(`/api/image/${publicId}?folder=els-users`);
      setImageUrl(null);
      onChange(null); // ✅ Reset form value

      // Clear file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      setError("Failed to delete image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 border p-4 rounded-md">
      <Label>{name}</Label>

      {!imageUrl && (
        <div className="relative">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleUpload}
            className="hidden"
            id="file-upload"
            disabled={loading}
          />
          <label
            htmlFor="file-upload"
            className="flex items-center justify-center border border-dashed p-4 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <UploadCloud className="w-6 h-6 text-gray-500 dark:text-gray-400 mr-2" />
            <span className="text-gray-600 dark:text-gray-300">
              Click to upload
            </span>
          </label>
        </div>
      )}

      <Loader loading={loading}>
        {imageUrl && (
          <div className="flex relative justify-center">
            <Image
              src={imageUrl}
              alt="Uploaded"
              className="w-full object-cover rounded-md"
            />
            <button
              onClick={handleDelete}
              className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-full"
              disabled={loading}
            >
              <Trash className="w-4 h-4" />
            </button>
          </div>
        )}
      </Loader>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default ImageUploader;
