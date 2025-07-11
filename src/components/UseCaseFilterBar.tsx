import React, { useState } from 'react';

const useCases = [
  { key: 'party', label: 'Party' },
  { key: 'relax', label: 'Relax' },
  { key: 'mixer', label: 'Mixer' },
  { key: 'classic', label: 'Classic' },
];

interface UseCaseFilterBarProps {
  selected?: string[];
  onChange?: (selected: string[]) => void;
  multi?: boolean;
  className?: string;
}

const UseCaseFilterBar: React.FC<UseCaseFilterBarProps> = ({
  selected = [],
  onChange,
  multi = false,
  className = '',
}) => {
  const [internalSelected, setInternalSelected] = useState<string[]>(selected);

  const handleClick = (key: string) => {
    let next: string[];
    if (multi) {
      next = internalSelected.includes(key)
        ? internalSelected.filter((k) => k !== key)
        : [...internalSelected, key];
    } else {
      next = internalSelected[0] === key ? [] : [key];
    }
    setInternalSelected(next);
    onChange?.(next);
  };

  return (
    <div
      className={`flex gap-2 overflow-x-auto pb-2 ${className}`}
      role="group"
      aria-label="Use Case Filter"
      data-testid="usecase-filter-bar"
    >
      {useCases.map((uc) => (
        <button
          key={uc.key}
          type="button"
          className={`px-5 py-2 rounded-full font-medium transition-all duration-200 whitespace-nowrap border focus:outline-none focus:ring-2 focus:ring-brand-primary
            ${internalSelected.includes(uc.key)
              ? 'bg-brand-primary text-white border-brand-primary shadow-md scale-105'
              : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-brand-primary/10 hover:text-brand-primary'}
          `}
          onClick={() => handleClick(uc.key)}
          aria-pressed={internalSelected.includes(uc.key)}
          data-testid={`usecase-pill-${uc.key}`}
        >
          {uc.label}
        </button>
      ))}
    </div>
  );
};

export default UseCaseFilterBar; 