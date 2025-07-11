import React from 'react';

const compliancePoints = [
  {
    icon: '🛡️',
    title: 'Alcohol Compliance',
    desc: 'All products meet federal and state beverage regulations.'
  },
  {
    icon: '🔬',
    title: 'Lab Tested',
    desc: 'Every batch is independently tested for quality and safety.'
  },
  {
    icon: '🇺🇸',
    title: 'Made in USA',
    desc: 'Crafted and packaged in certified US facilities.'
  },
];

const ComplianceGrid: React.FC = () => (
  <section
    className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 bg-white rounded-2xl p-6 shadow"
    aria-label="Compliance and Quality Info"
    data-testid="compliance-grid"
  >
    {compliancePoints.map((pt) => (
      <div key={pt.title} className="flex flex-col items-center text-center gap-2">
        <span className="text-3xl" aria-hidden="true">{pt.icon}</span>
        <h4 className="font-bold text-brand-primary text-lg">{pt.title}</h4>
        <p className="text-gray-700 text-sm">{pt.desc}</p>
      </div>
    ))}
  </section>
);

export default ComplianceGrid; 