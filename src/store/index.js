import React, { createContext, useContext } from 'react';
import { action, observable, computed } from 'mobx';
export default class Store {
    @observable tisdalesVariable = 'starting value';
    @computed get doesTisdaleHaveAValue() { return !!this.tisdalesVariable }
    @action changeTisdalesVariableAndDoOtherThings(newValue) {
        this.tisdalesVariable = newValue;
        //do other things if you'd like
    }
    
}
const StoreContext = createContext();
export const StoreProvider = ({ children, store }) => {
    return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};
export const useStore = () => useContext(StoreContext);