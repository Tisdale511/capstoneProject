import React, { createContext, useContext } from 'react';
import { action, observable, computed, reaction, flow } from 'mobx';
import api from '../services/api';

export default class Store {
    @observable isLoggedIn = false;
    @observable username = null;

    @observable currentPage = 'HomePage'  // HomePage, Login, Signup, UserContainer, TrackedCandidates

    @observable signupUsername = ''
    @observable signupPassword = ''
    @observable passwordConfirm = ''

    @observable isAuthenticating = false;
    @observable isFetching = false;
    
    @observable loginUsername = ''
    @observable loginPassword = ''
    @observable address = '23701 valencia Santa Clarita ca'
    
    @observable districtState = null
    @observable districtNumber = null
    @observable currentPoliticians = [];
    @observable topContributors = []
    @observable hasNoContributors = false

    @observable trackedPoliticians = [];
    
    @computed get hasTrackedPoliticians() {
        return !!this.trackedPoliticians.length
    }



    @computed get hasPoliticiansLoaded() {
        return !!this.currentPoliticians.length
    } 

    @computed get hasTopContributorsLoaded() {
        return !!this.topContributors.length
    }

    // @computed get isLoggedIn() {         Other ways of doing things          What computed values are for
    //     return !!this.username;
    // }

    // @action logout() {                     If i used the other way of doing things, this would be one way to log out
    //     this.username = null;
    // }

    @action showContributors(candidate_id) {
        this.hasNoContributors = false
        this.topContributors = []
        console.log(candidate_id)
        this.currentPage = 'ContributorView'
        api.top10Contributors(candidate_id)
        .then(res => res.json())
        .then(json => {
            this.topContributors = json
            this.hasNoContributors = !json.length
        })
        // .then(json => console.log(json))
    }

    @action logout() {                                    // this is one of the ways I'll log out AS THINGS ARE NOW
        // localStorage.setItem('authToken', json.token)
    this.isLoggedIn = false;
    localStorage.clear()
    this.trackedPoliticians = []
    this.currentPoliticians = []
    this.currentPage = "HomePage"
    }

    @action setPage(newPage) {
        const store = this;
        if (store.currentPage !== newPage) {
            store.currentPage = newPage;
        }
    }

    nameDoesntMatter = reaction(
        () => [this.districtState, this.districtNumber], ([state, number]) => {
            if (!state || !number) return;
                // alert(`It seems your state is ${state} and the district number is ${number}`)  
               api.candidateName(state, number)
                .then(res=>res.json())
                .then(json=>this.currentPoliticians = json)
                .then(()=>console.log(this.currentPoliticians));
               })
            //lets set OTHER store things, values (from fetch'es from our backend? [yes]) and MobX will continue reacting to that
            // ideally we now poll our own back-end and retrieve the names of candidates that match the state and district number
            //    and then we store that somewhere, like.....   validPoliticians, myPoliticians...localPoliticians....currentPoliticians....
                // const response = await fetch(api.candidateInfo), body: JSON.stringify({state: state, district: number})
                // const json = await response.json();         
                // store.currentPoliticians = response.candidate_name;
        
    

    // @action checkAddress = async() {
    //     const addressReply = await api.checkAddress(store.addressInput);
    // }        DOESNT WORK!    MOBX doesn't do AWAIT/ASYNC in store @actions     must use style below

    // checkAddress = flow(function* () {
    //     const store = this;

    //     store.checkingAddress = true;
    //     const addressReply = yield api.checkAddress(store.addressInput);
    //     store.checkingAddress = false;

    //     if (addressReply.ok) {
    //         store.state = addressReply.state;
    //         store.district = addressReply.cd;
    //         store.normalizedAddress = addressReply.normalizedAddress;
    //         store.addressRegion = addressReply.addressRegion;
    //         window.history.pushState({}, null, `/district/${store.state}/${store.district}`)
    //         store.sendEvent('Address Resolved', `${store.addressInput} : ${store.addressRegion}`);
    //         yield store.getVoterInfo();
    //         store.fetchS3Data();
    //         store.menuToastOpen = true;
    //     } else {
    //         store.sendEvent('Address Failed', store.addressInput);
    //         store.addressError = true;
    //     }

    // }).bind(this);

}
const StoreContext = createContext();
export const StoreProvider = ({ children, store }) => {
    return (<StoreContext.Provider value={store}>{children}</StoreContext.Provider>);
};
export const useStore = () => useContext(StoreContext);

export const withStore = (Component) => props => {
    return <Component {...props} store={useStore()} />}
