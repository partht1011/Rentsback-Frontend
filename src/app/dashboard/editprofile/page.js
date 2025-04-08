"use client";
import { useState, useEffect } from "react";
import { useEditProfile } from "@/hooks/auth/useEditProfile";
import { useFetchUserData } from "@/hooks/auth/useAuthActions";
import Image from "next/image";

export default function EditProfile() {
  const { data: user } = useFetchUserData();
  const { mutate: editProfile, isPending } = useEditProfile();
  const [name, setName] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [imageFile, setImageFile] = useState(null);

  // Initialize state after user is loaded
  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setProfileImage(user?.profileImage?.url || "");
    }
  }, [user]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImageFile(file);

    // Create a preview URL for the image
    const previewUrl = URL.createObjectURL(file);
    setProfileImage(previewUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) return;

    editProfile({
      file: imageFile || user.profileImage.url, // Ensure a valid file is passed
      name,
      currentPublicId: user?.profileImage?.id
    });
  };

  if (!user) return <div>Loading...</div>;

  return (
      <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium">Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-2 border rounded-lg"
                required
                placeholder={user.name || "Enter your name"}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Profile Image</label>
            <input
                type="file"
                onChange={handleImageUpload}
                className="w-full p-2 border rounded-lg"
                accept="image/*"
            />
            {profileImage && (
                <Image
                    src={profileImage}
                    alt="Profile Preview"
                    className="mt-2 w-32 h-32 rounded-full object-cover"
                />
            )}
          </div>
          <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed disabled:opacity-50"
              disabled={isPending}
          >
            {isPending ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
  );
}