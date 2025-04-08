"use client";
import React, { useState } from "react";
import { useSubmitForm2 } from "@/hooks/form2/useForm2";
import {useFetchUserData} from "@/hooks/auth/useAuthActions";
import {useRouter} from "next/navigation";

const RentalForm = () => {
  const { data: user } = useFetchUserData();
  const { mutate: submitForm2, isLoading } = useSubmitForm2();
  const router = useRouter();

  const [formData, setFormData] = useState({
    apartmentOrHouse: "",
    completeAddress: "",
    apartmentLevel: "",
    numberOfRooms: "",
    roomsOver40m2: "",
    yearOfConstruction: "",
    furnishedUnit: "No",
    workFromHome: "No",
    workPurpose: "No",
    rentalContractFile: null,
    idVerificationFile: null,
    tenantWalletAddress: "0x392abd52cf287c6a571b06291bc54414b18a8ce4",
    equipment: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox'
          ? checked
              ? [...prev.equipment, value]
              : prev.equipment.filter(item => item !== value)
          : value
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    console.log('file change', e.target.files[0]);
    setFormData(prev => ({
      ...prev,
      [name]: files[0]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    submitForm2({
      tenantId: user?.tenant_id ?? '',
      formData
    }, {
      onSuccess: () => {
        alert("Form submitted successfully!");
        router.push('/dashboard/reward');
      },
      onError: (error) => {
        // Handle error
        console.error("Submission failed:", error);
        alert("Submission failed. Please try again.");
      }
    });
  };

  const equipmentOptions = [
    "Fire alarm",
    "Anti-robbery system",
    "Fireplace",
    "Veranda",
    "Outbuilding unit",
    "Garage"
  ];

  return (
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Rental Form</h2>
        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block font-medium">Apartment or House</label>
            <select
                name="apartmentOrHouse"
                value={formData.apartmentOrHouse}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            >
              <option value="">Select</option>
              <option value="Apartment">Apartment</option>
              <option value="House">House</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Complete address</label>
            <textarea
                name="completeAddress"
                value={formData.completeAddress}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                rows="2"
                required
            ></textarea>
          </div>
          <div>
            <label className="block font-medium">If Apartment: Level</label>
            <select
                name="apartmentLevel"
                value={formData.apartmentLevel}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                disabled={formData.apartmentOrHouse !== "Apartment"}
            >
              <option value="">Select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Number of rooms</label>
            <input
                type="number"
                name="numberOfRooms"
                value={formData.numberOfRooms}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
          </div>
          <div>
          <label className="block font-medium">Rooms over 40m2</label>
            <input
                type="number"
                name="roomsOver40m2"
                value={formData.roomsOver40m2}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
          </div>
          <div>
            <label className="block font-medium">Year of construction</label>
            <input
                type="number"
                name="yearOfConstruction"
                value={formData.yearOfConstruction}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
          </div>
          <div>
            <label className="block font-medium">Furnished unit</label>
            <select
                name="furnishedUnit"
                value={formData.furnishedUnit}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
          <div>
            <label className="block font-medium">Rental Contract (PDF)</label>
            <input
                type="file"
                name="rentalContractFile"
                onChange={handleFileChange}
                className="w-full border p-2 rounded"
                accept=".pdf"
            />
          </div>
          <div>
            <label className="block font-medium">ID Verification (pdf, jpeg, png)</label>
            <input
                type="file"
                name="idVerificationFile"
                onChange={handleFileChange}
                className="w-full border p-2 rounded"
                accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
          <div>
            <label className="block font-medium">{'Tenant\'s Metamask Wallet'}</label>
            <input
                type="text"
                name="tenantWalletAddress"
                value={formData.tenantWalletAddress}
                onChange={handleChange}
                className="w-full border p-2 rounded"
                required
            />
          </div>
          <div className="col-span-2">
            <label className="block font-medium mb-2">Equipment to mention</label>
            <div className="grid grid-cols-3 gap-2">
              {equipmentOptions.map((item, index) => (
                  <label key={index} className="flex items-center">
                    <input
                        type="checkbox"
                        name="equipment"
                        value={item}
                        checked={formData.equipment.includes(item)}
                        onChange={handleChange}
                        className="mr-2"
                    />
                    {item}
                  </label>
              ))}
            </div>
          </div>
          <div className="col-span-2 flex justify-center mt-4">
            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
                disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
  );
};

export default RentalForm;