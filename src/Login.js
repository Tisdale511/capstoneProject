import React from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react'
import api from './services/api.js'

const Login = observer (() => {
    const store = useStore();

    const handleUsernameEntry = (event) => {
        store.loginUsername = event.target.value
    }

    const handlePasswordEntry = (event) => {
        store.loginPassword = event.target.value
    }

    const attemptLogin = async() => {
        store.isAuthenticating = true
        const response = await api.userLogin({username: store.loginUsername, password: store.loginPassword});
        store.isAuthenticating = false

        if(response.status === 200){
            const json = await response.json()
            localStorage.setItem('authToken', json.token)
            store.isLoggedIn = true
            store.currentPage = "UserContainer"
        }

    }

    
    return (
        <div>
            <label>
                Username:
                <input id='usernameLogin' type="text" name="name" value={store.loginUsername} onChange={handleUsernameEntry}/>
            </label>
            <br></br>
            
            <label>
                Password:
                <input type="text" name="name" value={store.loginPassword} onChange={handlePasswordEntry}/>
            </label>
            <br></br>
                <button id='userLoginButton' disabled={store.isAuthenticating} onClick={attemptLogin} >
                    Login
                </button>
        </div>
    )
})

export default Login
