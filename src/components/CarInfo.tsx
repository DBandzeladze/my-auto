import React, { useEffect } from "react";
import { CarInfoDataType } from "../types/types";
import { useState } from "react";
import { ManufacturerListType } from "../types/types";
import { ModelListType } from "../types/types";
import { info } from "console";
const url2 = "https://static.my.ge/myauto/js/mans.json";
const CarInfo = (props: CarInfoDataType)=>{
    const [manufacturer, SetManufacturer] = useState<ManufacturerListType[]>([]);
    const [modelList, SetModelList] = useState<ModelListType[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        setLoading(true);
        try {
          const response2 = await fetch(url2);
          const response3 = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${props.man_id}`)
          const responseData2 = await response2.json()
          const responseData3 = await response3.json()
          SetManufacturer(responseData2);
          SetModelList(responseData3.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
    
    useEffect(() => {
        fetchData();
    }, []);

    const wheelPosition = props.right_wheel ? "მარჯვენა" : "მარცხენა";
  const getFuelType = (fuelTypeId: number) => {
    switch (fuelTypeId) {
      case 2:
        return "ბენზინი";
      case 3:
        return "დიზელი";
      case 6:
        return "ჰიბრიდი";
      default:
        return "ელექტრო";
    }
  };

  // Mapping drive types
  const getDriveType = (gearType: number) => {
    switch (gearType) {
      case 2:
        return "ავტომატიკა";
      case 1:
        return "მექანიკა";
      case 3:
        return "ტიპტრონიკი";
      case 4:
        return "ვარიატორი";
      default:
        return "";
    }
  };
  const Ganbajeba = props.customs_passed ? "განბაჟებული" : "განბაჟება ";

    const str = `https://static.my.ge/myauto/photos/${props.photo}/thumbs/${props.car_id}_1.jpg?v=${props.photo_ver}`;
    if (loading) {
        return <></>;
    }
     // Calculate time difference
     const currentTime = new Date();
     const orderDate = new Date(props.order_date);
     const timeDifferenceMinutes = Math.floor((currentTime.getTime() - orderDate.getTime()) / (1000 * 60));
     const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
     const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);
     const timeDifferenceMonths = Math.floor(timeDifferenceDays / 30);
     const timeDifferenceYears = Math.floor(timeDifferenceMonths / 12);
 
     let timeDifferenceText = "";
     if (timeDifferenceYears > 0) {
       timeDifferenceText = `${timeDifferenceYears} წლის წინ`;
     } else if (timeDifferenceMonths > 0) {
       timeDifferenceText = `${timeDifferenceMonths} თვის წინ`;
     } else if (timeDifferenceDays > 0) {
       timeDifferenceText = `${timeDifferenceDays} დღის წინ`;
     } else if (timeDifferenceHours > 0) {
       timeDifferenceText = `${timeDifferenceHours} საათის წინ`;
     } else if (timeDifferenceMinutes === 0) {
       timeDifferenceText = `წუთის წინ`;
     } else {
        timeDifferenceText = `${timeDifferenceMinutes} წუთის წინ`;
     }
     let carPrice : string = "";
     if (props.price_value === 0) {
        carPrice = "ფასი შეთანხმებით"
     }
     else {
        carPrice = `${props.price_value}`
     }
     let ForRent : string = "";
     if (props.for_rent) {
        ForRent = "ქირავდება"
     }
     else {
        ForRent = ""
     }
 
    return (
        <div className="container">
            <img src={str} className="img-thumbnail" alt="no Photo" width="200" height="150" />
            <div className="info">
                <div className="row">
                    <div className="col-sm-4">{`${ForRent} ${manufacturer.filter((info) => info.man_id === props.man_id.toString()).find((info) => info.man_id === props.man_id.toString())?.man_name} ${modelList.filter((info)=>info.model_id === props.model_id).find((info)=>info.model_id===props.model_id)?.model_name} ${props.car_model}`}</div>
                    <div className="col-sm-4">{props.prod_year}წ</div>
                    <div className="col-sm-4">{Ganbajeba}</div>
                </div>
                <div className="row">{`${(props.engine_volume/1000).toPrecision(2)} ${getFuelType(props.fuel_type_id)}`},{props.car_run} კმ,{carPrice}</div>
                <div className="row">{getDriveType(props.gear_type_id)}, {wheelPosition}</div>
                <div className="row">{props.views} ნახვა   .   {timeDifferenceText}</div>
            </div>
        </div>
    )
}

export default CarInfo;