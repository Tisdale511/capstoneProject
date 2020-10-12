import React from 'react';
import Signup from './Signup'
import Login from './Login'
import UserContainer from './UserContainer'
import HomePage from './HomePage.js'
import { observer } from 'mobx-react';
import { useStore } from './store';
const MainContainer = observer(() => {
        const store = useStore();
    return (
            <>
                { store.currentPage === 'HomePage' && <HomePage/> }
                { store.currentPage === 'Login' && <Login/> }
                { store.currentPage === 'Signup' && <Signup/> }
                { store.currentPage === 'UserContainer' && <UserContainer/> }
            </>
        );
    });
export default MainContainer;
            