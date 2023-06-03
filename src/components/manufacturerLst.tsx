import React from "react";
import { ManufacturerListType } from "../types/types";

const ManufacturerLst = (Props: ManufacturerListType)=>{
    return (
        <option>
            {Props.man_name}
        </option>
    )
}

export default ManufacturerLst;