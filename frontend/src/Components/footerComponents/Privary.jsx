import React from 'react';

function Privacy() {
  return (
    <section className="bg-gray-100 py-16 pt-30">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Privacy Policy</h2>

        <div className="bg-white shadow-lg rounded-lg p-8 text-left">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h3>
          <p className="text-gray-600 leading-relaxed">
            At Servielliance, we value your privacy. This policy outlines how we collect, use, and protect your personal information.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">2. Information We Collect</h3>
          <p className="text-gray-600 leading-relaxed">
            - Personal details like name, email, phone number, and address. <br />
            - Service preferences and booking history. <br />
            - Payment information (secured and not stored by us).
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">3. How We Use Your Information</h3>
          <p className="text-gray-600 leading-relaxed">
            - To provide and improve our services. <br />
            - To process payments securely. <br />
            - To send updates, promotions, and service notifications.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">4. Data Security</h3>
          <p className="text-gray-600 leading-relaxed">
            - We implement advanced security measures to protect your data. <br />
            - Your personal information is never shared without your consent.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">5. Cookies & Tracking</h3>
          <p className="text-gray-600 leading-relaxed">
            - We use cookies to enhance your browsing experience. <br />
            - You can manage cookie preferences in your browser settings.
          </p>

          <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-4">6. Contact Us</h3>
          <p className="text-gray-600 leading-relaxed">
            If you have any questions about our privacy policy, contact us at 
            <span className="text-blue-600 font-semibold"> privacy@servielliance.com</span>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Privacy;
