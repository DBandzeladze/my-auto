import React, { ChangeEvent } from "react";
import { CategoryType } from "../types/types";
import { DropdownButton, Dropdown } from 'react-bootstrap';


const Category= (Props: CategoryType)=>{
    let str: string = Props.seo_title;
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
            <label htmlFor={Props.category_id.toString()}><input type="checkbox" onChange={handleChange} id={Props.category_id.toString()}></input>{str}</label>
      </div>
    )
}

export default Category;