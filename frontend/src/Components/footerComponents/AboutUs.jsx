import React from 'react';

function AboutUs() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h3>

          <p className="text-gray-600 leading-relaxed">
            Serviellance is a technology platform specializing in three key home services: 
            <span className="font-semibold text-gray-900"> Salon, Cleaning, and Plumbing.</span> 
            Customers can book these services conveniently through our platform, ensuring high-quality service at their doorstep.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            We promise our customers standardized, reliable, and top-notch services. To fulfill this promise, we work 
            closely with our expert service partners, providing them with cutting-edge tools, training, and support.
          </p>

          <p className="mt-6 text-lg font-semibold text-gray-800">
            Our Vision: Deliver home services and solutions like never experienced before.
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
