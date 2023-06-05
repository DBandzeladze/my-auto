import React, { useState } from "react";
import { GlobalType } from "./types/types";

const initialState: GlobalType = {
};

export const Context = React.createContext<[GlobalType, React.Dispatch<React.SetStateAction<GlobalType>>]>([initialState, () => {}]);

const Store: React.FC = () => {
  const [state, setState] = useState(initialState);

  return <Context.Provider value={[state, setState]}></Context.Provider>;
};

export default Store;
