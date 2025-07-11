import React from 'react';
import Head from 'next/head';

const DebugPage: React.FC = () => {
  console.log('DebugPage rendering...');
  
  return (
    <>
      <Head>
        <title>Debug Page - GSI Orders</title>
      </Head>
      <div className="min-h-screen bg-white">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Debug Page
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            This is a minimal test page to debug the blank screen issue.
          </p>
          
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-emerald-800 mb-2">
              System Status
            </h2>
            <ul className="space-y-2 text-emerald-700">
              <li>✅ React is rendering</li>
              <li>✅ Tailwind CSS is working</li>
              <li>✅ Next.js routing is functional</li>
            </ul>
          </div>
          
          <div className="mt-8">
            <button 
              onClick={() => console.log('Button clicked!')}
              className="bg-emerald-600 text-white px-6 py-3 rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Test Button
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default DebugPage; 