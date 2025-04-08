"use client";
import React, { useState, useEffect } from "react";
import { useAccount, useWaitForTransaction, useSendTransaction } from "wagmi";
import { parseEther } from "viem";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import dynamic from "next/dynamic";
import { useCreateTenantProfile, useCalculatePayableAmount } from "@/hooks/tenants/useCreateTenantProfile";
import { useConversion } from "@/hooks/tenants/useConversion";
import {useFetchUserData} from "@/hooks/auth/useAuthActions";
import {useRouter} from "next/navigation";
import { useDebounce } from '@/hooks/useDebounce';

const MotionDiv = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.div),
  { ssr: false, loading: () => <div /> }
);

const MotionButton = dynamic(
  () => import("framer-motion").then((mod) => mod.motion.button),
  {
    ssr: false,
    loading: () => (
      <button disabled className="btn-primary w-full">
        Loading...
      </button>
    ),
  }
);

// Helper function to format date
const format = (date, formatString) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return formatString
    .replace("yyyy", year)
    .replace("MM", month)
    .replace("dd", day);
};

const countries = [
  { name: "United States", currency: "USD" },
  { name: "Canada", currency: "CAD" },
  { name: "United Kingdom", currency: "GBP" },
  { name: "Australia", currency: "AUD" },
  { name: "Germany", currency: "EUR" },
  { name: "France", currency: "EUR" },
  { name: "India", currency: "INR" },
  { name: "China", currency: "CNY" },
  { name: "Japan", currency: "JPY" },
  { name: "Brazil", currency: "BRL" },
];

const plans = [
  { value: "5%", multiplier: 0.25 },
  { value: "10%", multiplier: 0.5 },
  { value: "20%", multiplier: 1 },
];

