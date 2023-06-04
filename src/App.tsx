import React, { useEffect, useState } from 'react';
import CarInfo from './components/CarInfo';
import ManufacturerLst from './components/manufacturerLst';
import { CarInfoDataType } from './types/types';
import { ManufacturerListType } from './types/types';
const url = "https://api2.myauto.ge/ka/products/";
const url2 = "https://static.my.ge/myauto/js/mans.json"

function App() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<CarInfoDataType[]>([]);
  const [manufacturer, SetManufacturer] = useState<ManufacturerListType[]>([]);
  

  const fetchData = async () => {
    setLoading(true);
    try {
      const response1 = await fetch(url);
      const response2 = await fetch(url2);
      const responseData = await response1.json();
      const responseData2 = await response2.json()
      setLoading(false);
      setData(responseData.data.items);
      SetManufacturer(responseData2);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <main>Loading</main>;
  }

  return (
    <div className="App">
      <select>
        <optgroup label='პოპულარული'>
          {manufacturer.filter((info) => info.is_spec !== "0").map((info)=>{
            return (
              <ManufacturerLst key ={info.man_id} {...info}/>
            )
          })}
        </optgroup>
        <optgroup label='სხვა'>
          {manufacturer.filter((info)=> info.is_spec !== "1").map((info)=>{
            return (
              <ManufacturerLst key ={info.man_id} {...info}/>
            )
          })}
        </optgroup>
      </select>
      {data.map((info)=>{
                    return(
                        <CarInfo key={info.car_id} {...info}/>
                    )
                })}
    </div>
  );
}

export default App;