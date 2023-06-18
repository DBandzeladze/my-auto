import React, { useContext, useEffect, useState } from "react";
import { Context2 } from "../global";
import { CategoryType } from "../types/types";

interface Option {
  seo_title: string;
  category_id: string;
}

const CategoryDropDown: React.FC<{ categories: CategoryType[] }> = ({
  categories,
}) => {
  const [state, setState] = useContext(Context2);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>(
    categories.map(({ seo_title, category_id }) => ({
      seo_title,
      category_id: category_id.toString(),
    }))
  );

  useEffect(() => {
    setIsOpen(false);
    setSearchTerm("");
    setOptions(
      categories.map(({ seo_title, category_id }) => ({
        seo_title,
        category_id: category_id.toString(),
      }))
    );
  }, [categories]);

  useEffect(() => {
    setSelectedOptions(
      categories
        .filter((opt) => state[opt.category_id] === 1)
        .map(({ seo_title, category_id }) => ({
          seo_title,
          category_id: category_id.toString(),
        }))
    );
  }, [state, options, categories]);

  const clearFilter = () => {
    let newState = state;
    for (const key in newState) {
      newState[key] = 0;
    }
    setState(newState);
    setSelectedOptions([]);
  };

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
      (selected) => selected.category_id === option.category_id
    );

    if (isSelected) {
      const updatedOptions = selectedOptions.filter(
        (selected) => selected.category_id !== option.category_id
      );
      setSelectedOptions(updatedOptions);
      let newState = state;
      newState[parseInt(option.category_id, 10)] = 0;
      setState(newState);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      let newState = state;
      newState[parseInt(option.category_id, 10)] = 1;
      setState(newState);
    }
  };

  const getSelectedLabels = () => {
    return selectedOptions.map((option) => option.seo_title).join(",");
  };

  const filteredOptions = options.filter((option) =>
    option.seo_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const placeholderText =
    selectedOptions.length > 0 ? getSelectedLabels() : "კატეგორია";

  return (
    <div className="relative">
      <input
        type="text"
        className={`search-bar ${
          isOpen ? "active" : ""
        } w-[198px] text-start hover:border-gray-500 bg-white border py-2 px-4 rounded`}
        placeholder={placeholderText}
        onClick={handleToggleDropdown}
        value={searchTerm}
        onChange={handleSearchChange}
        readOnly={!isOpen}
      />
      {isOpen && (
        <div className="absolute top-12 w-[198px] max-h-[324px] mt-[15px] overflow-y-auto left-0 z-10 bg-white border rounded-md shadow-md">
          {filteredOptions.map((option) => (
            <div key={option.category_id} className="px-4 py-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={state[parseInt(option.category_id, 10)] == 1}
                  // checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="rounded-[4px] w-[16px] h-[16px] accent-custom"
                />
                <span className="text-gray-500 text-[14px] font-normal ml-[12px]">
                  {option.seo_title}
                </span>
              </label>
            </div>
          ))}
          <div>
            {selectedOptions.length !== 0 && (
              <div className="flex flex-row items-center justify-center">
                <div>
                  <hr></hr>
                  <button
                    title="clean the filter"
                    onClick={() => clearFilter()}
                    className="h-[50px] bg-white text-gray-400 text-[12px] py-2 px-4 rounded-md hover:text-black"
                  >
                    ფილტრის გასუფთავება
                  </button>
                </div>
                <div>
                  <hr></hr>
                  <button
                    title="choose"
                    onClick={() => setIsOpen(false)}
                    className="h-[30px] mt-[5px] mb-[15px] mr-[15px] bg-custom text-white text-[12px] py-2 px-4 rounded-[6px]"
                  >
                    არჩევა
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropDown;
