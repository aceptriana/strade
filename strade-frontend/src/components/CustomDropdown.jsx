import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

const CustomDropdown = ({ 
  options, 
  value, 
  onChange, 
  placeholder = 'Select an option',
  disabled = false,
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    option.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find(option => option.value === value);

  const handleOptionSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Dropdown Button */}
      <button
        type="button"
        onClick={handleToggle}
        disabled={disabled}
        className={`w-full flex items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all ${
          disabled 
            ? 'bg-slate-800/30 border-white/10 text-white/40 cursor-not-allowed' 
            : 'bg-slate-800/60 border-white/15 text-white hover:border-[#84F7F0]/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]'
        }`}
      >
        <span className="truncate">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown 
          className={`h-4 w-4 text-white/60 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-white/15 bg-slate-900/95 backdrop-blur-xl shadow-lg overflow-hidden">
          {/* Search Input */}
          <div className="p-2 border-b border-white/10">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Search pairs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-slate-800/60 px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#84F7F0]"
            />
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => handleOptionSelect(option.value)}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                    option.value === value
                      ? 'bg-[#84F7F0]/20 text-[#84F7F0]'
                      : 'text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{option.label}</div>
                    {option.change && (
                      <span className={`text-xs font-medium ${parseFloat(option.change) >= 0 ? 'text-[#84F7F0]' : 'text-red-400'}`}>
                        {parseFloat(option.change) >= 0 ? '+' : ''}{option.change}%
                      </span>
                    )}
                  </div>
                  {option.sublabel && (
                    <div className="text-xs text-white/60 mt-1">{option.sublabel}</div>
                  )}
                  {option.price && (
                    <div className="text-xs text-white/60 mt-1">${option.price}</div>
                  )}
                </button>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-white/60 text-center">
                No pairs found
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;