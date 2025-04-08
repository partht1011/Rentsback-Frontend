"use client";

import Link from "next/link";

const PrivacyPolicy = () => {
  return (
    <div className=" mx-auto py-28 px-6 bg-gradient-to-b from-black via-[#130fa3] to-black text-white rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-center">
        Privacy Policy
      </h1>
      <p className="mb-6 text-lg text-gray-300">
        Your privacy is important to us. This Privacy Policy explains how we
        collect, use, and protect your personal information when you use our
        platform.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            1. Information We Collect
          </h2>
          <p className="text-gray-300">
            We may collect personal information such as your name, email
            address, phone number, and payment details when you register or make
            transactions on our platform.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            2. How We Use Your Information
          </h2>
          <p className="text-gray-300">
            We use your information to provide our services, process payments,
            improve user experience, and comply with legal requirements.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            3. Cookies and Tracking Technologies
          </h2>
          <p className="text-gray-300">
            We use cookies to enhance your experience. You can manage cookie
            preferences in your browser settings.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            4. Third-Party Services
          </h2>
          <p className="text-gray-300">
            We may use third-party services for analytics, payments, and
            security. These providers have their own privacy policies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            5. Your Rights
          </h2>
          <p className="text-gray-300">
            You have the right to access, update, or delete your personal data.
            Contact us if you wish to exercise these rights.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2 text-white">
            6. Changes to This Policy
          </h2>
          <p className="text-gray-300">
            We may update this policy from time to time. Any changes will be
            posted on this page.
          </p>
        </section>
      </div>

      <p className="mt-8 text-center text-gray-300">
        If you have any questions, please{" "}
        <Link href="/" className="text-blue-400 underline hover:text-blue-300">
          contact us
        </Link>
        .
      </p>
    </div>
  );
};

export default PrivacyPolicy;
