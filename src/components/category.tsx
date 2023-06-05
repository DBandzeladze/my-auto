import React, { ChangeEvent, useContext } from "react";
import { CategoryType } from "../types/types";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Context2} from "../global";


const Category= (Props: CategoryType)=>{
    let str: string = Props.seo_title;
    const [state, setState] = useContext(Context2);
    let newState = state
    // newState[Props.category_id] = 0;
    setState(newState);
     // MY_GLOBAL_VAR.str = 0;
     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            let newState1 = state;
            newState1[Props.category_id] = 1;
            setState(newState1)
            console.log(state)
        //   MY_GLOBAL_VAR.str = 1;
        //   console.log(MY_GLOBAL_VAR.str)
        } else {
            let newState1 = state;
            newState1[Props.category_id] = 0;
            setState(newState1)
            console.log(state)
        //   MY_GLOBAL_VAR.str = 0;
        //   console.log(MY_GLOBAL_VAR.str)
        }
      };
    if (str === "sedani"){
        str = "სედანი"
    }else if (str === "jipi"){
        str = "ჯიპი"
    }else if (str === "kupe"){
        str = "კუპე"
    }else if (str === "hechbeqi"){
        str = "ჰეჩბექი"
    }else if (str === "universali"){
        str = "უნივერსალი"
    }else if (str === "kabrioleti"){
        str = "კაბრიოლეტი"
    }else if (str === "pikapi"){
        str = "პიკაპი"
    }else if (str === "miniveni"){
        str = "მინივენი"
    }else if (str === "mikroavtobusi"){
        str = "მიკროავტობუსი"
    }else if (str === "furgoni"){
        str = "ფურგონი"
    }else if (str === "limuzini"){
        str = "ლიმუზინი"
    } else {
        str = ""
    }

    return (
        <div>
            <label htmlFor={Props.seo_title}><input type="checkbox" onChange={handleChange} id={Props.seo_title}></input>{str}</label>
      </div>
    )
}

export default Category;