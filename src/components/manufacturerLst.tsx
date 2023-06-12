import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import { ManufacturerListType } from "../types/types";
import { Context} from "../global";


const ManufacturerLst= (Props: ManufacturerListType)=>{
  const [state, setState] = useContext(Context);
  const [ischecked, setIschecked] = useState(false);
  let newState = state;
  // newState[Props.man_id] = 0;
  setState(newState)
  useEffect(() => {
    // Check if state[Props.category_id] is 1 and set ischecked accordingly
    setIschecked(state[Props.man_id] === 1);
  }, [state, Props.man_id]);
    let str1: string = Props.man_id;
    // MY_GLOBAL_VAR.str = 0;
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      let str123 = Props.man_id
        if (event.target.checked) {
          let newState1 = state;
          newState1[Props.man_id] = 1;
          setIschecked(true);
          setState(newState1)
          console.log(state)
        //   MY_GLOBAL_VAR.str = 1;
        //   console.log(MY_GLOBAL_VAR.str)
        } else {
          let newState1 = state;
          newState1[Props.man_id] = 0;
          setIschecked(false)
          setState(newState1)
          console.log(state)
        //   MY_GLOBAL_VAR.str = 0;
        //   console.log(MY_GLOBAL_VAR.str)
        }
      };
    return (
        <div>
            <label htmlFor={Props.man_id}><input type="checkbox" checked={ischecked} onChange={handleChange} id= {Props.man_id}></input>{Props.man_name}</label>
      </div>
    )
}

export default ManufacturerLst;