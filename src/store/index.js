import React, { createContext, useContext } from 'react';
import { action, observable, computed } from 'mobx';
export default class Store {
    @observable tisdalesVariable = null;

    @computed get doesTisdaleHaveAValue() { return !!this.tisdalesVariable }
    @action changeTisdalesVariableAndDoOtherThings(newValue) {
        this.tisdalesVariable = newValue;
    }
//     @action async function findCatText(){
//         const resp = await fetch('https://cat-fact.herokuapp.com/facts')
//         const json = await resp.json()
//         store.tisdalesVariable = json.all[0].text
// }
}
const StoreContext = createContext();
export const StoreProvider = ({ children, store }) => {
    return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};
export const useStore = () => useContext(StoreContext);

export const withStore = (Component) => props => {
    return <Component {...props} store={useStore()} />;
