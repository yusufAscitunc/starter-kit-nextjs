"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/hooks/useApi";
import { userApi, UserResponseDto, UserUpdateRequestDto } from "@/lib/api";

export default function ProfileForm() {
  const [formData, setFormData] = useState<UserUpdateRequestDto>({
    id: 0,
    name: "",
    email: "",
  });

  const {
    data: user,
    loading: loadingUser,
    error: userError,
    execute: fetchUser,
  } = useApi<UserResponseDto>(userApi.getCurrentUser);
  const {
    execute: updateUser,
    loading: updating,
    error: updateError,
  } = useApi<UserResponseDto>(userApi.updateUser);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        email: user.email,
      });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser(formData);
      // Refresh user data
      fetchUser();
    } catch (error) {
      // Error is handled by useApi hook
    }
  };

  if (loadingUser) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-sm text-gray-600">Loading profile...</p>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="text-center py-4">
        <p className="text-red-500">{userError.message}</p>
        <button
          onClick={() => fetchUser()}
          className="mt-2 text-sm text-primary-600 hover:text-primary-500"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6"
    >
      <div className="md:grid md:grid-cols-3 md:gap-6">
        <div className="md:col-span-1">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Profile
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Update your profile information.
          </p>
        </div>
        <div className="mt-5 md:mt-0 md:col-span-2">
          <div className="grid grid-cols-6 gap-6">
            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Full name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>

            <div className="col-span-6 sm:col-span-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>

      {updateError && (
        <div className="text-red-500 text-sm">{updateError.message}</div>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={updating}
          className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
        >
          {updating ? "Saving..." : "Save"}
        </button>
      </div>
    </form>
  );
}