export default function TenantRequestPage() {
  const { isConnected } = useAccount(); // Check if user is connected
  const { sendTransaction } = useSendTransaction();
  const [detailsSubmitted, setDetailsSubmitted] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isConfirmPurchaseLoading, setIsConfirmPurchaseLoading] = useState(false);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const router = useRouter();
  const { data: user } = useFetchUserData();
  const [initialName] = useState(() => {
    const nameParts = user?.name?.split(" ") || [];
    return {
      firstName: nameParts[0] || "",
      lastName: nameParts[1] || ""
    };
  });

  const { mutate: createTenantProfile, isPending: isSubmittingProfile } = useCreateTenantProfile();
  const { mutate: calculatePayableAmount } = useCalculatePayableAmount();
  const { mutate, isPending, isError, error, data } = useConversion();

  // State variables
  const [formData, setFormData] = useState({
    rentalContractStartDate: "",
    rentalContractEndDate: "",
    smartContractStartDate: "",
    smartContractEndDate: "",
    actualDuration: 0,
    country: "",
    firstName: initialName.firstName,
    lastName: initialName.lastName,
    currency: "USD",
    monthlyRentHoA: "",
    monthlyRentUSD: data?.convertedRentUsd ? data.convertedRentUsd : "",
    plan: "5%",
    rentPerDay: data?.rentPerDay ? data.rentPerDay : "",
    payableAmount: "",
    paymentMethod: "usdc",
    farFromTransport: "No",
    canRelocate: "No",
    likesFlat: "No",
    acceptedTerms: false,
    acceptedPrivacy: false,
    acceptedOffers: false,
    notRestrictedCitizen: false,
  });

  const debouncedRent = useDebounce(formData.monthlyRentHoA, 500);

  useEffect(() => {
    setFormData((prevState) => ({
      ...prevState,
      firstName: initialName.firstName,
      lastName: initialName.lastName
    }));
  }, [initialName]);

  // Event handlers
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmitDetails = (e) => {
    e.preventDefault();

      // Prepare the payload according to your API requirements
      const payload = {
        monthlyRentHOA: parseFloat(formData.monthlyRentHoA),
        monthlyRentUSD: parseFloat(formData.monthlyRentUSD),
        rentPerDay: parseFloat(formData.rentPerDay),
        planPercentage: parseInt(formData.plan.replace('%', '')),
        discount: 0, // You may need to calculate this
        usdPrice: 1.00, // You may need to get this dynamically
        transportationDistance: formData.farFromTransport,
        relocatePreference: formData.canRelocate,
        flatSatisfaction: formData.likesFlat,
        paymentType: 'Metamask',
        termsAccepted: formData.acceptedTerms,
        privacyConsent: formData.acceptedPrivacy,
        receiveOffers: formData.acceptedOffers,
        complianceStatement: formData.notRestrictedCitizen,
        fullName: '',
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: "user@example.com", // You'll need to get this from your auth/user system
        phoneNumber: "+1234567890", // You'll need to get this from your form or user system
        dateOfBirth: "1990-01-01", // You'll need to get this from your form or user system
        rentalStartDate: formData.rentalContractStartDate,
        rentalClosureDate: formData.rentalContractEndDate,
        smartContractStartDate: formData.smartContractStartDate,
        smartContractEndDate: formData.smartContractEndDate,
        smartContractDurationInDays: formData.actualDuration,
        residentialAddress: "123 Main St", // You'll need to get this from your form or user system
        city: "City", // You'll need to get this from your form or user system
        state: "State", // You'll need to get this from your form or user system
        country: formData.country
      };

    createTenantProfile(payload, {
      onSuccess: (response) => {
        // After successful profile creation, calculate payable amount
        const calculationPayload = {
          tenantId: response?.tenant?._id || '',
          rentAmount: formData.monthlyRentHoA,
          plan: formData.plan.replace('%', ''),
          currency: formData.currency
        };

        calculatePayableAmount(calculationPayload, {
          onSuccess: (calculationResponse) => {
            setDetailsSubmitted(true);
            // Update the form with the calculated amount
            setFormData(prev => ({
              ...prev,
              payableAmount: calculationResponse.payableAmount
            }));
          },
          onError: (error) => {
            console.error("Payable amount calculation failed:", error);
            // You might still want to show success but indicate calculation failed
            setDetailsSubmitted(true);
          }
        });
      },
      onError: (error) => {
        console.error("Submission failed:", error);
      }
    });
  };

  const handlePurchasePlan = async () => {
    setIsConfirmPurchaseLoading(true);

    if (!isConnected) {
      alert("Wallet is not connected. Please connect your wallet first.");
      setIsConfirmPurchaseLoading(false);
      return;
    }

    try {
      // Send transaction and get the hash
      const txHash = await sendTransaction({
        to: "0xf485FF82612495102e1E0A600da2161fDBCAe9C6",
        value: parseEther("0.01"),
      });

      console.log("Transaction Hash:", txHash);

      // Show success alert
      alert("Transaction successful! Redirecting to form2...");

      // Navigate to form2 only after successful transaction
      router.push('/dashboard/form2');

    } catch (error) {
      console.error("Transaction failed:", error);
      alert("Transaction failed. Please try again.");
    } finally {
      setIsConfirmPurchaseLoading(false);
      setDialogOpen(false);
    }
  };

  // Effect to enable/disable submit button
  useEffect(() => {
    const requiredFields = [
      "rentalContractStartDate",
      "rentalContractEndDate",
      "country",
      "monthlyRentHoA",
    ];

    const checkboxFields = [
      "acceptedTerms",
      "acceptedPrivacy",
      "notRestrictedCitizen",
    ];

    const allRequiredFieldsFilled = requiredFields.every(
      (field) => formData[field] !== ""
    );

    const allCheckboxesChecked = checkboxFields.every(
      (field) => formData[field] === true
    );

    setIsSubmitDisabled(!(allRequiredFieldsFilled && allCheckboxesChecked));
  }, [formData]);

  useEffect(() => {
    if (debouncedRent && formData.currency) {
      console.log('Calling API with debounced values');
      mutate({
        rentAmount: debouncedRent,
        currency: formData.currency
      });
    }
  }, [debouncedRent, formData.currency, mutate]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      monthlyRentUSD: data?.convertedRentUsd ? data.convertedRentUsd : "",
      rentPerDay: data?.rentPerDay ? data.rentPerDay : "",
    }));
  }, [data])

  // Smart Contract Date Calculation Effect
  useEffect(() => {
    const today = new Date();
    const maxSmartContractDuration = 365; // Maximum 12 months

    if (formData.rentalContractStartDate && formData.rentalContractEndDate) {
      const startDate = new Date(formData.rentalContractStartDate);
      const endDate = new Date(formData.rentalContractEndDate);

      // Determine smart contract start date (today or rental start, whichever is later)
      const smartContractStartDate = today > startDate ? today : startDate;

      // Determine smart contract end date
      const remainingRentalDays = Math.ceil(
        (endDate.getTime() - smartContractStartDate.getTime()) /
          (1000 * 3600 * 24)
      );

      let smartContractEndDate;
      let actualDuration;

      if (remainingRentalDays <= maxSmartContractDuration) {
        // If remaining rental period is less than or equal to 365 days
        smartContractEndDate = new Date(endDate);
        actualDuration = remainingRentalDays;
      } else {
        // If remaining rental period is more than 365 days
        smartContractEndDate = new Date(smartContractStartDate);
        smartContractEndDate.setDate(
          smartContractStartDate.getDate() + maxSmartContractDuration
        );
        actualDuration = maxSmartContractDuration;
      }

      setFormData((prev) => ({
        ...prev,
        smartContractStartDate: format(smartContractStartDate, "yyyy-MM-dd"),
        smartContractEndDate: format(smartContractEndDate, "yyyy-MM-dd"),
        actualDuration: actualDuration,
      }));
    }
  }, [formData.rentalContractStartDate, formData.rentalContractEndDate]);

  return (
    <MotionDiv
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Tenant Request</h2>
      <form onSubmit={handleSubmitDetails} className="space-y-6">
        <div>
          <div className="space-y-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input-field py-2 px-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input-field py-2 px-2 w-full border rounded"
              />
            </div>

            {/* Rental Contract Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rental Contract Start Date
              </label>
              <input
                  type="date"
                  name="rentalContractStartDate"
                  value={formData.rentalContractStartDate}
                  onChange={handleChange}
                  max={new Date().toISOString().split("T")[0]}
                  required
                  className="input-field py-2 px-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rental Contract End Date
              </label>
              <input
                  type="date"
                  name="rentalContractEndDate"
                  value={formData.rentalContractEndDate}
                  onChange={handleChange}
                  min={
                    new Date(new Date().setDate(new Date().getDate() + 1))
                        .toISOString()
                        .split("T")[0]
                  }
                  required
                  className="input-field py-2 px-2 w-full border rounded"
              />
            </div>

            {/* Smart Contract Dates */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Smart Contract Start Date
              </label>
              <input
                  type="date"
                  value={formData.smartContractStartDate}
                  disabled
                  className="input-field py-2 px-2 w-full border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Smart Contract End Date
              </label>
              <input
                  type="date"
                  value={formData.smartContractEndDate}
                  disabled
                  className="input-field py-2 px-2 w-full border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Actual Duration (Days)
              </label>
              <input
                  type="number"
                  value={formData.actualDuration}
                  onChange={handleChange}
                  className="input-field py-2 px-2 w-full border rounded"
              />
            </div>

            {/* Country and Currency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                  name="country"
                  value={formData.country}
                  onChange={(e) => {
                    const selectedCountry = countries.find(
                        (c) => c.name === e.target.value
                    );
                    setFormData((prev) => ({
                      ...prev,
                      country: e.target.value,
                      currency: selectedCountry
                          ? selectedCountry.currency
                          : "USD",
                    }));
                  }}
                  required
                  className="input-field py-2 px-2 w-full border rounded"
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                    <option key={country.name} value={country.name}>
                      {country.name} ({country.currency})
                    </option>
                ))}
              </select>
            </div>

            {/* Financial Information */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rent (Local Currency)
              </label>
              <input
                  type="number"
                  name="monthlyRentHoA"
                  value={formData.monthlyRentHoA}
                  onChange={handleChange}
                  required
                  className="input-field py-2 px-2 w-full border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Monthly Rent (USD)
              </label>
              <input
                  type="number"
                  name="monthlyRentUSD"
                  value={formData.monthlyRentUSD}
                  onChange={handleChange}
                  disabled
                  className="input-field py-2 px-2 w-full border rounded bg-gray-100"
              />
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Plan
              </label>
              <select
                  name="plan"
                  value={formData.plan}
                  onChange={handleChange}
                  className="input-field py-2 px-2 w-full border rounded"
              >
                {plans.map((plan) => (
                    <option key={plan.value} value={plan.value}>
                      {plan.value} Plan
                    </option>
                ))}
              </select>
            </div>

            {/* Calculated Fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Rent Per Day
              </label>
              <input
                  type="text"
                  name="rentPerDay"
                  value={formData.rentPerDay}
                  onChange={handleChange}
                  disabled
                  className="input-field py-2 px-2 w-full border rounded bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payable Amount($)
              </label>
              <div className="relative">
                <input
                    type="text"
                    value={`${formData.payableAmount} $`}
                    disabled
                    className="input-field py-2 px-2 w-full border rounded bg-gray-100"
                />
              </div>
            </div>
          </div>
          {/*<div className="grid grid-cols-2 gap-4 mt-4">
            {["farFromTransport", "canRelocate", "likesFlat"].map(
                (key, index) => (
                    <div key={index}>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        {key === "farFromTransport"
                            ? "Are you living more than 30 min from work?"
                            : key === "canRelocate"
                                ? "Would you relocate closer to work?"
                                : "Do you like your flat?"}
                      </label>
                      <select
                          className="input-field w-full border rounded py-2 px-2"
                          name={key}
                          value={formData[key]}
                          onChange={handleChange}
                          disabled={detailsSubmitted}
                      >
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        {key === "likesFlat" && (
                            <option value="Neutral">Neutral</option>
                        )}
                      </select>
                    </div>
                )
            )}
          </div>*/}

          <div className="space-y-4 mt-4">
            {[
              "acceptedTerms",
              "acceptedPrivacy",
              "acceptedOffers",
              "notRestrictedCitizen",
            ].map((key) => (
                <div key={key} className="flex items-center gap-4">
                  <input
                      type="checkbox"
                      id={key}
                      name={key}
                      checked={formData[key]}
                      onChange={handleChange}
                      className="rounded py-2 text-[#130fa3]"
                      disabled={detailsSubmitted}
                  />
                  <label htmlFor={key} className="text-sm">
                    {key === "acceptedTerms" ? (
                        <>
                          I have read and accept Rentsbacks {' '}
                          <a
                              href="https://rentsback.com/assets/rentsback.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                              onClick={(e) => e.stopPropagation()} // Prevent checkbox toggle when clicking link
                          >
                            general terms and conditions of sale {' '}
                          </a>
                          and {' '}
                          <a
                              href="https://rentsback.com/assets/rentsback.pdf"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 hover:underline"
                              onClick={(e) => e.stopPropagation()} // Prevent checkbox toggle when clicking link
                          >
                            general terms of use
                          </a>
                        </>
                    ) : key === "acceptedPrivacy" ? (
                            <>
                              I consent to Rentsback storing and using my personal data for the proper functioning of the
                              platform {' '}
                              <a
                                  href="https://rentsback.com/assets/rentsback.pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                  onClick={(e) => e.stopPropagation()} // Prevent checkbox toggle when clicking link
                              >
                                (legal notice
                              </a>
                                       {' '} & {' '}
                              <a
                                  href="https://rentsback.com/assets/rentsback.pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:underline"
                                  onClick={(e) => e.stopPropagation()} // Prevent checkbox toggle when clicking link
                              >
                                privacy policy)
                              </a>
                            </>
                      ) : key === "acceptedOffers" ? (
                      "I agree to receive communications and commercial offers"
                      ) : (
                      "I am not a citizen of the countries unauthorized to do business with, as per article 9 of the general terms and conditions."
                      )}
                  </label>
                </div>
            ))}
          </div>

          <div className="flex gap-2 space-y-4 mt-5">
            {!detailsSubmitted ? (
                <MotionButton
                    whileHover={{scale: 1.02}}
                    whileTap={{scale: 0.98}}
                    type="submit"
                    className="btn-primary w-full bg-[#130fa3] text-white py-2 px-4 rounded hover:bg-[#0a0879] transition-colors flex items-center justify-center"
                    disabled={isSubmitDisabled || isSubmittingProfile}
                >
                  {isSubmittingProfile ? (
                      <span>Submitting...</span>
                  ) : (
                      <>
                        <span className="mr-2 font-bold">1</span>
                        <span>SUBMIT DETAILS</span>
                      </>
                  )}
                </MotionButton>
            ) : (
                <div className="flex items-center justify-center bg-green-100 text-green-800 py-2 px-4 rounded">
                  <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                  >
                    <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                    />
                  </svg>
                  <span>Details Submitted Successfully</span>
                </div>
            )}

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <MotionButton
                    whileHover={{scale: detailsSubmitted ? 1.02 : 1}}
                    whileTap={{scale: detailsSubmitted ? 0.98 : 1}}
                    type="button"
                    className={`btn-primary w-full py-2 px-4 rounded transition-colors flex items-center justify-center ${
                        detailsSubmitted
                            ? "bg-[#130fa3] text-white hover:bg-[#0a0879]"
                            : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                    disabled={!detailsSubmitted || isSubmittingProfile}
                >
                  {isSubmittingProfile ? (
                      <span>Processing...</span>
                  ) : (
                      <>
                        <span className="mr-2 font-bold">2</span>
                        <span>PURCHASE PLAN</span>
                      </>
                  )}
                </MotionButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Confirm Purchase</DialogTitle>
                  <DialogDescription>
                    You are about to purchase a plan with the following details:
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-2 py-4">
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-sm font-medium">Plan:</p>
                    <p className="text-sm">{formData.plan}</p>

                    <p className="text-sm font-medium">Monthly Amount:</p>
                    <p className="text-sm">
                      {formData.payableAmount} {formData.currency}
                    </p>

                    <p className="text-sm font-medium">Tokens Per Day:</p>
                    <p className="text-sm">{formData.tokensPerDay}</p>
                  </div>
                </div>
                <DialogFooter className="flex sm:justify-between">
                  <DialogClose asChild>
                    <button
                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                      Cancel
                    </button>
                  </DialogClose>
                  <button
                      onClick={handlePurchasePlan}
                      className="px-4 py-2 text-sm font-medium text-white bg-[#130fa3] rounded-md hover:bg-[#0a0879]"
                      disabled={isConfirmPurchaseLoading}
                  >
                    {isConfirmPurchaseLoading ? "Processing..." : "Confirm Purchase"}
                  </button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </MotionDiv>
  );
}
