import React, { ChangeEvent } from "react";
import { ManufacturerListType } from "../types/types";
import { DropdownButton, Dropdown } from 'react-bootstrap';


const ManufacturerLst= (Props: ManufacturerListType)=>{
    let str: string = Props.man_name
    // MY_GLOBAL_VAR.str = 0;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
        //   MY_GLOBAL_VAR.str = 1;
        //   console.log(MY_GLOBAL_VAR.str)
        } else {
        //   MY_GLOBAL_VAR.str = 0;
        //   console.log(MY_GLOBAL_VAR.str)
        }
      };
    return (
        <div>
            <input type="checkbox" onChange={handleChange}></input>
        <Dropdown.Item href="#">{Props.man_name}</Dropdown.Item>
      </div>
    )
}

export default ManufacturerLst;