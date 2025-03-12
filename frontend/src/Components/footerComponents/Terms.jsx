import React from 'react';

function Terms() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Terms & Conditions</h2>

        <div className="bg-white shadow-lg rounded-lg p-8 text-left">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h3>
          <p className="text-gray-600 leading-relaxed">
            Welcome to Servilanc! By using our services, you agree to comply with our terms and conditions. Please read them carefully.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">2. User Responsibilities</h3>
          <p className="text-gray-600 leading-relaxed">
            - You must provide accurate information while booking services. <br />
            - Any misuse or fraudulent activities will lead to account suspension. <br />
            - Ensure your availability at the scheduled service time.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">3. Service Policies</h3>
          <p className="text-gray-600 leading-relaxed">
            - We ensure high-quality service, but results may vary. <br />
            - Cancellations should be made at least 24 hours before the scheduled time. <br />
            - Refunds are subject to our review process.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">4. Privacy & Security</h3>
          <p className="text-gray-600 leading-relaxed">
            - Your personal data is protected and used only to enhance our services. <br />
            - We do not share your details with third parties without your consent.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">5. Contact Us</h3>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions regarding our terms, feel free to reach out at 
            <span className="text-blue-600 font-semibold"> support@servilanc.com</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Terms;
