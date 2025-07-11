import React from 'react';

const compliancePoints = [
  {
    icon: '🛡️',
    title: 'FDA Compliant',
    desc: 'All CBD products comply with federal regulations and contain <0.3% THC.'
  },
  {
    icon: '🔬',
    title: 'Third-Party Lab Tested',
    desc: 'Every batch is independently tested for potency, pesticides, and heavy metals.'
  },
  {
    icon: '🇺🇸',
    title: 'Made in USA',
    desc: 'Crafted in certified facilities with premium American-grown hemp.'
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