import React, { useContext, useEffect, useState } from "react";
import { Context, Context4 } from "../global";
import { GlobalType, ManufacturerListType, ModelListType } from "../types/types";

interface Option {
  model_name: string;
  model_id: string;
  man_id: number;
}

const ModelDropDown: React.FC<{
    models: ModelListType[];
    mans: GlobalType;
    updateModels: (updatedModels: GlobalType) => void;
  }> = ({ models, mans, updateModels ,}) => {
  const [state, setState] = useContext(Context4);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [manufacturer, SetManufacturer] = useState<ManufacturerListType[]>([]);
  const [options, setOptions] = useState<Option[]>(
    models.map(({ model_name, model_id, man_id }) => ({
      model_name,
      model_id: model_id.toString(),
      man_id,
    }))
  );
  const fetchData = async () => {
    try {
      const response2 = await fetch("https://static.my.ge/myauto/js/mans.json");
      const responseData2 = await response2.json();
      SetManufacturer(responseData2);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    fetchData();
  },[])

  useEffect(() => {
    setIsOpen(false);
    setSearchTerm("");
    setOptions(
      models.map(({ model_name, model_id, man_id }) => ({
        model_name,
        model_id: model_id.toString(),
        man_id,
      }))
    );
  }, [models]);

  useEffect(() => {
    setSelectedOptions(
      models
        .filter((opt) => state[`${opt.man_id}.${opt.model_id}`] === 1)
        .map(({ model_name, model_id, man_id }) => ({
          model_name,
          model_id: model_id.toString(),
          man_id,
        }))
    );
  }, [state, options, models]);

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
      (selected) => selected.model_id === option.model_id
    );

    if (isSelected) {
      const updatedOptions = selectedOptions.filter(
        (selected) => selected.model_id !== option.model_id
      );
      setSelectedOptions(updatedOptions);
      let newState = state;
      newState[`${option.man_id}.${option.model_id}`] = 0;
      setState(newState);
      console.log(state);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      let newState = state;
      newState[`${option.man_id}.${option.model_id}`] = 1;
      setState(newState);
      console.log(state);
    }
  };

  const getSelectedLabels = () => {
    return selectedOptions.map((option) => option.model_name).join(",");
  };

  const filteredOptions = options.filter((option) =>
    option.model_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const placeholderText =
    selectedOptions.length > 0 ? getSelectedLabels() : "მოდელი";

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
            <div key={option.model_id} className="px-4 py-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={state[`${option.man_id}.${option.model_id}`] == 1}
                  // checked={selectedOptions.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="form-checkbox"
                />
                <span className="text-gray-800">{option.model_name}</span>
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ModelDropDown;
