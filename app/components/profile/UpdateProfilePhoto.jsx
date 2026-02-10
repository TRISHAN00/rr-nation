
import api from "@/lib/axios.interceptor";
import { getProfile, updateProfile } from "@/services/user.service";
import { Camera, User } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function UpdateProfilePhoto() {
  const [profileImage, setProfileImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);

  const triggerFileInput = () => fileInputRef.current?.click();

  // Fetch current user profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getProfile();
        setProfileImage(userData.imageUrl || null);
      } catch (err) {
        console.error("Failed to fetch profile:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file (JPG, PNG, or GIF)");
      return;
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      alert("File size must be less than 2MB");
      return;
    }

    // Preview locally
    const reader = new FileReader();
    reader.onload = (e) => setProfileImage(e.target.result);
    reader.readAsDataURL(file);

    try {
      setLoading(true);

      // Upload image to server
      const formData = new FormData();
      formData.append("file", file);

      const { data } = await api.post("/auth/user/upload-image", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const uploadedImageUrl = data.data.imageUrl;


      // Update profile with new image URL
      await updateProfile({ imageUrl: uploadedImageUrl });

      setProfileImage(uploadedImageUrl); // Update UI
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Failed to upload image. Please try again.");
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
