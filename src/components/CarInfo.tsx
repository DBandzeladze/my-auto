import React from "react";
import { CarInfoDataType } from "../types/types";
const CarInfo = (props: CarInfoDataType)=>{
    return (
        <div className="container">
            <div className="Photo">
            </div>
            <div className="info">
                <div className="row1">{props.man_id},{props.model_id},{props.prod_year},</div>
                <div className="row2">{props.fuel_type_id},{props.car_run},{props.price}</div>
                <div className="row3">{props.drive_type_id},{props.right_wheel}</div>
            </div>
        </div>
    )
}

export default CarInfo;
