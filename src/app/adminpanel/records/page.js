"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

const users = [
    {
        id: 1,
        name: "Amal Thomas",
        wallet: "",
        email: "talktoamalthomas@gmail.com",
    },
    {
        id: 2,
        name: "FrancisKal FrancisKal",
        wallet: "",
        email: "blakewayscherer@gmail.com",
    },
    { id: 3, name: "Amal Thomas", wallet: "", email: "pigeongags@gmail.com" },
    {
        id: 4,
        name: "Miguelcoese Miguelcoese",
        wallet: "",
        email: "kertyucds@onet.eu",
    },
    {
        id: 5,
        name: "https://mnssad4365844.com",
        wallet: "",
        email: "eldoclub798-naodsung450c",
    },
    {
        id: 6,
        name: "jeya kumar",
        wallet: "",
        email: "jeyakumar.sucil@vegavid.co",
    },
];

const RecordsList = () => {
    const [searchQuery, setSearchQuery] = useState("");

    const filteredUsers = users.filter(
        (user) =>
            user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="p-6 bg-gray-100 min-h-screen w-full">
            <div className="bg-white p-4 shadow-md rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Records List</h2>
                    <div className="relative flex items-center">
                        <input
                            type="text"
                            placeholder="Name (or) Address"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
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
                        </tr>
                        </thead>
                        <tbody>
                        {filteredUsers.map((user, index) => (
                            <tr key={user.id} className="border-t">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{user.name}</td>
                                <td className="px-4 py-2">{user.wallet || "-"}</td>
                                <td className="px-4 py-2">{user.email}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default RecordsList;
