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


    return (
        <div>
            <label>
                Username:
                <input type="text" name="name" value={store.loginUsername} onChange={handleUsernameEntry}/>
            </label>
            <br></br>
            
            <label>
                Password:
                <input type="text" name="name" value={store.loginPassword} onChange={handlePasswordEntry}/>
            </label>
            <br></br>

        </div>
    )
})

export default Login
