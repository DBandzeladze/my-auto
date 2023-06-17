import React, { useEffect, useState, useContext, ChangeEvent } from 'react';
import CarInfo from './components/CarInfo';
import ManufacturerLst from './components/manufacturerLst';
import { CarInfoDataType } from './types/types';
import { ManufacturerListType, ModelListType } from './types/types';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { CategoryType, GlobalType, GloablRentType, GlobalCategoryType} from './types/types';
import Category from './components/category';
import { Context,Context2, Context3, Context4} from "./global";
import "bootstrap/dist/css/bootstrap.min.css";
import { url } from 'inspector';
import ManModel from './components/manModel';
import { info } from 'console';
import SearchDropdown from './components/SearchDropDown';
import CategoryDropDown from './components/CategoryDropDown';
import ModelDropDown from './components/ModelDropDown';
import ManDropDown from './components/ManDropDown';

// const url = "https://api2.myauto.ge/ka/products/";
const url2 = "https://static.my.ge/myauto/js/mans.json";
const url3 = "https://api2.myauto.ge/ka/cats/get";

function App() {
  const [firstUrl, setFirstUrl] = useState("https://api2.myauto.ge/ka/products/");
  const [dataUrl, setDataUrl] = useState("https://api2.myauto.ge/ka/products/");
  const [rentFilter, setRentFilter] = useContext(Context3);
  const [manFilter, setManFilter] = useContext(Context);
  const [categoryFilter, setCategoryFilter] = useContext(Context2);
  const [modelFilter, setModelFilter] = useContext(Context4)
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CarInfoDataType[]>([]);
  const [manufacturer, SetManufacturer] = useState<ManufacturerListType[]>([]);
  const [categoty, SetCategory] = useState<CategoryType[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null);
  const [fromValue, setFromValue] = useState<number>(NaN);
  const [toValue, setToValue] = useState<number>(NaN);
  const [checkbox1Checked, setCheckbox1Checked] = useState(false);
  const [checkbox2Checked, setCheckbox2Checked] = useState(false);
  const [modelsState, setModelsState] = useState<ModelListType[]>([]);
  const [vehicle, setVehicle] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPages, setMaxPages] = useState<number>(0);
  const [pageClicked, setPageClicked] = useState(0);

  
  const [filteredData, setFilteredData] = useState<CarInfoDataType[]>([]);

//  const [manufacturerPotential, setManufacturerPotential] = useState<GlobalType>({});
//  const [manufacturerChanged, setManufacturerChanged] = useState(0);
//  const [toDownload, setToDownload] = useState("")
//  const [downloaded, setDownloaded] = useState<string[]>([]);
//  const ManufacturerLst1= (Props: ManufacturerListType)=>{
//   const [ischecked, setIschecked] = useState(false);
//   useEffect(() => {
//     // Check if state[Props.category_id] is 1 and set ischecked accordingly
//     setIschecked(manufacturerPotential[Props.man_id] === 1);
//   }, [manufacturerPotential, Props.man_id]);
//     let str1: string = Props.man_id;
//     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//       let str123 = Props.man_id
//         if (event.target.checked) {
//           let newState1 = manufacturerPotential;
//           newState1[Props.man_id] = 1;
//           setIschecked(true);
//           setManufacturerPotential(newState1);
//           setToDownload(Props.man_id);
//           setManufacturerChanged(manufacturerChanged + 1);
//         } else {
//           let newState1 = manufacturerPotential;
//           newState1[Props.man_id] = 0;
//           setIschecked(false);
//           setManufacturerPotential(newState1);
//           setToDownload(Props.man_id);
//           setManufacturerChanged(manufacturerChanged + 1);
//         }
//       };
//     return (
//         <div>
//             <label htmlFor={Props.man_id}><input type="checkbox" checked={ischecked} onChange={handleChange} id= {Props.man_id}></input>{Props.man_name}</label>
//       </div>
//     )
// }
interface Option {
  man_name: string;
  man_id: string;
}
const [manufacturerPotential, setManufacturerPotential] = useState<GlobalType>({});
const [manufacturerChanged, setManufacturerChanged] = useState(0);
const [toDownload, setToDownload] = useState("")
const [downloaded, setDownloaded] = useState<string[]>([]);

