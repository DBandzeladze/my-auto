import React, { useEffect, useState, useContext, ChangeEvent } from 'react';
import CarInfo from './components/CarInfo';
import ManufacturerLst from './components/manufacturerLst';
import { CarInfoDataType } from './types/types';
import { ManufacturerListType } from './types/types';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { CategoryType, GlobalType, GloablRentType, GlobalCategoryType} from './types/types';
import Category from './components/category';
import { Context,Context2, Context3} from "./global"; 

const url = "https://api2.myauto.ge/ka/products/";
const url2 = "https://static.my.ge/myauto/js/mans.json";
const url3 = "https://api2.myauto.ge/ka/cats/get";

function App() {
  const [rentFilter, setRentFilter] = useContext(Context3);
  const [manFilter, setManFilter] = useContext(Context);
  const [categoryFilter, setCategoryFilter] = useContext(Context2);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CarInfoDataType[]>([]);
  const [manufacturer, SetManufacturer] = useState<ManufacturerListType[]>([]);
  const [categoty, SetCategory] = useState<CategoryType[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  const [selectedSortOption, setSelectedSortOption] = useState<string | null>(null);

  
  const [filteredData, setFilteredData] = useState<CarInfoDataType[]>([]);

  const sortManfacurer = (manlst: ManufacturerListType[]) => {
    const sortedList = manlst.sort((a, b) => a.man_name.localeCompare(b.man_name));
    return sortedList;
  }
  const handleChangeSale = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        let newState1 = rentFilter;
        newState1["sale"] = 1;
        setRentFilter(newState1)
        console.log(rentFilter)
      } else {
        let newState1 = rentFilter;
        newState1["sale"] = 0;
        setRentFilter(newState1)
        console.log(rentFilter)
      }
    };
    const handleChangeRent = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        let newState1 = rentFilter;
        newState1["rent"] = 1;
        setRentFilter(newState1)
        console.log(rentFilter)
      } else {
        let newState1 = rentFilter;
        newState1["rent"] = 0;
        setRentFilter(newState1)
        console.log(rentFilter)
      }
    };
  const FilterMan = (OldData: CarInfoDataType[]) => {
    let NewData: CarInfoDataType[]= [];
    let change: boolean = false
    for (const key in manFilter) {
      if (manFilter[key] === 1){
        change = true;
        OldData.forEach(element=>{
          if (element.man_id.toString() == key){
            NewData.push(element);
          }
        }
        )
      }
    }
    if (change) {
      return NewData;
    }
    return OldData;
  };
  const FilterCat = (OldData: CarInfoDataType[]) => {
    let NewData: CarInfoDataType[]= [];
    let change: boolean = false
    for (const key in categoryFilter) {
      if (categoryFilter[key] === 1){
        change = true;
        OldData.forEach(element=>{
          if (element.category_id.toString() === key){
            NewData.push(element);
          }
        }
        )
      }
    }
    if (change) {
      return NewData;
    }
    return OldData;
  };

  const FilterRent = (OldData: CarInfoDataType[]) => {
    let NewData: CarInfoDataType[]= [];
    let change: boolean = false
    for (const key in rentFilter) {
      if (rentFilter[key] === 1){
        change = true;
        OldData.forEach(element=>{
          console.log(key)
          if (element.for_rent === true && key=== "rent"){
            NewData.push(element);
          }
          if (element.for_rent === false && key === "sale"){
            NewData.push(element)
          }
        }
        )
      }
    }
    if (change) {
      return NewData;
    }
    return OldData;
  };

  const FilterAll = (OldData: CarInfoDataType[]) => {
    let NewData: CarInfoDataType[]= [...OldData];
    NewData = FilterMan(NewData);
    NewData = FilterCat(NewData);
    NewData = FilterRent(NewData);
    NewData = NewData.filter(filterCarsByPeriod);
    NewData = sortCars(NewData);
    return NewData;

  }
  

  const fetchData = async () => {
    setLoading(true);
    try {
      const response1 = await fetch(url);
      const response2 = await fetch(url2);
      const response3 = await fetch(url3);
      const responseData = await response1.json();
      const responseData2 = await response2.json();
      const responseData3 = await response3.json();
      setLoading(false);
      setData(responseData.data.items);
      setFilteredData(responseData.data.items)
      SetManufacturer(sortManfacurer(responseData2));
      SetCategory(responseData3.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePeriodFilter = (period: string) => {
    setSelectedPeriod(period);
  };
  const handleSortOption = (option: string) => {
    setSelectedSortOption(option);
  };


  const filterCarsByPeriod = (car: CarInfoDataType) => {
    if (!selectedPeriod) {
      return true;
    }

    const periodInHours = parseInt(selectedPeriod);
    const orderDate = new Date(car.order_date);
    const currentDate = new Date();

    const timeDifference = currentDate.getTime() - orderDate.getTime();
    const hoursDifference = timeDifference / (1000 * 3600);

    return hoursDifference <= periodInHours;
  };
  const periods = ['1', '3', '6', '12', '24'];

  // const filteredCars = data.filter(filterCarsByPeriod);

  const sortCars = (cars: CarInfoDataType[]): CarInfoDataType[] => {
    switch (selectedSortOption) {
      case '1':
        // Sort by date in ascending order (newest to oldest)
        return cars.sort((a, b) => {
          const dateA = new Date(a.order_date);
          const dateB = new Date(b.order_date);
          return dateA.getTime() - dateB.getTime();
        });
      case '2':
        // Sort by date in descending order (oldest to newest)
        return cars.sort((a, b) => {
          const dateA = new Date(a.order_date);
          const dateB = new Date(b.order_date);
          return dateB.getTime() - dateA.getTime();
        });
      case '3':
        // Sort by price in ascending order (cheap to expensive)
        return cars.sort((a, b) => a.price - b.price);
      case '4':
        // Sort by price in descending order (expensive to cheap)
        return cars.sort((a, b) => b.price - a.price);
      case '5':
        // Sort by car run in ascending order
        return cars.sort((a, b) => a.car_run - b.car_run);
      case '6':
        // Sort by car run in descending order
        return cars.sort((a, b) => b.car_run - a.car_run);
      default:
        return cars;
    }
  };
  if (loading) {
    return <main>Loading</main>;
  }


  return (
    <div className="App">
      <div>გარიგების ტიპი</div>
      <DropdownButton id="dropdownMenuButton" title="გარიგების ტიპი">
        <label htmlFor='1'><input type='checkbox' id='1' onChange={handleChangeSale}></input>იყიდება</label>
        <br></br>
        <label htmlFor='2'><input type='checkbox' id='2' onChange={handleChangeRent}></input>ქირავდება</label>
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
      {categoty.filter((info)=>info.vehicle_types[0]===0).map((info)=>{
        return (
          <Category key = {info.category_id} {...info}/>
        )
      })}
    </DropdownButton>
    <br></br>
    <DropdownButton id="periodDropdown" title="პერიოდი">
        {periods.map((period) => (
          <Dropdown.Item
            key={period}
            onClick={() => handlePeriodFilter(period)}
          >
            {`${period} hours ago`}
          </Dropdown.Item>
        ))}
      </DropdownButton>
      <button type='button' onClick={()=>setFilteredData(FilterAll(data))}>filter</button>
      <DropdownButton id="sortDropdown" title="დახარისხება">
        <Dropdown.Item onClick={() => handleSortOption('1')}>
          Sort by date (ascending)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortOption('2')}>
          Sort by date (descending)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortOption('3')}>
          Sort by price (ascending)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortOption('4')}>
          Sort by price (descending)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortOption('5')}>
          Sort by car run (ascending)
        </Dropdown.Item>
        <Dropdown.Item onClick={() => handleSortOption('6')}>
          Sort by car run (descending)
        </Dropdown.Item>
      </DropdownButton>
      {filteredData.map((info)=>{
                    return(
                        <CarInfo key={info.car_id} {...info}/>
                    )
                })}
    </div>
  );
}

export default App;