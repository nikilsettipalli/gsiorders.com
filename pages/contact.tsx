import React from 'react';
import Image from 'next/image';

const Contact = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Banner Image (No overlay text) */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden">
        <Image
          src="/contact-banner.png"
          alt="Contact Banner"
          width={1920}
          height={600}
          unoptimized
          priority
          className="w-full h-auto object-cover"
         />
      </div>

      {/* Contact Info */}
      <div className="max-w-5xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <hr className="border-b-2 border-brown-700 w-16 mb-4" />
          <p><strong>Phone:</strong> 813-760-6996</p>
          <p><strong>Website:</strong> www.GSIORDERS.com</p>
          <p><strong>Email:</strong> Info@gsicbd.com</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Office</h2>
          <hr className="border-b-2 border-brown-700 w-16 mb-4" />
          <p>2855 ALT 19, Palm Harbor - 34683</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
