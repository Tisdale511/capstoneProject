import React, {useEffect} from 'react';
import Signup from './Signup'
import Login from './Login'
import UserContainer from './UserContainer'
import HomePage from './HomePage.js'
import { observer } from 'mobx-react';
import { useStore } from './store';
import api from './services/api.js'

const MainContainer = observer(() => {
        const store = useStore();

        useEffect (async () => {console.log('appLoad')
        const token = localStorage.getItem('authToken')
        if(!token){
          console.log('No token found')
          return
        }
      
        const findToken = await api.validateToken()
        console.log(findToken)
      
        if(findToken.error){
          console.log('auto login failed')
        }else{
          console.log('auto login successful')
          store.isLoggedIn = true
          store.currentPage = 'UserContainer'
        }
      
      
        }, []) // the empty array won't change, which ensures that the function only runs once
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
            