"use client";
import { useParams } from "next/navigation";
import { useFetchTenantById } from "@/hooks/tenants/useFetchTenantById"; // Adjust the import path as needed

export default function UserDetailsPage() {
  const { id } = useParams();
  const {
    data: tenant,
    isLoading,
    isError,
    error
  } = useFetchTenantById(id);

  if (isLoading) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl font-semibold text-blue-500">
            Loading user data...
          </div>
        </div>
    );
  }

  if (isError) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl font-semibold text-red-500">
            {error.message || "Failed to load user data"}
          </div>
        </div>
    );
  }

  if (!tenant) {
    return (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-xl font-semibold text-red-500">
            User not found.
          </div>
        </div>
    );
  }

  return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
            User Details
          </h1>

          {/* Personal Details */}
          <div className="mb-6 p-4 border rounded-lg bg-blue-50">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">
              Personal Information
            </h2>
            <p>
              <strong>Full Name:</strong> {tenant.fullName ? tenant.fullName : tenant.firstName + ' ' + tenant.lastName}
            </p>
            <p>
              <strong>Email:</strong> {tenant.email || 'N/A'}
            </p>
            <p>
              <strong>Phone:</strong> {tenant.phoneNumber|| 'N/A'}
            </p>
            <p>
              <strong>Date of Birth:</strong> {new Date(tenant.dateOfBirth).toLocaleDateString()}
            </p>
            <p>
              <strong>Address:</strong> {tenant.completeAddress || 'N/A'}
            </p>
          </div>

          {/* Rental Details */}
          <div className="mb-6 p-4 border rounded-lg bg-green-50">
            <h2 className="text-xl font-semibold text-green-700 mb-2">
              Rental Information
            </h2>
            <p>
              <strong>Monthly Rent:</strong> {tenant.monthlyRentHOA}
            </p>
            <p>
              <strong>Rent Per Day:</strong> {tenant.rentPerDay}
            </p>
            <p>
              <strong>Plan Percentage:</strong> {tenant.planPercentage}
            </p>
            <p>
              <strong>Tokens per day:</strong> {tenant.tokensPerDay}
            </p>
            <p>
              <strong>Discount:</strong> {tenant.discount}
            </p>
            <p>
              <strong>Payable Amount:</strong> {tenant.payableAmount}
            </p>
            <p>
              <strong>Payment Type:</strong> {tenant.paymentType}
            </p>
          </div>

          {/* Action Buttons */}
        </div>
      </div>
  );
}