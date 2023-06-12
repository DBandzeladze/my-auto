import React, { useState } from "react";
import { GlobalType, GloablRentType, GlobalCategoryType, GlobalManModelType} from "./types/types";

const initialState: GlobalType = {
};
const initialStateCat: GlobalCategoryType = {

};

const initialStateRent: GloablRentType = {
  sale: 0, rent: 0
};
const initialStateManModel: GlobalManModelType = {

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

export const Context4 = React.createContext<[GlobalManModelType, React.Dispatch<React.SetStateAction<GlobalManModelType>>]>([initialStateManModel, () => {}]);

export const Store4: React.FC = () => {
  const [state, setState] = useState(initialStateManModel);

  return <Context4.Provider value={[state, setState]}></Context4.Provider>;
};

