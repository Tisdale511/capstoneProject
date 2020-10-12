import React, { createContext, useContext } from 'react';
import { action, observable, computed } from 'mobx';

export default class Store {
    @observable isLoggedIn = false;
    @observable username = null;
    @observable currentPage = 'HomePage'  // HomePage, Login, Signup, UserContainer
    @observable signupUsername = ''
    @observable signupPassword = ''
    @observable isAuthenticating = false;
    @observable isFetching = false;
    @observable loginUsername = ''
    @observable loginPassword = ''

    // @computed get isLoggedIn() {         Other ways of doing things          What computed values are for
    //     return !!this.username;
    // }

    // @action logout() {                     If i used the other way of doing things, this would be one way to log out
    //     this.username = null;
    // }

    // @action logout() {                                     this is one of the ways I'll log out AS THINGS ARE NOW
    //     //do other things related to logging out
    //     this.isLoggedIn = false;
    // }

    @action setPage(newPage) {
        const store = this;
        if (store.currentPage !== newPage) {
            store.currentPage = newPage;
        }
    }

}
const StoreContext = createContext();
export const StoreProvider = ({ children, store }) => {
    return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};
export const useStore = () => useContext(StoreContext);

export const withStore = (Component) => props => {
    return <Component {...props} store={useStore()} />}
