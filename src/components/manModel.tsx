import React, { ChangeEvent, useContext } from "react";
import { ModelListType } from "../types/types";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Context4} from "../global";


const ManModel= (Props: ModelListType)=>{
  const [state, setState] = useContext(Context4);
  let newState = state;
  // newState[Props.man_id] = 0;
  setState(newState);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
          let newState1 = state;
          newState1[`${Props.man_id}.${Props.model_id}`] = 1;
          setState(newState1)
          console.log(state)
        //   MY_GLOBAL_VAR.str = 1;
        //   console.log(MY_GLOBAL_VAR.str)
        } else {
          let newState1 = state;
          newState1[`${Props.man_id}.${Props.model_id}`] = 0;
          setState(newState1)
          console.log(state)
        //   MY_GLOBAL_VAR.str = 0;
        //   console.log(MY_GLOBAL_VAR.str)
        }
      };
    return (
        <div>
            <label htmlFor={`${Props.man_id}${Props.model_id}`}><input type="checkbox" onChange={handleChange} id= {`${Props.man_id}${Props.model_id}`}></input>{Props.model_name}</label>
      </div>
    )
}

export default ManModel;