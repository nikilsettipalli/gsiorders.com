import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const states = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia',
  'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts',
  'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia',
  'Wisconsin', 'Wyoming'
];

interface LocationGateModalProps {
  open: boolean;
  onConfirm: (state: string) => void;
}

const LocationGateModal: React.FC<LocationGateModalProps> = ({ open, onConfirm }) => {
  const [selectedState, setSelectedState] = useState('');
  const [ageConfirmed, setAgeConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    if (!ageConfirmed) {
      setError('You must confirm you are 21+');
      return;
    }
    if (!selectedState) {
      setError('Please select your state');
      return;
    }
    setError(null);
    onConfirm(selectedState);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          data-testid="location-gate-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Location Gate Modal"
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md mx-2 flex flex-col gap-4"
            initial={{ scale: 0.95, y: 40 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.95, y: 40 }}
          >
            <h2 className="text-xl font-bold text-brand-primary mb-2">Welcome to GSI Orders</h2>
            <p className="text-gray-700 mb-2">Please confirm you are 21+ and select your state to continue.</p>
            <label className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                checked={ageConfirmed}
                onChange={e => setAgeConfirmed(e.target.checked)}
                className="accent-brand-primary"
                data-testid="age-checkbox"
              />
              <span>I am 21 years of age or older</span>
            </label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-brand-primary"
              value={selectedState}
              onChange={e => setSelectedState(e.target.value)}
              data-testid="state-select"
              aria-label="Select your state"
            >
              <option value="">Select your state</option>
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            {error && <p className="text-error text-sm mt-1" role="alert" data-testid="location-gate-error">{error}</p>}
            <button
              className="btn-primary w-full mt-2"
              onClick={handleConfirm}
              disabled={!ageConfirmed || !selectedState}
              data-testid="location-gate-confirm"
            >
              Continue
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationGateModal; 