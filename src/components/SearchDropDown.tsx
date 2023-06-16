import React, { useContext, useState } from 'react';
import { Context2 } from '../global';

interface Option {
  label: string;
  value: string;
}

interface SearchDropdownProps {
  options: Option[];
}

const SearchDropdown: React.FC<SearchDropdownProps> = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm(''); // Reset search term when opening/closing the dropdown
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isOpen) {
      setSearchTerm(e.target.value);
    }
  };

  const handleCheckboxChange = (option: Option) => {
    const isSelected = selectedOptions.find((selected) => selected.value === option.value);

    if (isSelected) {
      const updatedOptions = selectedOptions.filter((selected) => selected.value !== option.value);
      setSelectedOptions(updatedOptions);
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const getSelectedLabels = () => {
    return selectedOptions.map((option) => option.label).join('.');
  };

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const placeholderText = selectedOptions.length > 0 ? getSelectedLabels() : 'Search...';

  return (
    <div className="relative">
      <input
        type="text"
        className={`search-bar ${isOpen ? 'active' : ''} border rounded-md px-3 py-2 outline-none w-full`}
        placeholder={placeholderText}
        onClick={handleToggleDropdown}
        value={searchTerm}
        onChange={handleSearchChange}
        readOnly={!isOpen}
      />
      {isOpen && (
        <div className="absolute top-12 left-0 z-10 bg-white border rounded-md shadow-md">
          {filteredOptions.map((option) => (
            <div key={option.value} className="px-4 py-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="form-checkbox"
                />
                <span className="text-gray-800">{option.label}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