const ManDropDown: React.FC<{ manufacturer: ManufacturerListType[] }> = ({ manufacturer }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);
  const [options, setOptions] = useState<Option[]>(manufacturer.map(({man_name, man_id})=>({man_name, man_id})));

  useEffect(()=>{
    setIsOpen(false);
    setSearchTerm("");
    setOptions(manufacturer.map(({man_name, man_id})=>({man_name, man_id})));
  }, [manufacturer])

  useEffect(()=>{
    setSelectedOptions(manufacturer.filter((opt)=>(manufacturerPotential[opt.man_id] === 1)).map(({man_name, man_id})=>({man_name, man_id})));
  }, [manufacturerPotential, options, manufacturer]);

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
    const isSelected = selectedOptions.find((selected) => selected.man_id === option.man_id);

    if (isSelected) {
      const updatedOptions = selectedOptions.filter((selected) => selected.man_id !== option.man_id);
      setSelectedOptions(updatedOptions);
      let newState = manufacturerPotential;
      newState[option.man_id] = 0;
      setManufacturerPotential(newState);
      setToDownload(option.man_id);
      setManufacturerChanged(manufacturerChanged + 1);
      console.log(manufacturerPotential);
    } else {
      setSelectedOptions([...selectedOptions, option]);
      let newState = manufacturerPotential;
      newState[option.man_id] = 1;
      setManufacturerPotential(newState);
      setToDownload(option.man_id);
      setManufacturerChanged(manufacturerChanged + 1);
      console.log(manufacturerPotential);
    }
  };

  const getSelectedLabels = () => {
    return selectedOptions.map((option) => option.man_name).join(',');
  };

  const filteredOptions = options.filter((option) =>
    option.man_name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const clearFilter = ()=>{
    let newState = manufacturerPotential;
    for (const key in newState){
      newState[key] = 0
    }
    setManufacturerPotential(newState);
    setSelectedOptions([]);
  }

  const placeholderText = selectedOptions.length > 0 ? getSelectedLabels() : 'მწარმოებელი';

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
        <div className="absolute top-12 left-0 bg-white border rounded-md shadow-md z-50">
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








const updateModels = (updatedManufacturer: GlobalType) => {
  setManufacturerPotential(updatedManufacturer);
};

const handleVehicle0 = () =>{
  setVehicle(0);
  for (const key in categoryFilter){
    let newState1 = categoryFilter;
    newState1[key] = 0;
    setCategoryFilter(newState1)
  }
  for (const key in manufacturerPotential){
    let newState1 = manufacturerPotential;
    newState1[key] = 0;
    setManufacturerPotential(newState1)
  }
  for (const key in modelFilter){
    let newState1 = modelFilter;
    newState1[key] = 0;
    setModelFilter(newState1)
  }
}
const handleVehicle1 = () =>{
  setVehicle(1);
  for (const key in categoryFilter){
    let newState1 = categoryFilter;
    newState1[key] = 0;
    setCategoryFilter(newState1)
  }
  for (const key in manufacturerPotential){
    let newState1 = manufacturerPotential;
    newState1[key] = 0;
    setManufacturerPotential(newState1)
  }
  for (const key in modelFilter){
    let newState1 = modelFilter;
    newState1[key] = 0;
    setModelFilter(newState1)
  }
}
const handleVehicle2 = () =>{
  setVehicle(2);
  for (const key in categoryFilter){
    let newState1 = categoryFilter;
    newState1[key] = 0;
    setCategoryFilter(newState1)
  }
  for (const key in manufacturerPotential){
    let newState1 = manufacturerPotential;
    newState1[key] = 0;
    setManufacturerPotential(newState1)
  }
  for (const key in modelFilter){
    let newState1 = modelFilter;
    newState1[key] = 0;
    setModelFilter(newState1)
  }
}




  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    setPageClicked(pageClicked + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
    setPageClicked(pageClicked + 1);
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
    setPageClicked(pageClicked + 1);
  }
  const handleLastPage = () => {
    setCurrentPage(maxPages);
    setPageClicked(pageClicked + 1);
  }
  const renderPageButtons = () => {

    const pageButtons = [];
  
    const numButtons = Math.min(7, maxPages);
  
  
  
  
    // Calculate the range of visible page buttons based on the current page
  
    let startPage = currentPage - Math.floor(numButtons / 2);
  
    let endPage = currentPage + Math.floor(numButtons / 2);
  
  
  
  
    if (startPage < 1) {
  
      // Adjust if the start page is less than 1
  
      endPage += Math.abs(startPage) + 1;
  
      startPage = 1;
  
    }
  
  
  
  
    for (let i = startPage; i <= Math.min(endPage, maxPages); i++) {
  
      const isButtonClicked = i === currentPage; // Add this line
  
  
  
  
      pageButtons.push(
  
        <div className='mr-[20px] text-[15px]'>
  
          <button
  
            key={i}
  
            onClick={() => {
  
              setCurrentPage(i);
  
              setPageClicked(pageClicked + 1);
  
            }}
  
            disabled={isButtonClicked} // Replace i === currentPage with isButtonClicked
  
            className={isButtonClicked ? 'text-orange-600' : ''}
  
          >
  
           
  
              {i}
  
           
  
           
  
          </button>
  
        </div>
  
      );
  
    }
  
  
  
  
    return pageButtons;
  
  };

  const handleFromValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setFromValue(newValue);
  };
  const handleToValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setToValue(newValue);
  };
  const sortManfacurer = (manlst: ManufacturerListType[]) => {
    const sortedList = manlst.sort((a, b) => a.man_name.localeCompare(b.man_name));
    return sortedList;
  }
  const handleChangeSale = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        let newState1 = rentFilter;
        newState1["sale"] = 1;
        newState1["rent"] = 0;
        setCheckbox1Checked(true);
        setCheckbox2Checked(false);
        setRentFilter(newState1)
        console.log(rentFilter)
      } else {
        let newState1 = rentFilter;
        newState1["sale"] = 0;
        setCheckbox1Checked(false);
        setRentFilter(newState1)
        console.log(rentFilter)
      }
    };
    const handleChangeRent = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        let newState1 = rentFilter;
        newState1["rent"] = 1;
        newState1["sale"] = 0;
        setCheckbox1Checked(false);
        setCheckbox2Checked(true);
        setRentFilter(newState1)
        console.log(rentFilter)
      } else {
        let newState1 = rentFilter;
        newState1["rent"] = 0;
        setCheckbox2Checked(false);
        setRentFilter(newState1)
        console.log(rentFilter)
      }
    };
  const FilteringUrl = (indicator: number) =>{
    let from :string = "" 
    if (isNaN(fromValue)){
      from = ""
    }
    else{
      from = `${fromValue}`
    }
    let to :string = "" 
    if (isNaN(toValue)){
      to = ""
    }
    else{
      to = `${toValue}`
    }
    let rent : string = "";
    if (rentFilter["rent"] === 1){
      rent = "1";
    }else if (rentFilter["sale"] === 1){
      rent = "0";
    }
    let sortopt :string = ""
    if (selectedSortOption != null){
      sortopt = selectedSortOption;
    }
    let periodopt: string = "";
    if (selectedPeriod != null){
      periodopt = selectedPeriod;
    }
    let catOpt: string = "";
    for (const key in categoryFilter){
      if (categoryFilter[key]=== 1){
        catOpt = catOpt + key + ".";
      }
    }
    if (catOpt !== ""){
      catOpt = catOpt.slice(0, -1);
    }
    let manOpt: string = ""
    for (const key in manufacturerPotential){
      if (manufacturerPotential[key]===1){
        manOpt = manOpt + key;
        for (const key2 in modelFilter){
          const parts = key2.split(".", 2);
          if (parts[0] === key && modelFilter[key2] === 1){
            manOpt = manOpt + "."+ parts[1]
          }
        }
        manOpt = manOpt + "-";
      }
    }
    if (manOpt !== ""){
      manOpt = manOpt.slice(0, -1);
    }
    let newUrl: string = `${firstUrl}?Page=${currentPage}&PriceFrom=${from}&PriceTo=${to}&ForRent=${rent}&SortOrder=${sortopt}&Period=${periodopt}&Cats=${catOpt}&Mans=${manOpt}`;
    if ((indicator === 1) && newUrl !== dataUrl){
      newUrl = `${firstUrl}?Page=1&PriceFrom=${from}&PriceTo=${to}&ForRent=${rent}&SortOrder=${sortopt}&Period=${periodopt}&Cats=${catOpt}&Mans=${manOpt}`;
      setCurrentPage(1);
    }
    console.log(newUrl)
    setDataUrl(newUrl)
  }
  
  const fetchData = async () => {
    setLoading(true);
    try {
      // const response1 = await fetch(url);
      const response2 = await fetch(url2);
      const response3 = await fetch(url3);
      // const responseData = await response1.json();
      const responseData2 = await response2.json();
      const responseData3 = await response3.json();
      setLoading(false);
      // setData(responseData.data.items);
      // setFilteredData(responseData.data.items)
      SetManufacturer(sortManfacurer(responseData2));
      SetCategory(responseData3.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const fetchData1 = async () => {
    setLoading(true);
    try {
      const response1 = await fetch(dataUrl);
      const responseData = await response1.json();
      setLoading(false);
      setData(responseData.data.items);
      setFilteredData(responseData.data.items)
      setMaxPages(responseData.data.meta.last_page)
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const fetchModel = async () => {
    console.log("fetching");
    if (downloaded.includes(toDownload) === false){
      try {
        const response = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${toDownload}`);
        const responseData = await response.json();
        setModelsState([...modelsState,...responseData.data]);
        setDownloaded([...downloaded, toDownload])
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    fetchData1();
  }, [dataUrl])

  useEffect(()=>{
    FilteringUrl(2);
  }, [pageClicked, selectedSortOption, selectedPeriod])

  useEffect(() => {
    fetchModel();
  }, [manufacturerChanged]);

  useEffect(()=>{
    console.log("changed")
  }, [rentFilter, manFilter, categoryFilter, modelFilter, Context])
  
  const handlePeriodFilter = (period: string) => {
    setSelectedPeriod(period);
  };
  const handleSortOption = (option: string) => {
    setSelectedSortOption(option);
  };

  if (loading) {
    return <main>Loading</main>;
  }

  const svgStyle = {
    fill: vehicle === 0 ? '#FD4100' : '#8c929b',
  };

  const svgStyle1 = {
    fill: vehicle === 1 ? '#FD4100' : '#8c929b',
  };

  const svgStyle2 = {
    fill: vehicle === 2 ? '#FD4100' : '#8c929b',
  };


  return (
    <div className='flex justify-center flex-col bg-gray-100'>
      <div className='pb-[20px] pt-[20px] pl-[178px] bg-white mb-[40px]'>

<svg width="161" height="46" viewBox="0 0 161 46" fill="none" xmlns="http://www.w3.org/2000/svg">

<g clip-path="url(#clip0_1_783)">

<path d="M134.703 23.5896C134.696 29.0116 132.543 34.2089 128.718 38.0401C124.893 41.8714 119.708 44.0233 114.302 44.0233H24.0645C18.6582 44.0248 13.4725 41.8734 9.64707 38.0418C5.82159 34.2102 3.66935 29.012 3.66333 23.5896V22.4104C3.67086 16.989 5.82376 11.7922 9.64907 7.9619C13.4744 4.13156 18.6592 1.98091 24.0645 1.98242H114.302C119.707 1.98242 124.891 4.13355 128.716 7.96356C132.541 11.7936 134.694 16.9894 134.703 22.4104V23.5896Z" fill="white"/>

<path d="M138.702 7.25748e-07H22.2698C16.3614 0.00604003 10.697 2.36439 6.52128 6.55689C2.34554 10.7494 -3.06818e-06 16.4331 0 22.3591L0 23.6409C0 29.5709 2.34867 35.258 6.52932 39.4512C10.71 43.6443 16.3801 46 22.2925 46H138.725C144.634 45.9955 150.3 43.6378 154.477 39.4451C158.654 35.2525 161 29.5679 161 23.6409V22.3591C161 19.4224 160.423 16.5145 159.303 13.8013C158.182 11.0882 156.539 8.62314 154.469 6.54682C152.398 4.47051 149.94 2.82367 147.235 1.70035C144.529 0.577036 141.63 -0.000747484 138.702 7.25748e-07ZM117.074 23.4985C117.068 28.0975 115.242 32.506 111.997 35.7553C108.752 39.0047 104.353 40.829 99.7681 40.8275H23.2353C18.651 40.8275 14.254 39.0025 11.0103 35.7533C7.76656 32.5041 5.94122 28.0965 5.9352 23.4985V22.5015C5.94122 17.9035 7.76656 13.4959 11.0103 10.2467C14.254 6.99751 18.651 5.1725 23.2353 5.17251H99.7681C104.353 5.17099 108.752 6.99533 111.997 10.2447C115.242 13.494 117.068 17.9025 117.074 22.5015V23.4985Z" fill="#FD4100"/>

<path d="M125.724 26.9221C125.714 27.4945 125.482 28.0407 125.079 28.4455C124.675 28.8503 124.131 29.0823 123.56 29.0925C122.986 29.0925 122.436 28.8638 122.03 28.4568C121.624 28.0498 121.396 27.4977 121.396 26.9221C121.396 26.3465 121.624 25.7944 122.03 25.3874C122.436 24.9804 122.986 24.7517 123.56 24.7517C124.131 24.7619 124.675 24.9939 125.079 25.3987C125.482 25.8036 125.714 26.3497 125.724 26.9221Z" fill="white"/>

<path d="M138.372 16.9644C137.388 17.1779 136.381 17.2716 135.374 17.2436C136.981 17.9386 137.759 18.8842 137.759 20.5248C137.759 22.9743 135.765 24.7517 132.488 24.7517C132.006 24.7651 131.523 24.7192 131.051 24.615C130.919 24.684 130.808 24.7878 130.73 24.9152C130.652 25.0427 130.61 25.1889 130.608 25.3384C130.608 25.7258 130.773 26.0904 131.994 26.0904H133.931C136.873 26.0904 138.759 27.6456 138.759 29.759C138.759 32.3737 136.43 33.9574 132.102 33.9574C127.774 33.9574 126.388 32.7041 126.116 30.6192C126.106 30.5266 126.116 30.433 126.145 30.3447C126.175 30.2563 126.222 30.1752 126.285 30.1068C126.348 30.0383 126.425 29.9841 126.51 29.9477C126.595 29.9113 126.688 29.8936 126.78 29.8957H128.887C129.031 29.8946 129.171 29.9441 129.282 30.0358C129.393 30.1274 129.469 30.2553 129.495 30.397C129.666 31.149 130.33 31.4566 132.216 31.4566C134.431 31.4566 134.931 30.8413 134.931 30.0381C134.931 29.2349 134.431 28.7849 133.159 28.7849H131.324C128.552 28.7849 127.445 27.6456 127.445 26.2841C127.475 25.7896 127.627 25.3103 127.885 24.8881C128.143 24.466 128.501 24.114 128.927 23.863C127.314 22.9971 126.655 21.8863 126.655 20.2457C126.655 17.3974 128.927 15.603 132.204 15.603C134.043 15.7026 135.871 15.2674 137.469 14.3497C137.556 14.3082 137.65 14.2853 137.746 14.2825C137.842 14.2797 137.938 14.2972 138.026 14.3337C138.115 14.3702 138.195 14.4249 138.262 14.4944C138.328 14.5639 138.38 14.6465 138.412 14.7371L138.855 16.1327C138.882 16.2199 138.889 16.3117 138.878 16.4021C138.867 16.4926 138.838 16.5797 138.791 16.658C138.745 16.7363 138.682 16.8039 138.608 16.8567C138.534 16.9095 138.45 16.9462 138.361 16.9644H138.372ZM130.376 20.1944C130.376 21.5844 131.148 22.3306 132.312 22.3306C133.477 22.3306 134.198 21.5844 134.198 20.1374C134.198 18.6905 133.59 18.0753 132.312 18.0753C131.176 18.0753 130.376 18.8842 130.376 20.1944Z" fill="white"/>

<path d="M151.015 23.4472H143.194C143.416 25.7258 144.529 26.3354 146.08 26.3354C146.967 26.3167 147.831 26.0483 148.573 25.5606C148.713 25.4729 148.881 25.4384 149.044 25.4635C149.208 25.4886 149.357 25.5715 149.465 25.6973L150.237 26.774C150.292 26.8454 150.332 26.9276 150.354 27.0153C150.375 27.103 150.378 27.1943 150.363 27.2833C150.347 27.3723 150.314 27.4571 150.264 27.5322C150.214 27.6073 150.148 27.6712 150.072 27.7196C148.782 28.6042 147.256 29.0787 145.693 29.0811C141.473 29.0811 139.366 26.3524 139.366 22.4047C139.366 18.5937 141.422 15.5688 145.25 15.5688C148.851 15.5688 151.072 17.9614 151.072 22.0515C151.083 22.5061 151.064 22.9609 151.015 23.413V23.4472ZM147.409 20.9919C147.358 19.283 146.841 18.0696 145.358 18.0696C144.08 18.0696 143.359 18.8785 143.194 21.1571H147.409V20.9919Z" fill="white"/>

<path d="M37.4343 19.9666V29.4229C37.4359 29.5109 37.4197 29.5982 37.3869 29.6798C37.354 29.7613 37.3052 29.8354 37.2431 29.8976C37.1811 29.9598 37.1073 30.0089 37.0259 30.0418C36.9446 30.0748 36.8575 30.091 36.7698 30.0894H33.9982C33.91 30.0917 33.8223 30.0761 33.7403 30.0435C33.6583 30.0109 33.5838 29.962 33.5212 29.8997C33.4585 29.8374 33.4091 29.7631 33.3759 29.6811C33.3427 29.5992 33.3264 29.5113 33.328 29.4229V20.69C33.328 19.2146 32.8282 18.8272 32.1921 18.8272C31.3628 18.8272 30.6983 19.4937 30.1417 20.6388V29.4229C30.136 29.5979 30.0642 29.7641 29.9408 29.8879C29.8174 30.0117 29.6516 30.0837 29.4772 30.0894H26.6374C26.4692 30.0806 26.3111 30.0057 26.1974 29.881C26.0837 29.7563 26.0235 29.5918 26.0297 29.4229V20.69C26.0297 19.2146 25.4617 18.8272 24.8086 18.8272C23.9737 18.8272 23.3091 19.4937 22.7014 20.6388V29.4229C22.7061 29.5923 22.6446 29.7568 22.53 29.8814C22.4154 30.0059 22.2568 30.0806 22.088 30.0894H19.2482C19.0742 30.0824 18.9092 30.0099 18.7861 29.8864C18.663 29.7629 18.5907 29.5974 18.5837 29.4229V16.8904C18.592 16.7163 18.6647 16.5516 18.7875 16.4283C18.9104 16.3051 19.0747 16.2322 19.2482 16.2239H21.6337C21.7892 16.2221 21.9394 16.2802 22.0535 16.3861C22.1676 16.4921 22.2369 16.6379 22.2471 16.7936L22.4686 17.9329C22.9086 17.2836 23.5018 16.7535 24.1954 16.3897C24.8891 16.026 25.6616 15.8398 26.4443 15.8479C27.1487 15.8147 27.8453 16.0071 28.4334 16.3973C29.0215 16.7875 29.4706 17.3552 29.7157 18.0183C30.1665 17.3441 30.7772 16.7928 31.493 16.414C32.2087 16.0351 33.0071 15.8406 33.8164 15.8479C35.9804 15.8479 37.423 17.3746 37.423 19.9893" fill="#414042"/>

<path d="M48.1972 30.1179C47.1408 33.4276 44.9768 35.4328 41.0409 35.8145C40.8707 35.8309 40.7007 35.7808 40.5664 35.6747C40.432 35.5686 40.3436 35.4146 40.3196 35.2448L40.0981 33.6099C40.0698 33.4476 40.1065 33.2807 40.2 33.1453C40.2935 33.0099 40.4365 32.9169 40.5979 32.8864C42.4835 32.5503 43.4377 31.9408 44.0908 30.773C43.821 30.6314 43.5818 30.4377 43.3869 30.2031C43.1919 29.9685 43.0451 29.6975 42.9549 29.4058L39.0984 17.0898C39.0624 16.9924 39.0505 16.8876 39.064 16.7846C39.0775 16.6816 39.1158 16.5834 39.1757 16.4986C39.2356 16.4139 39.3152 16.345 39.4077 16.2981C39.5001 16.2513 39.6026 16.2277 39.7062 16.2296H42.6482C42.8016 16.2325 42.9498 16.2859 43.0699 16.3816C43.19 16.4774 43.2753 16.6101 43.3127 16.7594L45.6414 27.4405L48.2767 16.7423C48.3078 16.6099 48.3792 16.4906 48.4809 16.4008C48.5827 16.3109 48.7098 16.2551 48.8447 16.241H51.6845C51.7867 16.2402 51.8877 16.2639 51.9789 16.3101C52.0702 16.3564 52.1491 16.4239 52.2092 16.5069C52.2692 16.5899 52.3085 16.6862 52.324 16.7876C52.3394 16.8889 52.3304 16.9926 52.2979 17.0898L48.1972 30.1179Z" fill="#414042"/>

<path d="M65.6109 28.2836L65.0429 29.9527C64.992 30.0987 64.8925 30.2226 64.7611 30.3035C64.6297 30.3845 64.4745 30.4175 64.3216 30.397C63.7301 30.3652 63.1589 30.1694 62.6716 29.8315C62.1843 29.4936 61.8 29.0268 61.5613 28.483C61.1102 29.1657 60.4882 29.7176 59.7576 30.0835C59.027 30.4494 58.2134 30.6165 57.3982 30.5679C54.6833 30.5679 52.9056 28.7564 52.9056 26.2271C52.9056 23.225 55.1775 21.5844 59.3974 21.5844H60.7719V20.9407C60.7719 19.3001 60.1585 18.7988 58.4432 18.7988C57.4218 18.8452 56.4121 19.037 55.4444 19.3684C55.2794 19.4115 55.1044 19.3931 54.9519 19.3166C54.7994 19.2402 54.6798 19.1108 54.6152 18.9526L54.1154 17.4487C54.0589 17.2817 54.0701 17.0991 54.1466 16.9403C54.2231 16.7815 54.3588 16.6593 54.5243 16.5999C56.0133 16.1157 57.5654 15.8546 59.1305 15.8251C63.1062 15.8251 64.8442 17.4942 64.8442 20.7185V26.0904C64.8442 26.8936 65.0089 27.3095 65.344 27.5601C65.4611 27.6353 65.5512 27.746 65.6013 27.8761C65.6514 28.0062 65.6587 28.149 65.6223 28.2836H65.6109ZM60.7719 26.2556V23.8061H59.7723C57.8866 23.8061 57.0006 24.4726 57.0006 25.8397C57.0006 26.9791 57.6083 27.5886 58.6079 27.5886C59.0553 27.5843 59.493 27.4579 59.8742 27.2231C60.2554 26.9883 60.5657 26.6538 60.7719 26.2556Z" fill="#414042"/>

<path d="M79.2476 30.0894H76.919C76.8411 30.0949 76.763 30.0842 76.6894 30.0581C76.6158 30.0319 76.5484 29.9908 76.4914 29.9374C76.4344 29.8839 76.389 29.8192 76.358 29.7474C76.327 29.6755 76.3111 29.5981 76.3113 29.5198L76.1466 28.3804C75.7124 29.0872 75.097 29.664 74.3647 30.0508C73.6324 30.4376 72.81 30.6201 71.9834 30.5793C69.4333 30.5793 68.161 28.9102 68.161 26.21V16.9075C68.1603 16.8198 68.1769 16.7328 68.2101 16.6516C68.2432 16.5703 68.2921 16.4966 68.354 16.4345C68.4158 16.3725 68.4894 16.3234 68.5704 16.2902C68.6513 16.257 68.7381 16.2402 68.8255 16.241H71.5972C71.7708 16.2493 71.935 16.3222 72.0579 16.4454C72.1808 16.5687 72.2534 16.7334 72.2617 16.9075V25.6689C72.2617 27.0588 72.7047 27.4747 73.5907 27.4747C74.4768 27.4747 75.2037 26.905 75.8115 25.8682V16.9075C75.8107 16.8198 75.8274 16.7328 75.8605 16.6516C75.8936 16.5703 75.9426 16.4966 76.0044 16.4345C76.0663 16.3725 76.1398 16.3234 76.2208 16.2902C76.3018 16.257 76.3885 16.2402 76.476 16.241H79.2476C79.3356 16.2395 79.4229 16.2556 79.5046 16.2885C79.5862 16.3214 79.6604 16.3703 79.7229 16.4325C79.7854 16.4946 79.8348 16.5686 79.8683 16.6502C79.9017 16.7318 79.9186 16.8193 79.9178 16.9075V29.44C79.9194 29.5285 79.9031 29.6163 79.8699 29.6982C79.8367 29.7802 79.7873 29.8545 79.7247 29.9168C79.662 29.9791 79.5875 30.028 79.5055 30.0606C79.4235 30.0932 79.3358 30.1088 79.2476 30.1065" fill="#414042"/>

<path d="M91.7258 28.8988C91.7671 28.9749 91.7929 29.0585 91.8016 29.1447C91.8102 29.2309 91.8016 29.318 91.7762 29.4008C91.7508 29.4836 91.7091 29.5605 91.6536 29.6269C91.5982 29.6933 91.53 29.7479 91.4531 29.7875C90.4702 30.2786 89.3877 30.5359 88.2896 30.5394C85.2396 30.5394 83.7459 28.7849 83.7459 25.5321V19.1348H82.468C82.3789 19.1387 82.2899 19.1243 82.2066 19.0924C82.1233 19.0605 82.0474 19.0119 81.9835 18.9494C81.9196 18.887 81.8692 18.8121 81.8353 18.7293C81.8014 18.6466 81.7848 18.5578 81.7864 18.4683V16.9075C81.7849 16.8195 81.801 16.7322 81.8339 16.6506C81.8667 16.569 81.9156 16.4949 81.9776 16.4327C82.0396 16.3705 82.1135 16.3215 82.1948 16.2886C82.2761 16.2556 82.3633 16.2394 82.4509 16.241H83.7232V13.8484C83.7333 13.6835 83.7999 13.5271 83.9116 13.4056C84.0234 13.2842 84.1735 13.2052 84.3366 13.1819L87.1082 12.88C87.1988 12.8667 87.2911 12.8734 87.3789 12.8996C87.4666 12.9257 87.5476 12.9707 87.6162 13.0314C87.6848 13.0921 87.7395 13.1671 87.7763 13.2511C87.8132 13.3352 87.8313 13.4262 87.8295 13.518V16.241H90.3059C90.3963 16.2502 90.4837 16.2784 90.5625 16.3237C90.6413 16.3691 90.7098 16.4306 90.7633 16.5042C90.8169 16.5778 90.8544 16.6619 90.8735 16.751C90.8925 16.8401 90.8926 16.9322 90.8738 17.0214L90.6523 18.5766C90.6268 18.7351 90.5459 18.8793 90.4242 18.9837C90.3025 19.088 90.1479 19.1456 89.9878 19.1462H87.8239V25.4751C87.8239 26.8082 88.2669 27.281 89.1586 27.281C89.4825 27.2795 89.8029 27.2136 90.1014 27.0873C90.2533 27.0289 90.4212 27.0279 90.5738 27.0845C90.7263 27.1411 90.8532 27.2514 90.9306 27.3949L91.7258 28.8988Z" fill="#414042"/>

<path d="M105.925 23.1965C105.925 27.6171 103.375 30.5394 99.1604 30.5394C94.9461 30.5394 92.3959 27.8108 92.3959 23.168C92.3959 18.7475 94.9461 15.8251 99.1604 15.8251C103.375 15.8251 105.925 18.5253 105.925 23.1965ZM96.667 23.1965C96.667 26.2556 97.4962 27.5373 99.1604 27.5373C100.824 27.5373 101.659 26.1986 101.659 23.225C101.659 20.1375 100.824 18.8557 99.1604 18.8557C97.4962 18.8557 96.667 20.1887 96.667 23.1965Z" fill="#414042"/>

</g>

<defs>

<clipPath id="clip0_1_783">

<rect width="161" height="46" fill="white"/>

</clipPath>

</defs>

</svg>




</div>
      <div className="flex flex-no-wrap justify-center">
        
          <div className='flex flex-col mr-20 h-[385px] p-[20px]'>  {/* marjvena mxare */}
          <div className='flex flex-row items-center mb-[20px]'>




              <div className='text-[12px] text-gray-500 mr-[10px]'>

                მთავარი

              </div>




              <div className='mr-[10px]'>

              <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">

              <path d="M1.2038 1L4.2038 4L1.2038 7" stroke="#6F7383" stroke-linecap="round" stroke-linejoin="round"/>

              </svg>

              </div>




              <div className='text-[12px] text-gray-500 mr-[10px]'>

                ძიება

              </div>




              <div className='mr-[10px]'>

              <svg width="5" height="8" viewBox="0 0 5 8" fill="none" xmlns="http://www.w3.org/2000/svg">

              <path d="M1.2038 1L4.2038 4L1.2038 7" stroke="#6F7383" stroke-linecap="round" stroke-linejoin="round"/>

              </svg>

              </div>




              <div className='text-custom'>

                იყიდება

              </div>

           </div>
          
           <div>
              <div className='flex flex-row justify-evenly items-center pt-[10px] pb-[10px] bg-gray-100 w-[240px] h-[48px]'>
                      <div className='flex items-center justify-center w-[83px] h-[48px]  hover:bg-white rounded-ss-[10px] border border-gray-300 bg-gray-50'>
                      <button onClick={()=>handleVehicle0()}>
                          <svg width="30" height="15" viewBox="0 0 30 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.719 10.973C19.7021 10.3542 19.8701 9.74436 20.2016 9.22153C20.5332 8.69871 21.0131 8.28664 21.58 8.03801C22.147 7.78939 22.7752 7.7155 23.3843 7.82581C23.9935 7.93611 24.5559 8.22559 24.9997 8.65724C25.4434 9.08888 25.7484 9.64307 25.8755 10.2489C26.0026 10.8548 25.9462 11.4848 25.7133 12.0585C25.4805 12.6321 25.0819 13.1232 24.5684 13.4691C24.055 13.8149 23.4501 13.9998 22.831 14C22.4278 14.006 22.0274 13.9323 21.6527 13.7834C21.278 13.6344 20.9363 13.413 20.6473 13.1319C20.3582 12.8507 20.1275 12.5153 19.9682 12.1449C19.8089 11.7744 19.7242 11.3762 19.719 10.973ZM21.89 10.973C21.8846 11.1599 21.9351 11.3442 22.0351 11.5023C22.135 11.6604 22.2798 11.785 22.4509 11.8604C22.6221 11.9357 22.8118 11.9583 22.9959 11.9252C23.18 11.8921 23.35 11.8049 23.4842 11.6746C23.6184 11.5444 23.7107 11.3771 23.7493 11.1942C23.788 11.0112 23.7711 10.8209 23.701 10.6475C23.6309 10.4741 23.5106 10.3256 23.3557 10.221C23.2007 10.1163 23.018 10.0603 22.831 10.06C22.5855 10.0571 22.3487 10.1515 22.1726 10.3225C21.9965 10.4936 21.8952 10.7275 21.891 10.973H21.89ZM4.262 10.973C4.26774 10.57 4.35282 10.1721 4.51239 9.802C4.67195 9.4319 4.90288 9.09687 5.19197 8.81604C5.48106 8.53522 5.82265 8.3141 6.19722 8.16533C6.5718 8.01656 6.97201 7.94306 7.375 7.94901C7.78033 7.93624 8.18409 8.00505 8.56231 8.15136C8.94054 8.29766 9.28551 8.51847 9.57674 8.80067C9.86797 9.08287 10.0995 9.42072 10.2577 9.79415C10.4158 10.1676 10.4973 10.569 10.4973 10.9745C10.4973 11.38 10.4158 11.7814 10.2577 12.1549C10.0995 12.5283 9.86797 12.8661 9.57674 13.1483C9.28551 13.4306 8.94054 13.6514 8.56231 13.7977C8.18409 13.944 7.78033 14.0128 7.375 14C6.97188 14.0057 6.57159 13.9319 6.197 13.7828C5.82241 13.6338 5.48086 13.4124 5.19186 13.1313C4.90286 12.8502 4.67208 12.5149 4.5127 12.1445C4.35333 11.7742 4.26848 11.3761 4.263 10.973H4.262ZM6.434 10.973C6.42883 11.1597 6.47943 11.3436 6.57932 11.5014C6.67922 11.6591 6.82388 11.7835 6.99482 11.8586C7.16576 11.9338 7.35522 11.9562 7.53899 11.9232C7.72276 11.8901 7.8925 11.803 8.02651 11.6729C8.16052 11.5429 8.25273 11.3759 8.29134 11.1932C8.32996 11.0105 8.31323 10.8205 8.24329 10.6473C8.17336 10.4742 8.0534 10.3258 7.89873 10.2212C7.74407 10.1166 7.56172 10.0605 7.375 10.06C7.12954 10.0573 6.89297 10.1518 6.71689 10.3228C6.5408 10.4939 6.43947 10.7276 6.435 10.973H6.434ZM26.761 11.349C26.7806 11.2278 26.7937 11.1056 26.8 10.983C26.7678 9.98498 26.3487 9.0386 25.6313 8.34399C24.914 7.64939 23.9545 7.26102 22.956 7.26102C21.9575 7.26102 20.998 7.64939 20.2807 8.34399C19.5633 9.0386 19.1442 9.98498 19.112 10.983C19.1182 11.1056 19.1312 11.2278 19.151 11.349H11.051C11.0703 11.2278 11.083 11.1056 11.089 10.983C11.0809 10.4861 10.975 9.99558 10.7774 9.53957C10.5797 9.08356 10.2941 8.67096 9.937 8.32533C9.57985 7.97969 9.15811 7.7078 8.69587 7.52519C8.23363 7.34257 7.73994 7.2528 7.243 7.26101C6.24014 7.2455 5.27213 7.62866 4.55158 8.32634C3.83102 9.02402 3.41684 9.97917 3.4 10.982C3.40636 11.1046 3.41904 11.2267 3.438 11.348H0.509C0.443171 11.3492 0.377754 11.3374 0.316505 11.3132C0.255257 11.2891 0.199382 11.2531 0.152089 11.2072C0.104795 11.1614 0.0670144 11.1067 0.0409149 11.0463C0.0148153 10.9858 0.000910982 10.9208 0 10.855L0 8.94201C0.00184142 8.83768 0.0449894 8.73835 0.119978 8.6658C0.194967 8.59325 0.295672 8.5534 0.4 8.55501V7.11101C0.403745 6.78367 0.517389 6.46709 0.722682 6.21211C0.927976 5.95712 1.21301 5.77853 1.532 5.70501L6.716 4.45301L10.568 1.45301C11.7883 0.508844 13.2881 -0.00235085 14.831 8.73995e-06H21.738C22.176 -0.0013529 22.5996 0.15643 22.93 0.444009L26.33 3.40901L27.423 3.35101C27.7962 3.3263 28.1649 3.4434 28.4554 3.67887C28.746 3.91434 28.9369 4.25082 28.99 4.62101L29.49 8.55801C29.5559 8.55668 29.6214 8.56841 29.6828 8.5925C29.7442 8.6166 29.8002 8.65259 29.8476 8.69841C29.895 8.74423 29.9328 8.79897 29.959 8.85949C29.9852 8.92 29.9991 8.98509 30 9.05101V10.851C29.9992 10.917 29.9854 10.9822 29.9593 11.0428C29.9332 11.1035 29.8953 11.1583 29.8479 11.2043C29.8005 11.2502 29.7445 11.2863 29.683 11.3104C29.6216 11.3346 29.556 11.3463 29.49 11.345L26.761 11.349ZM11.448 2.75501L9.6 4.19101L19.237 3.71901V1.54901H14.984C13.704 1.54637 12.4596 1.97076 11.448 2.75501ZM20.842 3.63801L24.024 3.48201L22.057 1.76901C21.8942 1.62689 21.6851 1.54902 21.469 1.55001H20.843L20.842 3.63801Z" style={svgStyle}/>
                          </svg>
                      </button>
                      </div>


                      <div className='flex items-center justify-center w-[83px] h-[48px]  hover:bg-white  border-t border-b border-gray-300 bg-gray-50'>
                      <button className='flex items-center justify-center' onClick={()=>handleVehicle1()}>
                          <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M7.735 14.2707C7.69898 13.2695 7.27574 12.3213 6.55438 11.6257C5.83302 10.9301 4.86981 10.5414 3.8675 10.5414C2.86519 10.5414 1.90198 10.9301 1.18062 11.6257C0.459259 12.3213 0.0360213 13.2695 0 14.2707C0.0360213 15.2719 0.459259 16.2201 1.18062 16.9157C1.90198 17.6113 2.86519 18 3.8675 18C4.86981 18 5.83302 17.6113 6.55438 16.9157C7.27574 16.2201 7.69898 15.2719 7.735 14.2707V14.2707ZM4.513 14.2707C4.51779 14.3992 4.48404 14.5262 4.41609 14.6353C4.34815 14.7445 4.2491 14.8308 4.13169 14.8833C4.01427 14.9358 3.88384 14.9519 3.75716 14.9298C3.63047 14.9076 3.51331 14.848 3.42073 14.7588C3.32815 14.6696 3.26437 14.5547 3.23759 14.429C3.2108 14.3032 3.22224 14.1724 3.27043 14.0532C3.31862 13.934 3.40135 13.8319 3.50801 13.7601C3.61467 13.6882 3.74038 13.6499 3.869 13.65C4.03655 13.6473 4.19832 13.7112 4.31885 13.8275C4.43939 13.9439 4.50884 14.1033 4.512 14.2707H4.513ZM22 13.0303C21.9742 11.6885 21.4166 10.4119 20.4496 9.48091C19.4826 8.54994 18.1854 8.04083 16.843 8.06545C15.5011 8.0411 14.2044 8.55022 13.2378 9.48097C12.2712 10.4117 11.7138 11.688 11.688 13.0293C11.7135 14.3706 12.2708 15.6469 13.2375 16.5775C14.2042 17.5082 15.5011 18.017 16.843 17.9921C18.1849 18.017 19.4819 17.5084 20.4488 16.578C21.4158 15.6476 21.9737 14.3716 22 13.0303V13.0303ZM18.778 13.0303C18.7685 13.5338 18.5594 14.013 18.1965 14.3624C17.8336 14.7118 17.3468 14.9028 16.843 14.8934C16.3394 14.9025 15.8528 14.7114 15.4901 14.362C15.1275 14.0126 14.9185 13.5336 14.909 13.0303C14.919 12.5273 15.1282 12.0487 15.4908 11.6998C15.8534 11.3509 16.3397 11.16 16.843 11.1691C17.3464 11.1597 17.833 11.3505 18.1958 11.6994C18.5586 12.0484 18.768 12.5271 18.778 13.0303V13.0303ZM10.4 14.8934V13.0303H8.863C8.9697 13.4352 9.02415 13.852 9.025 14.2707C9.0256 14.4783 9.01224 14.6857 8.985 14.8914L10.4 14.8934ZM17.489 13.0303C17.4938 12.9019 17.4601 12.775 17.3922 12.6659C17.3244 12.5568 17.2254 12.4704 17.1081 12.4179C16.9908 12.3654 16.8605 12.3491 16.7339 12.3711C16.6073 12.3931 16.4901 12.4525 16.3974 12.5415C16.3048 12.6305 16.2409 12.7452 16.2138 12.8708C16.1868 12.9964 16.198 13.1272 16.2459 13.2464C16.2937 13.3657 16.3762 13.4679 16.4826 13.54C16.589 13.612 16.7145 13.6507 16.843 13.651C17.0109 13.6539 17.1732 13.5903 17.2942 13.474C17.4153 13.3576 17.4853 13.1981 17.489 13.0303V13.0303ZM10.529 11.7898C10.8563 10.3662 11.6612 9.09746 12.8099 8.19443C13.9585 7.29141 15.3817 6.80851 16.843 6.826C18.3304 6.82407 19.775 7.32382 20.943 8.24437L21.764 7.28679C20.4674 6.26889 18.8869 5.67796 17.2403 5.59544C15.5937 5.51291 13.962 5.94284 12.57 6.826H3.864C3.19403 6.81528 2.54707 7.07013 2.06455 7.53483C1.58202 7.99954 1.30319 8.6363 1.289 9.30591V9.97361C2.07704 9.53427 2.96467 9.30437 3.867 9.30591C4.7621 9.30064 5.64341 9.52642 6.42563 9.9614C7.20785 10.3964 7.86449 11.0258 8.332 11.7888L10.529 11.7898ZM6.446 5.58454V3.72336C6.43602 3.22034 6.22676 2.74184 5.86416 2.3929C5.50156 2.04395 5.01525 1.85308 4.512 1.86218V3.09864C4.67981 3.09569 4.84195 3.15938 4.96286 3.27574C5.08377 3.3921 5.15358 3.55163 5.157 3.71936V5.58454H6.446ZM12.2 5.58454C14.1898 4.44004 16.5323 4.07054 18.778 4.547L18.778 1.24045H20.066V-3.33859e-07H9.752V1.24045H10.874L9.69 5.58454H12.2Z" style={svgStyle1}/>
                          </svg>
                      </button>
                        <div>
              
                        </div>  
                      </div>

                      <div className='flex items-center justify-center w-[83px] h-[48px] hover:bg-white  rounded-se-[10px] border border-gray-300 bg-gray-50'>
                      <button className='' onClick={()=>handleVehicle2()}>
                          <svg width="23" height="17" viewBox="0 0 23 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.448 12.665C6.44598 11.8924 6.17796 11.1441 5.689 10.546L6.56 9.47498C7.09609 10.0582 7.47287 10.7698 7.65401 11.541C7.73565 11.9098 7.77722 12.2863 7.778 12.664C7.77533 12.8376 7.84162 13.0052 7.96234 13.1301C8.08306 13.2549 8.24837 13.3268 8.422 13.33L14.502 13.33C14.7535 14.0982 15.239 14.7686 15.8904 15.2471C16.5419 15.7257 17.3267 15.9886 18.135 15.999C19.1776 15.9795 20.1701 15.5476 20.8949 14.7979C21.6197 14.0481 22.0178 13.0417 22.002 11.999C22.0181 10.9562 21.62 9.9496 20.8952 9.1998C20.1703 8.45 19.1777 8.01818 18.135 7.99898C17.0919 8.01766 16.0988 8.44925 15.3735 9.19911C14.6482 9.94896 14.25 10.9559 14.266 11.999H12.935C12.936 10.948 13.2417 9.91983 13.815 9.03898C13.5376 8.43408 13.1165 7.90618 12.5884 7.50129C12.0603 7.0964 11.4412 6.8268 10.785 6.71598C10.6959 6.70107 10.6108 6.66765 10.5354 6.61788C10.46 6.5681 10.3958 6.50307 10.347 6.42698L8.87801 4.15098C8.55697 3.64693 8.102 3.24216 7.564 2.98198C7.564 2.98698 7.555 2.98898 7.549 2.99498C7.21771 2.82741 6.85902 2.72072 6.49 2.67998V1.39098C6.67489 1.35961 6.86162 1.34024 7.049 1.33298H7.778C7.9503 1.3263 8.11332 1.25316 8.23287 1.1289C8.35241 1.00464 8.41918 0.838908 8.41918 0.666479C8.41918 0.49405 8.35241 0.328322 8.23287 0.204059C8.11332 0.0797955 7.9503 0.00665423 7.778 -2.09808e-05L7.049 -2.09808e-05C5.51042 0.040815 4.04941 0.684205 2.98052 1.79162C1.91163 2.89904 1.32036 4.38192 1.33401 5.92098C1.31783 6.48616 1.52599 7.03478 1.913 7.44698C2.08272 7.62247 2.28617 7.76183 2.51112 7.85669C2.73607 7.95155 2.97787 7.99995 3.222 7.99898C3.58794 7.9995 3.95275 8.03973 4.31001 8.11898C4.75067 8.22446 5.17142 8.40039 5.55601 8.63998L4.68501 9.71098C4.23726 9.46653 3.73611 9.33634 3.22601 9.33198C2.35693 9.34776 1.52955 9.70745 0.925217 10.3322C0.320884 10.957 -0.0111082 11.7959 0.00200462 12.665C-0.013245 13.0978 0.0588316 13.5292 0.213936 13.9336C0.36904 14.3379 0.603995 14.7069 0.904783 15.0184C1.20557 15.33 1.56603 15.5778 1.96466 15.7471C2.3633 15.9163 2.79193 16.0035 3.225 16.0035C3.65808 16.0035 4.08671 15.9163 4.48535 15.7471C4.88398 15.5778 5.24444 15.33 5.54523 15.0184C5.84602 14.7069 6.08097 14.3379 6.23607 13.9336C6.39118 13.5292 6.46325 13.0978 6.448 12.665V12.665ZM5.158 12.665C5.16634 12.9241 5.12251 13.1822 5.02912 13.424C4.93573 13.6658 4.79468 13.8863 4.61436 14.0725C4.43404 14.2588 4.21813 14.4068 3.97946 14.5079C3.74078 14.6091 3.48422 14.6612 3.225 14.6612C2.96579 14.6612 2.70923 14.6091 2.47055 14.5079C2.23188 14.4068 2.01597 14.2588 1.83565 14.0725C1.65533 13.8863 1.51428 13.6658 1.42089 13.424C1.3275 13.1822 1.28367 12.9241 1.29201 12.665C1.28371 12.1434 1.4827 11.6399 1.8453 11.2649C2.2079 10.89 2.70447 10.6742 3.22601 10.665C3.44116 10.6676 3.65426 10.7072 3.856 10.782L2.722 12.248C2.6146 12.3871 2.56505 12.5623 2.58368 12.7371C2.60231 12.9118 2.68769 13.0726 2.822 13.186C2.88732 13.2408 2.96308 13.2818 3.0447 13.3066C3.12632 13.3313 3.21211 13.3393 3.29689 13.3299C3.38166 13.3206 3.46366 13.2941 3.53793 13.2522C3.6122 13.2103 3.6772 13.1537 3.729 13.086L4.86201 11.615C5.05447 11.9314 5.1565 12.2946 5.15701 12.665H5.158ZM20.712 11.999C20.7227 12.694 20.4575 13.365 19.9745 13.8649C19.4915 14.3648 18.83 14.6528 18.135 14.666C17.6794 14.6618 17.2331 14.5359 16.8425 14.3013C16.4518 14.0668 16.1309 13.7321 15.913 13.332H17.489C18.0105 13.3225 18.5069 13.1067 18.8694 12.7317C19.232 12.3568 19.431 11.8535 19.423 11.332C19.4264 11.2452 19.4123 11.1586 19.3814 11.0775C19.3506 10.9963 19.3037 10.9222 19.2435 10.8596C19.1833 10.797 19.1111 10.7472 19.0312 10.7131C18.9513 10.6791 18.8653 10.6616 18.7785 10.6616C18.6917 10.6616 18.6057 10.6791 18.5258 10.7131C18.4459 10.7472 18.3737 10.797 18.3135 10.8596C18.2533 10.9222 18.2064 10.9963 18.1756 11.0775C18.1447 11.1586 18.1306 11.2452 18.134 11.332C18.1367 11.5059 18.0703 11.6738 17.9494 11.7988C17.8285 11.9238 17.6629 11.9958 17.489 11.999H15.556C15.5453 11.3036 15.8108 10.6323 16.2942 10.1324C16.7777 9.63245 17.4397 9.3446 18.135 9.33198C18.83 9.34513 19.4915 9.6332 19.9745 10.1331C20.4575 10.633 20.7227 11.3039 20.712 11.999ZM18.779 6.66398C19.6476 6.6482 20.4746 6.28875 21.0787 5.66439C21.6828 5.04003 22.0148 4.20167 22.002 3.33298C22.0035 3.24661 21.9879 3.16081 21.9561 3.08048C21.9244 3.00014 21.8771 2.92686 21.817 2.86481C21.7569 2.80277 21.6852 2.75318 21.6059 2.71889C21.5266 2.6846 21.4414 2.66628 21.355 2.66498H18.527L14.391 5.20698C13.852 5.53262 13.2826 5.80523 12.691 6.02098C13.5193 6.47782 14.2139 7.14312 14.706 7.95098C14.706 7.96198 14.706 7.97298 14.716 7.98398C15.2653 7.49512 15.9099 7.12543 16.6092 6.89824C17.3085 6.67104 18.0473 6.59128 18.779 6.66398V6.66398ZM13.73 4.06398L14.759 3.42298C14.3582 2.78754 13.804 2.26304 13.1475 1.89767C12.4911 1.5323 11.7533 1.33778 11.002 1.33198C10.1495 1.33894 9.31785 1.59589 8.61 2.07098C9.14508 2.41934 9.60204 2.87495 9.952 3.40898L11.052 5.12398C11.9987 4.92583 12.9045 4.56697 13.73 4.06298V4.06398Z" style={svgStyle2}/>
                          </svg>
                      </button>
                      </div>

           </div>

           </div>
          <div className='flex flex-col mr-20 h-[385px] w-[240px] p-[20px] bg-white'>

                <div className='mb-[10px]'>  {/* garigebis tipebi */}

                    <div className='text-[12px] font-medium'>

                      გარიგების ტიპი

                    </div>

                    <DropdownButton   title="გარიგების ტიპი">

                    <label htmlFor='-1'><input type='checkbox' id='-1' onChange={handleChangeSale} checked={checkbox1Checked}></input>იყიდება</label>

                    <br></br>

                    <label htmlFor='-2'><input type='checkbox' id='-2' onChange={handleChangeRent} checked={checkbox2Checked}></input>ქირავდება</label>

                    </DropdownButton>

                </div>




                <div className='mb-[10px]'> {/* mwarmoebeli */}
                    <div className='text-[12px] font-medium'>
                      მწარმოებელი
                    </div>
                    {/* <DropdownButton id="dropdownMenuButton" title="მწარმოებელი">
                    {manufacturer.filter((info) => {
                    if (vehicle === 0) {
                    return info.is_car === "1";
                        } else if (vehicle === 1) {
                    return info.is_spec === "1";
                    } else if (vehicle === 2) {
                      return info.is_moto === "1";
                    }
                    return false;
                    }).map((info) => {
                    return <ManufacturerLst1 key={info.man_id} {...info} />;
                      })}
                  </DropdownButton> */}
                  <div>
                  <ManDropDown manufacturer={manufacturer.filter((info) => {
                    if (vehicle === 0) {
                    return info.is_car === "1";
                        } else if (vehicle === 1) {
                    return info.is_spec === "1";
                    } else if (vehicle === 2) {
                      return info.is_moto === "1";
                    }
                    return false;
                    })}></ManDropDown>
                  </div>
                </div>





                <div className='mb-[10px]'>   {/* kategoria */}
                    <div className='text-[12px] font-medium'>
                      კატეგორია
                    </div>
                  {/* <DropdownButton id="dropdownMenuButton" title="კატეგორია">
                  {categoty.filter((info)=>info.vehicle_types[0]===vehicle).map((info)=>{
                  return (
                  <Category key = {info.category_id} {...info}/> )})}</DropdownButton> */}
                  <div>
                  <CategoryDropDown categories = {categoty.filter((info)=>info.vehicle_types[0]===vehicle)}></CategoryDropDown>
                  </div>
                </div>




                <div className='mb-[4px]'>  {/* modelebi */}
                   <div className='text-[12px] font-medium'>
                      მოდელი
                    </div>
                  {/* <DropdownButton id="dropdownMenuButton" title="მოდელი">
                  {modelsState.filter((model)=> manufacturerPotential.hasOwnProperty(model.man_id) && (manufacturerPotential[model.man_id] === 1)).map((model) => (
                  <ManModel key={model.model_id} {...model} />
                  ))}
                  </DropdownButton> */}
                  <div>
                    <ModelDropDown models={modelsState.filter((model)=> manufacturerPotential.hasOwnProperty(model.man_id) && (manufacturerPotential[model.man_id] === 1))} updateModels={updateModels} mans={manufacturerPotential}></ModelDropDown>
                  </div>
                </div>

               




 

                <br></br>   {/* shercheva fasis mixedvit */}

                <div className='input-group'>

                <input type='number' id='number1' className="form-control" value={fromValue} onChange={handleFromValue}></input>

                <div className="input-group-text">-</div>

                <input type='number' id='number2' className="form-control" value={toValue} onChange={handleToValue}></input>

                </div>

                <br></br>




                <button type='button' onClick={()=>{FilteringUrl(1)}}>მოძებნა</button>  {/* modzebnis gilaki */}



           </div>
          </div>





          <div className='flex justify-baseline  flex-col  ml-20 '> {/* marcxena mxare */}

                <div className='flex flex-row justify-end'>   {/* periodi da daxarisxeba */}

                  <div className='mr-2'>

                      <DropdownButton  id="periodDropdown" title="პერიოდი">

                      <Dropdown.Item onClick={()=>handlePeriodFilter("1h")}>1h

                      </Dropdown.Item>

                      <Dropdown.Item onClick={()=>handlePeriodFilter("2h")}>2h

                      </Dropdown.Item>

                      <Dropdown.Item onClick={()=>handlePeriodFilter("3h")}>3h

                      </Dropdown.Item>

                      <Dropdown.Item onClick={()=>handlePeriodFilter("1d")}>1d

                      </Dropdown.Item>

                      <Dropdown.Item onClick={()=>handlePeriodFilter("2d")}>2d

                      </Dropdown.Item>

                      <Dropdown.Item onClick={()=>handlePeriodFilter("3d")}>3d

                      </Dropdown.Item>

                      <Dropdown.Item onClick={()=>handlePeriodFilter("1w")}>1w

                      </Dropdown.Item>

                      <Dropdown.Item onClick={()=>handlePeriodFilter("2w")}>2w

                      </Dropdown.Item>

                      <Dropdown.Item onClick={()=>handlePeriodFilter("3w")}>3w

                      </Dropdown.Item>

                      </DropdownButton>

                  </div>

               

                  <div>

                      <DropdownButton id="sortDropdown" title="დახარისხება">

                      <Dropdown.Item onClick={() => {handleSortOption('1');}}>

                          Sort by date (ascending)

                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => {handleSortOption('2');}}>

                        Sort by date (descending)

                        </Dropdown.Item>

                        <Dropdown.Item onClick={() => {handleSortOption('3');}}>

                        Sort by price (ascending)

                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => {handleSortOption('4');}}>

                        Sort by price (descending)

                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => {handleSortOption('5');}}>

                        Sort by car run (ascending)

                      </Dropdown.Item>

                      <Dropdown.Item onClick={() => {handleSortOption('6');}}>

                        Sort by car run (descending)

                      </Dropdown.Item>

                      </DropdownButton><br></br>

                  </div>  

                </div>




                <div>  {/* manqanebi */}

                    {data.map((info)=>{

                          return(

                              <CarInfo key={info.car_id} {...info}/>

                          )

                      })}

                </div>

                <div className='flex justify-center items-center bg-white rounded-[5px] justify-'>

<div className="mr-[20px]"> {/* pirvelze dasabrunebeli gilaki*/}

   <button disabled={currentPage === 1} onClick={handleFirstPage} className={` ${
        currentPage === 1 ? 'hidden' : ''
      }`}>

     <svg xmlns="http://www.w3.org/2000/svg" width="13.414" height="8.829" viewBox="0 0 13.414 8.829">

       <g transform="translate(1 1.414)">

         <path d="M12,12,9,9l3-3" transform="translate(-1 -6)" style={{ fill: "none", stroke: "rgb(253, 65, 0)", strokeLinecap: "round", strokeWidth: "2px", strokeLinejoin: "round" }}></path>

         <path d="M12,12,9,9l3-3" transform="translate(-6 -6)" style={{ fill: "none", stroke: "rgb(253, 65, 0)", strokeLinecap: "round", strokeWidth: "2px", strokeLinejoin: "round" }}></path>

         <line y2="6" transform="translate(0)" style={{ fill: "none", stroke: "rgb(253, 65, 0)", strokeLinecap: "round", strokeWidth: "2px" }}></line>

         </g>

       </svg>

   </button>

 </div>







 <div className="mr-[20px]"> {/* previous gilaki*/}

   <button disabled={currentPage === 1} onClick={handlePrevPage} className={` ${
        currentPage === 1 ? 'hidden' : ''
      }`}>

     <svg xmlns="http://www.w3.org/2000/svg" width="5.414" height="8.829" viewBox="0 0 5.414 8.829">

       <path d="M12,12,9,9l3-3" transform="translate(-8 -4.586)" style={{ fill: "none", stroke: "rgb(253, 65, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2px" }}></path>

     </svg>

   </button>

 </div>



   {renderPageButtons()}

   <div className="mr-[20px]">  {/* next gilaki*/}

     <button disabled={currentPage === maxPages} onClick={handleNextPage} className={` ${
        currentPage === maxPages ? 'hidden' : ''
      }`}>

       <svg xmlns="http://www.w3.org/2000/svg" width="5.414" height="8.829" viewBox="0 0 5.414 8.829">

         <path d="M9,12l3-3L9,6" transform="translate(-7.586 -4.586)" style={{ fill: "none", stroke: "rgb(253, 65, 0)", strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2px" }}></path>

       </svg>

     </button>

   </div>



 <div className="mr-[20px]"> {/* boloshi gadasasvleli gilaki*/}

   <button disabled={currentPage === maxPages} onClick={handleLastPage} className={` ${
        currentPage === maxPages ? 'hidden' : ''
      }`}>

     <svg xmlns="http://www.w3.org/2000/svg" width="13.414" height="8.829" viewBox="0 0 13.414 8.829">

       <g transform="translate(-1134.586 -2682.586)">

         <path d="M9,12l3-3L9,6" transform="translate(1127 2678)" style={{ fill: "none", stroke: "rgb(253, 65, 0)", strokeLinecap: "round", strokeWidth: "2px", strokeLinejoin: "round" }}></path>

         <path d="M9,12l3-3L9,6" transform="translate(1132 2678)" style={{ fill: "none", stroke: "rgb(253, 65, 0)", strokeLinecap: "round", strokeWidth: "2px", strokeLinejoin: "round" }}></path>

         <line y2="6" transform="translate(1147 2684)" style={{ fill: "none", stroke: "rgb(253, 65, 0)", strokeLinecap: "round", strokeWidth: "2px" }}></line>

       </g>

     </svg>

   </button>

 </div>


</div>
          </div>

      </div>

  </div>
  );
}

export default App;
