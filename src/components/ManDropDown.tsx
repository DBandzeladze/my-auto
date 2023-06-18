import React, { useEffect, useState } from "react";
import { GlobalType, ManufacturerListType } from "../types/types";

interface Option {
  man_name: string;
  man_id: string;
}

const ManDropDown: React.FC<{ manufacturer: ManufacturerListType[] }> = ({
  manufacturer,
}) => {
  const [manufacturerPotential, setManufacturerPotential] =
    useState<GlobalType>({});
  const [manufacturerChanged, setManufacturerChanged] = useState(0);
  const [toDownload, setToDownload] = useState("");
  const [downloaded, setDownloaded] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>(
    manufacturer.map(({ man_name, man_id }) => ({ man_name, man_id }))
  );

  useEffect(() => {
    setIsOpen(false);
    setSearchTerm("");
    setOptions(
      manufacturer.map(({ man_name, man_id }) => ({ man_name, man_id }))
    );
  }, [manufacturer]);

  useEffect(() => {
    setSelectedOptions(
      manufacturer
        .filter((opt) => manufacturerPotential[opt.man_id] === 1)
        .map(({ man_name, man_id }) => ({ man_name, man_id }))
    );
  }, [manufacturerPotential, options, manufacturer]);

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm(""); // Reset search term when opening/closing the dropdown
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isOpen) {
      setSearchTerm(e.target.value);
    }
  };

  const handleCheckboxChange = (option: Option) => {
    const isSelected = selectedOptions.find(
      (selected) => selected.man_id === option.man_id
    );

    if (isSelected) {
      const updatedOptions = selectedOptions.filter(
        (selected) => selected.man_id !== option.man_id
      );
      setSelectedOptions(updatedOptions);
      let newState = manufacturerPotential;
      newState[option.man_id] = 0;
      setManufacturerPotential(newState);
      setToDownload(option.man_id);
      setManufacturerChanged(manufacturerChanged + 1);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      let newState = manufacturerPotential;
      newState[option.man_id] = 1;
      setManufacturerPotential(newState);
      setToDownload(option.man_id);
      setManufacturerChanged(manufacturerChanged + 1);
    }
  };

  const getSelectedLabels = () => {
    return selectedOptions.map((option) => option.man_name).join(",");
  };

  const filteredOptions = options.filter((option) =>
    option.man_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const placeholderText =
    selectedOptions.length > 0 ? getSelectedLabels() : "მწარმოებელი";

  return (
    <div className="relative">
      <input
        type="text"
        className={`search-bar ${
          isOpen ? "active" : ""
        } border rounded-md px-3 py-2 outline-none w-full`}
        placeholder={placeholderText}
        onClick={handleToggleDropdown}
        value={searchTerm}
        onChange={handleSearchChange}
        readOnly={!isOpen}
      />
      {isOpen && (
        <div className="absolute top-12 left-0 z-10 bg-white border rounded-md shadow-md">
          {filteredOptions.map((option) => (
            <div key={option.man_id} className="px-4 py-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={manufacturerPotential[option.man_id] == 1}
                  // checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="form-checkbox"
                />
                <span className="text-gray-800">{option.man_name}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManDropDown;
