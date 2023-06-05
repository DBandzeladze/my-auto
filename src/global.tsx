import React, { useState } from "react";
import { GlobalType, GloablRentType, GlobalCategoryType } from "./types/types";

const initialState: GlobalType = {
};
const initialStateCat: GlobalCategoryType = {

};

const initialStateRent: GloablRentType = {

};

export const Context = React.createContext<[GlobalType, React.Dispatch<React.SetStateAction<GlobalType>>]>([initialState, () => {}]);

export const Store: React.FC = () => {
  const [state, setState] = useState(initialState);

  return <Context.Provider value={[state, setState]}></Context.Provider>;
};

export const Context2 = React.createContext<[GlobalCategoryType, React.Dispatch<React.SetStateAction<GlobalCategoryType>>]>([initialStateCat, () => {}]);

export const Store2: React.FC = () => {
  const [state, setState] = useState(initialStateCat);

  return <Context2.Provider value={[state, setState]}></Context2.Provider>;
};


export const Context3 = React.createContext<[GloablRentType, React.Dispatch<React.SetStateAction<GloablRentType>>]>([initialStateRent, () => {}]);

export const Store3: React.FC = () => {
  const [state, setState] = useState(initialStateRent);

  return <Context3.Provider value={[state, setState]}></Context3.Provider>;
};


