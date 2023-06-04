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
    const str = `https://static.my.ge/myauto/photos/${props.photo}/thumbs/${props.car_id}_1.jpg?v=${props.photo_ver}`
    if (loading) {
        return <></>;
    }
    return (
        <div className="container">
            <img src={str} className="img-thumbnail" alt="no Photo" width="200" height="150">
            </img>
            <div className="info">
                <div className="row">
                    <div className="col-sm-6">{`${manufacturer.filter((info) => info.man_id === props.man_id.toString()).find((info) => info.man_id === props.man_id.toString())?.man_name} ${modelList.filter((info)=>info.model_id === props.model_id).find((info)=>info.model_id===props.model_id)?.model_name}`}</div>
                    {/* <div className="col-sm-4"></div> */}
                    <div className="col-sm-6">{props.prod_year}წ</div>
                </div>
                <div className="row">{props.fuel_type_id},{props.car_run},{props.price}</div>
                <div className="row">{props.drive_type_id},{wheelPosition}</div>
            </div>
        </div>
    )
}

export default CarInfo;
