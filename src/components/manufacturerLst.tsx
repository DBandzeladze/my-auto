import React, { ChangeEvent, useContext } from "react";
import { ManufacturerListType } from "../types/types";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Context} from "../global";


const ManufacturerLst= (Props: ManufacturerListType)=>{
  const [state, setState] = useContext(Context);
  let newState = state;
  newState[Props.man_id] = 0;
  setState(newState)
    let str1: string = Props.man_id;
    // MY_GLOBAL_VAR.str = 0;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      let str123 = Props.man_id
        if (event.target.checked) {
          let newState1 = state;
          newState1[Props.man_id] = 1;
          setState(newState1)
          console.log(state)
        //   MY_GLOBAL_VAR.str = 1;
        //   console.log(MY_GLOBAL_VAR.str)
        } else {
          let newState1 = state;
          newState1[Props.man_id] = 0;
          setState(newState1)
          console.log(state)
        //   MY_GLOBAL_VAR.str = 0;
        //   console.log(MY_GLOBAL_VAR.str)
        }
      };
    return (
        <div>
            <label htmlFor={Props.man_id}><input type="checkbox" onChange={handleChange} id= {Props.man_id}></input>{Props.man_name}</label>
      </div>
    )
}

export default ManufacturerLst;