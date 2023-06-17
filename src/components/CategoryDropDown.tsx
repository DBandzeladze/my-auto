import React, { useContext, useEffect, useState } from 'react';
import { Context2 } from '../global';
import { CategoryType } from "../types/types";

interface Option {
  seo_title: string;
  category_id: string;
}


const CategoryDropDown: React.FC<{ categories: CategoryType[] }> = ({ categories }) => {
  const [state, setState] = useContext(Context2);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>(categories.map(({seo_title, category_id})=>({seo_title, category_id: category_id.toString()})));

  useEffect(()=>{
    setIsOpen(false);
    setSearchTerm("");
    setOptions(categories.map(({seo_title, category_id})=>({seo_title, category_id: category_id.toString()})));
  }, [categories])

  useEffect(()=>{
    setSelectedOptions(categories.filter((opt)=>(state[opt.category_id] === 1)).map(({seo_title, category_id})=>({seo_title, category_id: category_id.toString()})));
  }, [state, options, categories]);

  const clearFilter = ()=>{
    let newState = state;
    for (const key in newState){
      newState[key] = 0
    }
    setState(newState);
    setSelectedOptions([]);
  }


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
    const isSelected = selectedOptions.find((selected) => selected.category_id === option.category_id);

    if (isSelected) {
      const updatedOptions = selectedOptions.filter((selected) => selected.category_id !== option.category_id);
      setSelectedOptions(updatedOptions);
      let newState = state;
      newState[parseInt(option.category_id, 10)] = 0;
      setState(newState);
      console.log(state);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      let newState = state;
      newState[parseInt(option.category_id, 10)] = 1;
      setState(newState);
      console.log(state);
    }
  };

  const getSelectedLabels = () => {
    return selectedOptions.map((option) => option.seo_title).join(',');
  };

  const filteredOptions = options.filter((option) =>
    option.seo_title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const placeholderText = selectedOptions.length > 0 ? getSelectedLabels() : 'კატეგორია';

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
            <div key={option.category_id} className="px-4 py-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={state[parseInt(option.category_id, 10)] == 1}
                  // checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="form-checkbox"
                />
                <span className="text-gray-800">{option.seo_title}</span>
              </label>
            </div>
          ))}
          <div>
            {selectedOptions.length !== 0 && (
              <div>
                <hr></hr>
                <button
                  title="clean the filter"
                  onClick={()=>clearFilter()}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
                >
                  Clear Filter
                </button>
                <button title="choose"
                 onClick={()=>setIsOpen(false)}
                  className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">choose</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryDropDown;
