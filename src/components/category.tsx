import React, { ChangeEvent, useContext } from "react";
import { CategoryType } from "../types/types";
import { DropdownButton, Dropdown } from 'react-bootstrap';
import { Context2} from "../global";


const Category= (Props: CategoryType)=>{
    let str: string = Props.seo_title;
    const [state, setState] = useContext(Context2);
    let newState = state;
    setState(newState);
     const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            let newState1 = state;
            newState1[Props.category_id] = 1;
            setState(newState1)
            console.log(state)
        } else {
            let newState1 = state;
            newState1[Props.category_id] = 0;
            setState(newState1)
            console.log(state)
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
        str = Props.seo_title;
    }

    return (
        <div>
            <label htmlFor={Props.seo_title}><input type="checkbox" onChange={handleChange} id={Props.seo_title}></input>{str}</label>
      </div>
    )
}

export default Category;