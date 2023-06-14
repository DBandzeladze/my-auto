import React, { useEffect } from "react";
import { CarInfoDataType } from "../types/types";
import { useState } from "react";
import { ManufacturerListType } from "../types/types";
import { ModelListType } from "../types/types";
import { info } from "console";
const url2 = "https://static.my.ge/myauto/js/mans.json";
const CarInfo = (props: CarInfoDataType)=>{
    const [manufacturer, SetManufacturer] = useState<ManufacturerListType[]>([]);
    const [modelList, SetModelList] = useState<ModelListType[]>([]);
    const [loading, setLoading] = useState(true);
    const fetchData = async () => {
        setLoading(true);
        try {
          const response2 = await fetch(url2);
          const response3 = await fetch(`https://api2.myauto.ge/ka/getManModels?man_id=${props.man_id}`)
          const responseData2 = await response2.json()
          const responseData3 = await response3.json()
          SetManufacturer(responseData2);
          SetModelList(responseData3.data);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      };
    
    useEffect(() => {
        fetchData();
    }, []);

    const wheelPosition = props.right_wheel ? "მარჯვენა" : "მარცხენა";
  const getFuelType = (fuelTypeId: number) => {
    switch (fuelTypeId) {
      case 2:
        return "ბენზინი";
      case 3:
        return "დიზელი";
      case 6:
        return "ჰიბრიდი";
      default:
        return "ელექტრო";
    }
  };

  // Mapping drive types
  const getDriveType = (gearType: number) => {
    switch (gearType) {
      case 2:
        return "ავტომატიკა";
      case 1:
        return "მექანიკა";
      case 3:
        return "ტიპტრონიკი";
      case 4:
        return "ვარიატორი";
      default:
        return "";
    }
  };
  const Ganbajeba = props.customs_passed ? "განბაჟებული" : "განბაჟება ";

    const str = `https://static.my.ge/myauto/photos/${props.photo}/thumbs/${props.car_id}_1.jpg?v=${props.photo_ver}`;
    if (loading) {
        return <></>;
    }
     // Calculate time difference
     const currentTime = new Date();
     const orderDate = new Date(props.order_date);
     const timeDifferenceMinutes = Math.floor((currentTime.getTime() - orderDate.getTime()) / (1000 * 60));
     const timeDifferenceHours = Math.floor(timeDifferenceMinutes / 60);
     const timeDifferenceDays = Math.floor(timeDifferenceHours / 24);
     const timeDifferenceMonths = Math.floor(timeDifferenceDays / 30);
     const timeDifferenceYears = Math.floor(timeDifferenceMonths / 12);
 
     let timeDifferenceText = "";
     if (timeDifferenceYears > 0) {
       timeDifferenceText = `${timeDifferenceYears} წლის წინ`;
     } else if (timeDifferenceMonths > 0) {
       timeDifferenceText = `${timeDifferenceMonths} თვის წინ`;
     } else if (timeDifferenceDays > 0) {
       timeDifferenceText = `${timeDifferenceDays} დღის წინ`;
     } else if (timeDifferenceHours > 0) {
       timeDifferenceText = `${timeDifferenceHours} საათის წინ`;
     } else if (timeDifferenceMinutes === 0) {
       timeDifferenceText = `წუთის წინ`;
     } else {
        timeDifferenceText = `${timeDifferenceMinutes} წუთის წინ`;
     }
     let carPrice : string = "";
     if (props.price_value === 0) {
        carPrice = "ფასი შეთანხმებით"
     }
     else {
        carPrice = `${props.price_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
     }
     let ForRent : string = "";
     if (props.for_rent) {
        ForRent = "ქირავდება"
     }
     else {
        ForRent = ""
     }
 
    return (
      <div className='flex flex-row w-[750px] h-[150px]   bg-white mb-4 p-[15px] rounded-[10px]'>

      <div className="flex"> {/* surati */}

          <img src={str} className="flex rounded-[6px]" alt="no Photo" width="182" height="144p" />

      </div>

       

      <div className="flex flex-col">    {/* infoebi */}

            <div className="flex flex-row mb-6 ml-[12px]">   {/* pirveli xazi */}

            <div className={`text-gray-800 text-[14px] font-normal ${props.for_rent ? 'bg-green-600 text-white h-[24px] text-[12px] mr-[5px] pr-[8px] pl-[8px] pb-[3px] pt-[1px]  rounded-[5px] h-[18px]' : ''}`}>

              {ForRent}

              </div>

              <div className="text-gray-800 text-[14px] font-medium ">  {/* sruli saxeli */}

                {`${manufacturer.filter((info) => info.man_id === props.man_id.toString()).find((info) => info.man_id === props.man_id.toString())?.man_name} ${modelList.filter((info)=>info.model_id === props.model_id).find((info)=>info.model_id===props.model_id)?.model_name} ${props.car_model}`}

              </div>

              <div className="text-gray-400 text-[14px]">  {/* weli */}

                <div className="col-sm-4">{props.prod_year}წ</div>

              </div>

              <div>

                  {/* ganbajeba */}

                  <div className="flex flex-col justify-center items-center ml-[20px]">

                    {Ganbajeba === "განბაჟება "

                      ? <span style={{ color: 'red' }}>

                        <div className="text-[12px]">

                          განბაჟება

                        </div>

                        </span>

                      : <span style={{ color: 'green' }}>

                        <div className="flex flex-row items-center">

                          <div className="mr-[5px]">

                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none" xmlns="http://www.w3.org/2000/svg">

                                <path d="M1.40305 2.48254C1.16363 2.48219 0.934098 2.58333 0.76597 2.76326C0.419231 3.12087 0.410373 3.70665 0.746123 4.07576L2.64248 5.73916C2.80254 5.90765 3.01979 6.00156 3.24583 5.99998C3.48591 5.9992 3.71597 5.89829 3.88589 5.71926L7.23106 1.57333C7.40286 1.39612 7.4998 1.15334 7.49999 0.899796C7.50131 0.660913 7.41207 0.431393 7.25213 0.262376C7.0922 0.0933586 6.87487 -0.00111312 6.64856 9.89896e-06C6.40815 0.000634795 6.17799 0.102869 6.00949 0.283877L3.29445 3.76151L2.00441 2.74231C1.84459 2.57473 1.62832 2.48093 1.40305 2.48149V2.48254Z" fill="#1EB676"/>

                              </svg>

                          </div>

                          <div className="text-[12px]">

                              განბაჟებული

                          </div>

                        </div>

                     

                         

                        </span>

                    }

                  </div>

                </div>

            </div>




            <div className="flex flex-row mb-4 ml-[12px]"> {/* meore xazi */}

              <div className="flex flex-row mr-[70px] w-[174px]">  {/* ragaca dzravi */}

                <div className="flex mr-[6px]">

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.525 2c-.388 0-.703.35-.703.783 0 .433.315.783.703.783h1.808v1.707H5.686a.662.662 0 0 0-.465.19L4.004 6.665h-.667a.654.654 0 0 0-.658.65v1.23H1.5V7.134a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v4.95c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77v-1.998H2.68v1.871c0 .36.294.65.658.65h.667l1.217 1.203c.124.121.29.19.465.19h5.17c.142 0 .28-.046.395-.13l1.88-1.393a.648.648 0 0 0 .263-.52v-1.871H14.5v1.998c0 .425.336.77.75.77a.76.76 0 0 0 .75-.77v-4.95a.76.76 0 0 0-.75-.77.76.76 0 0 0-.75.77v1.411h-1.106v-1.23a.646.646 0 0 0-.193-.46l-1.41-1.392a.662.662 0 0 0-.465-.19H8.74V3.566h1.807c.389 0 .704-.35.704-.783 0-.432-.315-.783-.704-.783H5.525zm-.783 5.775 1.217-1.202h5.094l1.025 1.011v4.049L10.637 12.7H5.959l-1.217-1.202a.662.662 0 0 0-.465-.19h-.282V7.964h.282a.662.662 0 0 0 .465-.19z" fill="#9CA2AA"></path></svg>

                </div>

                <div className="flex text-[13px]">

                    {`${(props.engine_volume/1000).toPrecision(2)} ${getFuelType(props.fuel_type_id)}`}

                </div>

           

              </div>




              <div className="flex flex-row items-center mr-[70px]">   {/* gavlili mandzili */}

                <div className="flex mr-[6px]">

                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.3" stroke="#9CA2AA" stroke-width="1.4"></circle><circle cx="8" cy="8" r="1.3" stroke="#9CA2AA" stroke-width="1.4"></circle><path d="M12 8a4 4 0 0 0-8 0" stroke="#9CA2AA" stroke-width="1.4" stroke-linecap="round"></path><path d="m9 7 1.5-1.5" stroke="#9CA2AA" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                </div>

                <div className="flex text-[13px]">

                    {props.car_run} კმ

                </div>

              </div>




              <div className="flex flex-row items-center text-[20px] font-semibold">   {/* tanxa */}

                {(props.price_value == 0)?(
                 <div className="mr-[5px] text-[13px] font-normal">
                 {carPrice}</div>
                ):(<><div className="mr-[5px] text-[20px] font-medium">
                  {carPrice}</div>
                  <div>
                  <span className="d-flex text-[17px] align-items-center justify-content-center w-24px h-24px rounded-circle cursor-pointer bg-gray-350 text-gray-800 icon-gray-800"><svg xmlns="http://www.w3.org/2000/svg" width="10px" height="11px" viewBox="0 0 10 11"><path id="GEL" d="M313.914-18v-1.689h-3.663a2.938,2.938,0,0,1-1.643-.46,3,3,0,0,1-1.089-1.3,4.608,4.608,0,0,1-.384-1.94,5,5,0,0,1,.343-1.987,2.543,2.543,0,0,1,1.112-1.225v3.372h.894v-3.64a2.492,2.492,0,0,1,.48-.044,2.936,2.936,0,0,1,.5.044v3.64h.894V-26.6a2.469,2.469,0,0,1,1.134,1.24,5.547,5.547,0,0,1,.343,2.132H315a6.022,6.022,0,0,0-.439-2.324,4.874,4.874,0,0,0-1.263-1.8,4.534,4.534,0,0,0-1.939-1.019V-29h-.894v.472l-.236-.007q-.081-.007-.236-.007-.347,0-.51.015V-29h-.894v.631a4.67,4.67,0,0,0-1.891.982,4.823,4.823,0,0,0-1.256,1.671A4.872,4.872,0,0,0,305-23.67a5.7,5.7,0,0,0,.229,1.61,4.62,4.62,0,0,0,.672,1.4,3.294,3.294,0,0,0,1.056.968v.058h-1.411V-18Z" transform="translate(-305 29)" fill="#272a37"></path></svg></span>
                </div></>)}
                {/* <div>
                  <span className="d-flex text-[17px] align-items-center justify-content-center w-24px h-24px rounded-circle cursor-pointer bg-gray-350 text-gray-800 icon-gray-800"><svg xmlns="http://www.w3.org/2000/svg" width="10px" height="11px" viewBox="0 0 10 11"><path id="GEL" d="M313.914-18v-1.689h-3.663a2.938,2.938,0,0,1-1.643-.46,3,3,0,0,1-1.089-1.3,4.608,4.608,0,0,1-.384-1.94,5,5,0,0,1,.343-1.987,2.543,2.543,0,0,1,1.112-1.225v3.372h.894v-3.64a2.492,2.492,0,0,1,.48-.044,2.936,2.936,0,0,1,.5.044v3.64h.894V-26.6a2.469,2.469,0,0,1,1.134,1.24,5.547,5.547,0,0,1,.343,2.132H315a6.022,6.022,0,0,0-.439-2.324,4.874,4.874,0,0,0-1.263-1.8,4.534,4.534,0,0,0-1.939-1.019V-29h-.894v.472l-.236-.007q-.081-.007-.236-.007-.347,0-.51.015V-29h-.894v.631a4.67,4.67,0,0,0-1.891.982,4.823,4.823,0,0,0-1.256,1.671A4.872,4.872,0,0,0,305-23.67a5.7,5.7,0,0,0,.229,1.61,4.62,4.62,0,0,0,.672,1.4,3.294,3.294,0,0,0,1.056.968v.058h-1.411V-18Z" transform="translate(-305 29)" fill="#272a37"></path></svg></span>
                </div> */}



              </div>

            </div>




            <div className="flex flex-row mb-4 ml-[12px]"> {/* mesame xazi */}

              <div className="flex flex-row mr-[70px] w-[174px]">   {/* ragaca dzravi2 :ddd */}

                <div className="mr-[6px]">

                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="2.6" y="7.6" width="10.8" height="7.8" rx="1.2" stroke="#8C929B" stroke-width="1.2"></rect><path d="M8 5v5" stroke="#8C929B" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"></path><path d="M8 12v1.5" stroke="#8C929B" stroke-linecap="round" stroke-linejoin="round"></path><circle cx="8" cy="2.5" r="1.8" stroke="#8C929B" stroke-width="1.4"></circle><path d="M5 10v3M11 10v3" stroke="#8C929B" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                </div>

                <div className="text-[13px]">

                    {getDriveType(props.gear_type_id)}

                </div>

               

              </div>

              <div className="flex flex-row items-center mr-[70px] "> {/* sawe */}

                    <div className="flex mr-[6px]">

                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="8" cy="8" r="6.3" stroke="#9CA2AA" stroke-width="1.4"></circle><circle cx="8" cy="8" r="1.3" stroke="#9CA2AA" stroke-width="1.4"></circle><path d="m9.5 8 4-1.5M6.214 8 2 7.299M8 9.5V14" stroke="#9CA2AA" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"></path></svg>

                    </div>

                    <div className="flex text-[13px]">

                        {wheelPosition}

                    </div>

                     

              </div>  

            </div>




            <div className="flex flex-row ml-[12px] pl-[48px]"> {/* meotxe xazi */}

              <div className="mr-4 text-[12px] text-gray-400">

                {props.views} ნახვა  

              </div>

              <div className="mr-4 text-[12px] text-gray-400">

                .

              </div>

              <div className="text-[12px] text-gray-400">

              {timeDifferenceText}

              </div>

              <div className="flex flex-row items-center ml-[200px]">   {/* prosta logoebi */}




                <div className="mr-[10px]">  {/* fanqari */}

                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <path d="M3.97263 12H1.13887C0.837056 11.9996 0.547728 11.8795 0.334315 11.6661C0.120902 11.4527 0.000820663 11.1633 0.00039677 10.8615V8.22326C0.000356181 8.07433 0.0297842 7.92687 0.0869853 7.78937C0.144186 7.65186 0.22803 7.52704 0.333686 7.42208L7.41848 0.33328C7.6321 0.119873 7.92171 0 8.22366 0C8.52562 0 8.81522 0.119873 9.02885 0.33328L11.6663 2.97155C11.8797 3.18517 11.9996 3.47478 11.9996 3.77673C11.9996 4.07869 11.8797 4.36829 11.6663 4.58191L5.58219 10.6668H11.0566C11.2334 10.6668 11.403 10.7371 11.528 10.8621C11.653 10.9871 11.7232 11.1566 11.7232 11.3334C11.7232 11.5102 11.653 11.6798 11.528 11.8048C11.403 11.9298 11.2334 12 11.0566 12H3.97263ZM1.33355 10.6668H2.36306L1.33355 9.63733V10.6668ZM3.97343 10.3912L8.73001 5.63466L6.36654 3.27119L1.60996 8.02777L3.97343 10.3912ZM9.67219 4.69248L10.5879 3.77673L8.22447 1.41326L7.30792 2.32901L9.67219 4.69248Z" fill="#6F7383"/>

                  </svg>




                </div>




                <div className="mr-[10px]"> {/* gadaxazuli manqana */}

                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none" xmlns="http://www.w3.org/2000/svg">

                    <path fill-rule="evenodd" clip-rule="evenodd" d="M8.25893 14.3789V1.61978C8.28343 1.25628 8.60762 0.979985 8.98481 1.00114C9.362 0.979985 9.68619 1.25628 9.71069 1.61978V14.3789C9.68657 14.7427 9.36239 15.0196 8.98481 14.9989C8.60723 15.0196 8.28305 14.7427 8.25893 14.3789ZM12.6142 14.2984C12.2133 14.2984 11.8884 13.9851 11.8884 13.5986H11.1625V12.2514H14.9189V8.76632L14.8884 8.69633H11.1625V7.2967H14.2533L12.9569 4.44634H11.1625V3.10059H13.0251C13.5064 3.10567 13.9391 3.38467 14.1277 3.8116L15.7108 7.2995H16.2741C16.675 7.2995 17 7.61282 17 7.99932C17 8.38581 16.675 8.69913 16.2741 8.69913H16.2436V12.9253C16.2526 13.2872 15.9563 13.5879 15.5809 13.5979H15.5178C15.5178 13.9844 15.1928 14.2977 14.7919 14.2977L12.6142 14.2984ZM2.4519 13.5985C2.4519 13.985 2.77689 14.2984 3.17778 14.2984L5.35542 14.2963C5.75632 14.2963 6.0813 13.9829 6.0813 13.5964H6.80718V12.2514H3.05003V8.7691L3.07979 8.69912H6.80718V7.29948H3.71493L5.0099 4.44632H6.80718V3.10057H4.9424C4.46076 3.1052 4.02766 3.3843 3.83906 3.81159L2.25591 7.29948H1.69626C1.30381 7.30789 0.99244 7.62092 1.00014 7.9993C0.992841 8.37753 1.30398 8.69032 1.69626 8.69912H1.72602V12.9253C1.71667 13.287 2.01224 13.5879 2.3873 13.5985H2.4519Z" fill="#6F7383"/>

                    <path d="M8.25893 1.61978L8.20893 1.61641V1.61978H8.25893ZM8.25893 14.3789H8.20882L8.20904 14.3822L8.25893 14.3789ZM8.98481 1.00114L8.98199 1.05137L8.98761 1.05106L8.98481 1.00114ZM9.71069 1.61978H9.7608L9.76058 1.61642L9.71069 1.61978ZM9.71069 14.3789L9.76069 14.3822V14.3789H9.71069ZM8.98481 14.9989L8.98757 14.9487L8.98207 14.949L8.98481 14.9989ZM11.8884 13.5986H11.9384V13.5486H11.8884V13.5986ZM12.6142 14.2984V14.3484H12.6143L12.6142 14.2984ZM11.1625 13.5986H11.1125V13.6486H11.1625V13.5986ZM11.1625 12.2514V12.2014H11.1125V12.2514H11.1625ZM14.9189 12.2514V12.3014H14.9689V12.2514H14.9189ZM14.9189 8.76632H14.9689V8.7559L14.9648 8.74635L14.9189 8.76632ZM14.8884 8.69633L14.9343 8.67636L14.9212 8.64633H14.8884V8.69633ZM11.1625 8.69633H11.1125V8.74633H11.1625V8.69633ZM11.1625 7.2967V7.2467H11.1125V7.2967H11.1625ZM14.2533 7.2967V7.3467H14.331L14.2988 7.276L14.2533 7.2967ZM12.9569 4.44634L13.0024 4.42564L12.989 4.39634H12.9569V4.44634ZM11.1625 4.44634H11.1125V4.49634H11.1625V4.44634ZM11.1625 3.10059V3.05059H11.1125V3.10059H11.1625ZM13.0251 3.10059L13.0256 3.05059H13.0251V3.10059ZM14.1277 3.8116L14.082 3.83181L14.0822 3.83227L14.1277 3.8116ZM15.7108 7.2995L15.6653 7.32016L15.6786 7.3495H15.7108V7.2995ZM16.2436 8.69913V8.64913H16.1936V8.69913H16.2436ZM16.2436 12.9253H16.1936L16.1937 12.9266L16.2436 12.9253ZM15.5809 13.5979V13.6479L15.5822 13.6478L15.5809 13.5979ZM15.5178 13.5979V13.5479H15.4678V13.5979H15.5178ZM14.7919 14.2977V14.2477H14.7919L14.7919 14.2977ZM3.17778 14.2984V14.3484H3.17783L3.17778 14.2984ZM2.4519 13.5985H2.5019V13.5485H2.4519V13.5985ZM5.35542 14.2963V14.2463H5.35538L5.35542 14.2963ZM6.0813 13.5964V13.5464H6.0313V13.5964H6.0813ZM6.80718 13.5964V13.6464H6.85718V13.5964H6.80718ZM6.80718 12.2514H6.85718V12.2014H6.80718V12.2514ZM3.05003 12.2514H3.00003V12.3014H3.05003V12.2514ZM3.05003 8.7691L3.00401 8.74953L3.00003 8.75891V8.7691H3.05003ZM3.07979 8.69912V8.64912H3.04672L3.03378 8.67955L3.07979 8.69912ZM6.80718 8.69912V8.74912H6.85718V8.69912H6.80718ZM6.80718 7.29948H6.85718V7.24948H6.80718V7.29948ZM3.71493 7.29948L3.6694 7.27882L3.63733 7.34948H3.71493V7.29948ZM5.0099 4.44632V4.39632H4.97769L4.96437 4.42566L5.0099 4.44632ZM6.80718 4.44632V4.49632H6.85718V4.44632H6.80718ZM6.80718 3.10057H6.85718V3.05057H6.80718V3.10057ZM4.9424 3.10057V3.05057L4.94192 3.05057L4.9424 3.10057ZM3.83906 3.81159L3.88459 3.83225L3.8848 3.83178L3.83906 3.81159ZM2.25591 7.29948V7.34948H2.28813L2.30144 7.32015L2.25591 7.29948ZM1.69626 7.29948V7.24947L1.69519 7.24949L1.69626 7.29948ZM1.00014 7.9993L1.05017 8.00026L1.05013 7.99828L1.00014 7.9993ZM1.69626 8.69912L1.69514 8.74912H1.69626V8.69912ZM1.72602 8.69912H1.77602V8.64912H1.72602V8.69912ZM1.72602 12.9253L1.77602 12.9266V12.9253H1.72602ZM2.3873 13.5985L2.38587 13.6485H2.3873V13.5985ZM8.20893 1.61978V14.3789H8.30893V1.61978H8.20893ZM8.98761 0.951216C8.58476 0.928625 8.23549 1.22393 8.20904 1.61642L8.30882 1.62314C8.33136 1.28864 8.63048 1.03135 8.98201 1.05106L8.98761 0.951216ZM9.76058 1.61642C9.73413 1.22393 9.38486 0.928625 8.98201 0.951216L8.98761 1.05106C9.33914 1.03135 9.63826 1.28864 9.6608 1.62314L9.76058 1.61642ZM9.76069 14.3789V1.61978H9.66069V14.3789H9.76069ZM8.98207 15.0488C9.3853 15.071 9.73454 14.775 9.76058 14.3822L9.6608 14.3756C9.6386 14.7104 9.33947 14.9683 8.98755 14.949L8.98207 15.0488ZM8.20904 14.3822C8.23508 14.775 8.58431 15.071 8.98755 15.0488L8.98207 14.949C8.63015 14.9683 8.33102 14.7104 8.30882 14.3756L8.20904 14.3822ZM11.8384 13.5986C11.8384 14.0144 12.1875 14.3484 12.6142 14.3484V14.2484C12.2392 14.2484 11.9384 13.9557 11.9384 13.5986H11.8384ZM11.1625 13.6486H11.8884V13.5486H11.1625V13.6486ZM11.1125 12.2514V13.5986H11.2125V12.2514H11.1125ZM14.9189 12.2014H11.1625V12.3014H14.9189V12.2014ZM14.8689 8.76632V12.2514H14.9689V8.76632H14.8689ZM14.8426 8.7163L14.8731 8.78629L14.9648 8.74635L14.9343 8.67636L14.8426 8.7163ZM11.1625 8.74633H14.8884V8.64633H11.1625V8.74633ZM11.1125 7.2967V8.69633H11.2125V7.2967H11.1125ZM14.2533 7.2467H11.1625V7.3467H14.2533V7.2467ZM12.9113 4.46704L14.2078 7.3174L14.2988 7.276L13.0024 4.42564L12.9113 4.46704ZM11.1625 4.49634H12.9569V4.39634H11.1625V4.49634ZM11.1125 3.10059V4.44634H11.2125V3.10059H11.1125ZM13.0251 3.05059H11.1625V3.15059H13.0251V3.05059ZM14.1734 3.79139C13.9766 3.34581 13.5257 3.05587 13.0256 3.05059L13.0246 3.15058C13.4871 3.15547 13.9016 3.42352 14.082 3.83181L14.1734 3.79139ZM15.7564 7.27883L14.1732 3.79094L14.0822 3.83227L15.6653 7.32016L15.7564 7.27883ZM16.2741 7.2495H15.7108V7.3495H16.2741V7.2495ZM17.05 7.99932C17.05 7.58349 16.7009 7.2495 16.2741 7.2495V7.3495C16.6491 7.3495 16.95 7.64214 16.95 7.99932H17.05ZM16.2741 8.74913C16.7009 8.74913 17.05 8.41514 17.05 7.99932H16.95C16.95 8.35649 16.6491 8.64913 16.2741 8.64913V8.74913ZM16.2436 8.74913H16.2741V8.64913H16.2436V8.74913ZM16.2936 12.9253V8.69913H16.1936V12.9253H16.2936ZM15.5822 13.6478C15.9834 13.6372 16.3033 13.3153 16.2936 12.9241L16.1937 12.9266C16.2019 13.2592 15.9291 13.5386 15.5796 13.5479L15.5822 13.6478ZM15.5178 13.6479H15.5809V13.5479H15.5178V13.6479ZM14.7919 14.3477C15.2187 14.3477 15.5678 14.0137 15.5678 13.5979H15.4678C15.4678 13.955 15.1669 14.2477 14.7919 14.2477V14.3477ZM12.6143 14.3484L14.7919 14.3477L14.7919 14.2477L12.6142 14.2484L12.6143 14.3484ZM3.17778 14.2484C2.80276 14.2484 2.5019 13.9557 2.5019 13.5985H2.4019C2.4019 14.0144 2.75101 14.3484 3.17778 14.3484V14.2484ZM5.35538 14.2463L3.17773 14.2484L3.17783 14.3484L5.35547 14.3463L5.35538 14.2463ZM6.0313 13.5964C6.0313 13.9536 5.73044 14.2463 5.35542 14.2463V14.3463C5.78219 14.3463 6.1313 14.0123 6.1313 13.5964H6.0313ZM6.80718 13.5464H6.0813V13.6464H6.80718V13.5464ZM6.75718 12.2514V13.5964H6.85718V12.2514H6.75718ZM3.05003 12.3014H6.80718V12.2014H3.05003V12.3014ZM3.00003 8.7691V12.2514H3.10003V8.7691H3.00003ZM3.03378 8.67955L3.00401 8.74953L3.09604 8.78867L3.1258 8.71868L3.03378 8.67955ZM6.80718 8.64912H3.07979V8.74912H6.80718V8.64912ZM6.75718 7.29948V8.69912H6.85718V7.29948H6.75718ZM3.71493 7.34948H6.80718V7.24948H3.71493V7.34948ZM4.96437 4.42566L3.6694 7.27882L3.76046 7.32015L5.05543 4.46699L4.96437 4.42566ZM6.80718 4.39632H5.0099V4.49632H6.80718V4.39632ZM6.75718 3.10057V4.44632H6.85718V3.10057H6.75718ZM4.9424 3.15057H6.80718V3.05057H4.9424V3.15057ZM3.8848 3.83178C4.06516 3.42316 4.48008 3.15502 4.94288 3.15057L4.94192 3.05057C4.44144 3.05538 3.99016 3.34543 3.79332 3.79139L3.8848 3.83178ZM2.30144 7.32015L3.88459 3.83225L3.79353 3.79092L2.21038 7.27881L2.30144 7.32015ZM1.69626 7.34948H2.25591V7.24948H1.69626V7.34948ZM1.05013 7.99828C1.04303 7.64919 1.33073 7.35733 1.69733 7.34947L1.69519 7.24949C1.27688 7.25846 0.941854 7.59265 0.95015 8.00032L1.05013 7.99828ZM1.69738 8.64913C1.33092 8.64091 1.0434 8.34925 1.05013 8.00026L0.950149 7.99833C0.942286 8.40581 1.27704 8.73973 1.69514 8.7491L1.69738 8.64913ZM1.72602 8.64912H1.69626V8.74912H1.72602V8.64912ZM1.77602 12.9253V8.69912H1.67602V12.9253H1.77602ZM2.38872 13.5486C2.03949 13.5386 1.76741 13.259 1.776 12.9266L1.67604 12.924C1.66593 13.3149 1.985 13.6371 2.38588 13.6485L2.38872 13.5486ZM2.4519 13.5485H2.3873V13.6485H2.4519V13.5485Z" fill="#6F7383"/>

                    </svg>

                </div>

                 




                <div className="mr-[10px]">  {/* guli */}

                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">

                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.68574 1.1679C7.51267 1.29346 7.3477 1.43458 7.19095 1.5894L7.0626 1.72088L7 1.78989L6.9374 1.72088L6.80905 1.5894C6.6523 1.43458 6.48733 1.29346 6.31426 1.1679C5.73288 0.746143 5.06008 0.5 4.3 0.5C1.58473 0.5 0 2.87655 0 5.304C0 7.67851 1.19139 9.74058 3.13701 11.4002C4.50533 12.5673 6.2954 13.5 7 13.5C7.705 13.5 9.49499 12.5674 10.8633 11.4002C12.8088 9.74063 14 7.67852 14 5.304C14 2.87655 12.4153 0.5 9.7 0.5C8.93992 0.5 8.26711 0.746144 7.68574 1.1679ZM5.67538 2.71857C5.23895 2.2911 4.78989 2.1 4.3 2.1C2.75142 2.1 1.6 3.44771 1.6 5.304C1.6 7.08759 2.48098 8.73759 4.17536 10.1829C4.76665 10.6872 5.46051 11.1489 6.07374 11.4778C6.37967 11.6419 6.64224 11.7605 6.84224 11.8338C6.91231 11.8595 6.96436 11.8758 7.00009 11.886C7.03585 11.8758 7.08795 11.8595 7.1581 11.8338C7.35812 11.7605 7.62069 11.6419 7.92662 11.4778C8.53983 11.1489 9.23365 10.6873 9.82495 10.1829C11.5191 8.73772 12.4 7.08768 12.4 5.304C12.4 3.44771 11.2486 2.1 9.7 2.1C9.21011 2.1 8.76105 2.29109 8.32462 2.71857L8.228 2.81755L7 4.17143L5.77199 2.81755L5.67538 2.71857Z" fill="#6F7383"/>

                  </svg>

                 

                </div>

               

              </div>

            </div>

        </div>

       

    </div>
    )
}

export default CarInfo;