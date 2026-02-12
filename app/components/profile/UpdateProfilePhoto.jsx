"use client";
import { useAuthContext } from "@/context/AuthContext"; // global user context
import api from "@/lib/api";
import { Camera, User } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function UpdateProfilePhoto({ initialImage }) {
  const { user, setUser } = useAuthContext(); // access global user
  const [profileImage, setProfileImage] = useState(initialImage || user?.image || null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("File size must be less than 2MB");
      return;
    }

    // Local preview (instant)
    const reader = new FileReader();
    reader.onload = (e) => setProfileImage(e.target.result);
    reader.readAsDataURL(file);

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post("/auth/user/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data?.data?.image) {
        // update local and global user state
        setProfileImage(data.data.image);
        setUser((prev) => ({ ...prev, image: data.data.image }));
        toast.success("Profile updated successfully!");
      } else {
        toast.error("Failed to upload image");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to upload image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      <div className="relative">
        <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <User className="h-12 w-12 text-gray-400" />
          )}
        </div>
        <button
          onClick={triggerFileInput}
          className="absolute bottom-0 right-0 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
        >
          <Camera className="h-4 w-4" />
        </button>
      </div>
      <div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
        />
        <button
          onClick={triggerFileInput}
          className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 text-sm font-medium"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Photo"}
        </button>
        <p className="text-xs text-gray-600 mt-2">
          JPG, PNG or GIF. Max size 2MB.
        </p>
      </div>
    </div>
  );
}
