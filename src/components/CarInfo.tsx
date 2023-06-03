import React from "react";
import { CarInfoDataType } from "../types/types";
const CarInfo = (props: CarInfoDataType)=>{
    const str = `https://static.my.ge/myauto/photos/${props.photo}/thumbs/${props.car_id}_1.jpg?v=${props.photo_ver}`
    return (
        <div className="container">
            <img src={str} className="img-thumbnail" alt="no Photo" width="200" height="150">
            </img>
            <div className="info">
                <div className="row">
                    <div className="col-sm-4">{props.man_id}</div>
                    <div className="col-sm-4">{props.model_id}</div>
                    <div className="col-sm-4">{props.prod_year}წ</div>
                </div>
                <div className="row">{props.fuel_type_id},{props.car_run},{props.price}</div>
                <div className="row">{props.drive_type_id},{props.right_wheel}</div>
            </div>
        </div>
    )
}

export default CarInfo;
