import { Metadata } from "next";
import ProfileForm from "@/components/profile/ProfileForm";

export const metadata: Metadata = {
  title: "Profile - Starter Kit",
  description: "Manage your profile",
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold text-gray-900">Profile</h1>
            <p className="mt-2 text-sm text-gray-700">
              Manage your account settings and profile information.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <ProfileForm />
        </div>
      </div>
    </div>
  );
}
