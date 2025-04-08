"use client";

import React, {useEffect, useState} from "react";
import { Search } from "lucide-react";
import {useFetchAllTenants} from "@/hooks/tenants/useFetchAllTenants";
import Link from "next/link";
import {useRouter} from "next/navigation";

const UserList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: tenants, isLoading, error } = useFetchAllTenants();
  const [filteredTenants, setFilteredTenants] = useState(tenants?.tenants || []);
  const router = useRouter();

  useEffect(() => {
    if (tenants?.tenants) {
      setFilteredTenants(tenants.tenants);
    }
  }, [tenants]);

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      setSearchQuery(tenants?.tenants || []);
      return;
    }

    const searchTerm = searchQuery.toLowerCase().trim();
    const filtered = tenants?.tenants?.filter(tenant =>
        tenant.email.toLowerCase().includes(searchTerm) ||
        tenant.fullName.toLowerCase().includes(searchTerm)
    ) || [];

    setFilteredTenants(filtered);
  };

  // Handle search when Enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleView = (id) => {
    router.push(`/adminpanel/user/${id}`);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <div className="bg-white p-4 shadow-md rounded-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">User List</h2>
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Name (or) Address"
              value={searchQuery}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={handleKeyDown}
              className="border px-4 py-2 rounded-l-md focus:outline-none w-60"
            />
            <button className="bg-[#130fa3] px-4 py-2 text-white rounded-r-md flex items-center">
              <Search size={16} />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white border rounded-lg">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2 text-left">S.No</th>
                <th className="px-4 py-2 text-left">User Name</th>
                <th className="px-4 py-2 text-left">Wallet Address</th>
                <th className="px-4 py-2 text-left">E-mail Address</th>
                <th className="px-4 py-2 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((user, index) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{user.fullName ? user.fullName : user.firstName + ' ' + user.lastName}</td>
                    <td className="px-4 py-2">{user.tenantWalletAddress || "-"}</td>
                    <td className="px-4 py-2">{user.email}</td>
                    <td className="px-4 py-2">
                      <Link
                          href={`/adminpanel/user/${user._id}`}
                          className="cursor-pointer text-[#130fa3] hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserList;
