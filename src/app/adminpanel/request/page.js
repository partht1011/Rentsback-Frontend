'use client';

import React, { useState, useEffect } from "react";
import { useFetchAllTenants } from "@/hooks/tenants/useFetchAllTenants";

const UserListPage = () => {
  const { data: tenants, isLoading, error } = useFetchAllTenants();
  const [filteredTenants, setFilteredTenants] = useState(tenants?.tenants || []);
  const [searchText, setSearchText] = useState('');

  // Update filtered tenants when tenants data changes
  useEffect(() => {
    if (tenants?.tenants) {
      setFilteredTenants(tenants.tenants);
    }
  }, [tenants]);

  const handleSearch = () => {
    if (!searchText.trim()) {
      setFilteredTenants(tenants?.tenants || []);
      return;
    }

    const searchTerm = searchText.toLowerCase().trim();
    const filtered = tenants?.tenants?.filter(tenant =>
        tenant.email.toLowerCase().includes(searchTerm) ||
        tenant._id.toLowerCase().includes(searchTerm)
    ) || [];

    setFilteredTenants(filtered);
  };

  // Handle search when Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
      <div className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Initial Request</h2>
        <div className="flex justify-end mb-4">
          <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tenant Id or Email"
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
              onClick={handleSearch}
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            SEARCH
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-sm">
            <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">User Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Tenant Id</th>
              <th className="p-3 text-left">Wallet Address</th>
              <th className="p-3 text-left">Form Level Status</th>
            </tr>
            </thead>
            <tbody>
            {isLoading ? (
                <tr>
                  <td colSpan="5" className="p-3 text-center">Loading...</td>
                </tr>
            ) : error ? (
                <tr>
                  <td colSpan="5" className="p-3 text-center text-red-500">
                    Error loading tenants
                  </td>
                </tr>
            ) : filteredTenants.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-3 text-center">
                    {searchText ? 'No matching tenants found' : 'No tenants available'}
                  </td>
                </tr>
            ) : (
                filteredTenants.map((tenant) => (
                    <tr key={tenant._id} className="border-t hover:bg-gray-50">
                      <td className="p-3">{tenant.fullName}</td>
                      <td className="p-3">{tenant.email}</td>
                      <td className="p-3">{tenant._id}</td>
                      <td className="p-3 overflow-hidden text-ellipsis whitespace-nowrap max-w-xs">
                        {tenant.tenantWalletAddress}
                      </td>
                      <td className="p-3">{tenant.terminate ? 'Terminated' : 'In progress'}</td>
                    </tr>
                ))
            )}
            </tbody>
          </table>
        </div>
      </div>
  );
};

export default UserListPage;