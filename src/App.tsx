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
  const [page, setPage] = useState(1);
  const [vehicle, setVehicle] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  
  const [filteredData, setFilteredData] = useState<CarInfoDataType[]>([]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const renderPageButtons = () => {
    const pageButtons = [];
    const numButtons = 7;

    // Calculate the range of visible page buttons based on the current page
    let startPage = currentPage - Math.floor(numButtons / 2);
    let endPage = currentPage + Math.floor(numButtons / 2);

    if (startPage < 1) {
      // Adjust if the start page is less than 1
      endPage += Math.abs(startPage) + 1;
      startPage = 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          disabled={i === currentPage}
        >
          {i}
        </button>
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
  const FilteringUrl = () =>{
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
    for (const key in manFilter){
      if (manFilter[key]===1){
        manOpt = manOpt + key + "-";
      }
    }
    if (manOpt !== ""){
      manOpt = manOpt.slice(0, -1);
    }
    let newUrl: string = `${firstUrl}?Page=${currentPage}&PriceFrom=${from}&PriceTo=${to}&ForRent=${rent}&SortOrder=${sortopt}&Period=${periodopt}&Cats=${catOpt}&Mans=${manOpt}`;
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
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const fetchModel = () => {
    manufacturer.forEach(async (element)=>{
      try {
        const response = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${element.man_id}`);
        const responseData = await response.json();
        setModelsState([...responseData.data]);
      } catch (error) {
        console.log(error);
      }
    })
  }

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(()=>{
    fetchData1();
  }, [dataUrl])

  useEffect(()=>{
    FilteringUrl();
  }, [currentPage, selectedSortOption, selectedPeriod])

  // useEffect(() => {
  //   fetchModel();
  // }, [manufacturer]);

  useEffect(()=>{
    console.log("changed")
  }, [rentFilter, manFilter, categoryFilter, modelFilter])
  
  const handlePeriodFilter = (period: string) => {
    setSelectedPeriod(period);
  };
  const handleSortOption = (option: string) => {
    setSelectedSortOption(option);
  };

  if (loading) {
    return <main>Loading</main>;
  }


  return (
    <div className="container">
      <div>
        miutitet transportis tipi
      </div>
      <button onClick={()=>setVehicle(0)}>0</button>
      <button onClick={()=>setVehicle(1)}>1</button>
      <button onClick={()=>setVehicle(2)}>2</button>
      <div>გარიგების ტიპი</div>
      <DropdownButton id="dropdownMenuButton" title="გარიგების ტიპი">
        <label htmlFor='-1'><input type='checkbox' id='-1' onChange={handleChangeSale} checked={checkbox1Checked}></input>იყიდება</label>
        <br></br>
        <label htmlFor='-2'><input type='checkbox' id='-2' onChange={handleChangeRent} checked={checkbox2Checked}></input>ქირავდება</label>
      </DropdownButton>
      <div>მწარმოებელი</div>
     <DropdownButton id="dropdownMenuButton" title="მწარმოებელი">
      <div>პოპულარული</div>
      {manufacturer.filter((info) => info.is_spec !== "1" && info.is_car === "1").map((info)=>{
            return (
              <ManufacturerLst key ={info.man_id} {...info}/>
            )
          })}
      <div>სხვა</div>
      {manufacturer.filter((info)=> info.is_spec !== "0" && info.is_car === "1").map((info)=>{
            return (
              <ManufacturerLst key ={info.man_id} {...info}/>
            )
          })}
    </DropdownButton>
    <div>კატეგორია</div>
    <DropdownButton id="dropdownMenuButton" title="კატეგორია">
      {categoty.filter((info)=>info.vehicle_types[0]===vehicle).map((info)=>{
        return (
          <Category key = {info.category_id} {...info}/>
        )
      })}
    </DropdownButton>
    <br></br>
    <div>Model</div>
    <DropdownButton id="dropdownMenuButton" title="Model">
    {modelsState.filter((model)=> manFilter.hasOwnProperty(model.man_id)).map((model) => (
    <ManModel key={model.model_id} {...model} />
  ))}
    </DropdownButton>
    <br></br>
    <div className='input-group'>
      <input type='number' id='number1' className="form-control" value={fromValue} onChange={handleFromValue}></input>
      <div className="input-group-text">-</div>
      <input type='number' id='number2' className="form-control" value={toValue} onChange={handleToValue}></input>
    </div>
    <br></br>
    <DropdownButton id="periodDropdown" title="პერიოდი">
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
      <button type='button' onClick={()=>FilteringUrl()}>filter</button>
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
      </DropdownButton>
      {data.map((info)=>{
                    return(
                        <CarInfo key={info.car_id} {...info}/>
                    )
                })}
      <div>
      <button disabled={currentPage === 1} onClick={handlePrevPage}>
        Previous
      </button>

      {renderPageButtons()}

      <button onClick={handleNextPage}>Next</button>
      </div>

    </div>
  );
}

export default App;