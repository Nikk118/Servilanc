import React from 'react';

function AboutUs() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-4xl mx-auto text-center px-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">About Us</h2>

        <div className="bg-white shadow-lg rounded-lg p-8">
          <h3 className="text-2xl font-semibold text-gray-800 mb-4">Who We Are</h3>

          <p className="text-gray-600 leading-relaxed">
            Serviellance is a technology platform offering a variety of home services. Customers use our platform to book 
            services such as beauty treatments, haircuts, massage therapy, cleaning, plumbing, carpentry, appliance repair, 
            painting, and more. These services are delivered at the customer’s home at a time of their convenience.
          </p>

          <p className="mt-4 text-gray-600 leading-relaxed">
            We promise our customers high-quality, standardized, and reliable service. To fulfill this promise, we work 
            closely with our expert service partners, equipping them with the latest technology, training, tools, 
            financing, and support to help them succeed.
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
