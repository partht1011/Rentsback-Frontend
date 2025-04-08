/*
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { deleteImage, uploadImage } from "@/utills/Cloudinary";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const signup = async (name, email, password) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      if (res.status === 201) {
        router.push("/login");
        //alert("Signup successful! Please check your email for verification."); // Redirect to a verification info page instead of dashboard
      }
    } catch (err) {
      console.log("Signup error:", err);
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  const getAuthHeader = () => {
    const token = Cookies.get("token");
    console.log("Retrieved Token from Cookies:", token); // Debugging

    return token ? { Authorization: `Bearer ${token}` } : {};
  };

  const fetchUserData = async () => {
    try {
      const headers = getAuthHeader();
      console.log("Request Headers:", headers); // Debugging

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/profile`,
        { headers, withCredentials: true } // Ensure cookies are sent with the request
      );

      if (res.status === 200) {
        console.log("User data fetched successfully:", res.data.user); // Debugging
        setUser(res.data.user);
      }
    } catch (err) {
      console.error("Error fetching user data:", err);

      // Handle token expiration or invalid token
      if (err.response?.status === 401) {
        console.log("Unauthorized request: Removing stored token.");
        Cookies.remove("token");
        Cookies.remove("user");
        setUser(null);
      }
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
        { email, password },
        { withCredentials: true } // Ensure cookies are sent with the request
      );

      if (res.status === 200) {
        // Store the JWT token in cookies
        Cookies.set("token", res.data.token, {
          expires: 7,
          secure: true,
          sameSite: "none",
        });

        // Store user data in cookies
        Cookies.set("user", JSON.stringify(res.data.user), {
          expires: 7,
          secure: true,
          sameSite: "none",
        });

        setUser(res.data.user);
        console.log(res.data.user);
        router.push("/dashboard");
      }
    } catch (err) {
      console.log("Login error:", err);
      //alert(err.response?.data?.message || "Login failed");
    }
  };

  const logout = async () => {
    try {
      // Remove cookies
      Cookies.remove("token");
      Cookies.remove("user");

      // If your backend handles sessions, call the logout endpoint
      await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      // Redirect to login page
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const uploadProfileImage = async (file, name) => {
    if (!file || !user) return; // Ensure file and user exist

    try {
      const headers = getAuthHeader();
      console.log("Request Headers:", headers); // Debugging

      const currentProfileImage = user?.profileImage?.url;
      const currentPublicId = user?.profileImage?.id; // Cloudinary public_id

      // Step 1: Delete old image if it exists
      if (currentProfileImage && currentPublicId) {
        await deleteImage(currentPublicId);
      }

      // Step 2: Upload new image to Cloudinary
      const uploadResult = await uploadImage(file, "rentsback");

      if (!uploadResult.secure_url) throw new Error("Upload failed");

      // Step 3: Update user profile with the new image URL and public_id
      const updatedUserRes = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/edit`,
        {
          name, // Preserve existing name
          profileImage: {
            url: uploadResult.secure_url,
            id: uploadResult.public_id,
          },
        },
        { headers, withCredentials: true } // Ensure auth headers are included
      );

      console.log(
        "User profile updated successfully:",
        updatedUserRes.data.user
      ); // Debugging

      setUser(updatedUserRes.data.user); // Update user in context
    } catch (error) {
      console.error("Error handling profile image:", error);

      // Handle unauthorized errors (e.g., token expired)
      if (error.response?.status === 401) {
        console.log("Unauthorized request: Removing stored token.");
        Cookies.remove("token");
        Cookies.remove("user");
        setUser(null);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        signup,
        loading,
        logout,
        uploadProfileImage,
        fetchUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
*/
// context/AuthContext.js
"use client";
import { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Start with loading true

    useEffect(() => {
        // Check for user data in cookies when component mounts
        const userCookie = Cookies.get("user");
        if (userCookie && userCookie !== "undefined") {
            try {
                setUser(JSON.parse(userCookie));
            } catch (error) {
                console.error("Error parsing user cookie:", error);
                Cookies.remove("user"); // Remove invalid cookie
            }
        }
        setLoading(false);
    }, []);

    // Update both state and cookie when user changes
    const updateUser = (newUser) => {
        setUser(newUser);
        if (newUser) {
            Cookies.set("user", JSON.stringify(newUser), {
                sameSite: "lax",
                expires: 7 // days
            });
        } else {
            Cookies.remove("user");
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser: updateUser,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);