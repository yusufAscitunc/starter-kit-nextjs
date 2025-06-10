import { Metadata } from "next";
import UsersList from "@/components/users/UsersList";

export const metadata: Metadata = {
  title: "Users - Starter Kit",
  description: "Manage users",
};

export default function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-3xl font-semibold text-gray-900">Users</h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all users in your application.
            </p>
          </div>
        </div>
        <div className="mt-8">
          <UsersList />
        </div>
      </div>
    </div>
  );
}
