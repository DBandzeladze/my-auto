import React, { useEffect, useState } from 'react';
import CarInfo from './components/CarInfo';
import ManufacturerLst from './components/manufacturerLst';
import { CarInfoDataType } from './types/types';
import { ManufacturerListType } from './types/types';
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { CategoryType } from './types/types';
import Category from './components/category';

const url = "https://api2.myauto.ge/ka/products/";
const url2 = "https://static.my.ge/myauto/js/mans.json";
const url3 = "https://api2.myauto.ge/ka/cats/get";

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CarInfoDataType[]>([]);
  const [manufacturer, SetManufacturer] = useState<ManufacturerListType[]>([]);
  const [categoty, SetCategory] = useState<CategoryType[]>([]);
  const [selectedPeriod, setSelectedPeriod] = useState<string | null>(null);
  

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
      SetManufacturer(responseData2);
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

  const filteredCars = data.filter(filterCarsByPeriod);


  if (loading) {
    return <main>Loading</main>;
  }


  return (
    <div className="App">
      <div>გარიგების ტიპი</div>
      <DropdownButton id="dropdownMenuButton" title="გარიგების ტიპი">
        <label htmlFor='1'><input type='checkbox' id='1'></input>იყიდება</label>
        <br></br>
        <label htmlFor='2'><input type='checkbox' id='2'></input>ქირავდება</label>
      </DropdownButton>
      <div>მწარმოებელი</div>
     <DropdownButton id="dropdownMenuButton" title="მწარმოებელი">
      <div>პოპულარული</div>
      {manufacturer.filter((info) => info.is_spec !== "0").map((info)=>{
            return (
              <ManufacturerLst key ={info.man_id} {...info}/>
            )
          })}
      <div>სხვა</div>
      {manufacturer.filter((info)=> info.is_spec !== "1").map((info)=>{
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
      {filteredCars.map((info)=>{
                    return(
                        <CarInfo key={info.car_id} {...info}/>
                    )
                })}
    </div>
  );
}

export default App;