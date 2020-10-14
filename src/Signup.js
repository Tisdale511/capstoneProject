import React from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react'
import api from './services/api.js'


const SignUp = observer(() => {
    const store = useStore();

    const handleChangeUsername = (event) => {
        store.signupUsername = event.target.value
    }
    
    const handleChangePassword = (event) => {
        store.signupPassword = event.target.value
    }
    const handleConfirm = (event) => {
        store.passwordConfirm = event.target.value
    }

    const checkPasswordValidity = () => {
        if (store.passwordConfirm !== store.signupPassword){
         return false;
        }else{
            return true;
        // if (store.passwordConfirm.length < 8) return false;
        // if (store.signupUsername.length < 3) return false;
        }
    }

    const attemptSignup = async () => {
        if (!checkPasswordValidity) {
            alert('Your password sux.');
            return;
        }

        store.isAuthenticating = true;
        const response = await api.createUser({username: store.signupUsername, password: store.signupPassword});
        store.isAuthenticating = false;
        
        if (response.status === 200){
            const user = await response.json()  //await avoids .then, waits until fetch is finished
            store.isLoggedIn = true        // add signup success message
            store.username = user.username 
            store.currentPage = 'HomePage';       // isLoggedIn true
        }else{
            window.alert('Username already taken')  // signup failed
        }
        
    }

    return (        
          <div>
            Create a new account
                <label>
                    Username:
                    <input type="text" name="name" value={store.signupUsername} onChange={handleChangeUsername} />
                </label>
                <br></br>

                <label>
                Password:
                    <input type="text" name="name"  value={store.signupPassword} onChange={handleChangePassword}/>
                </label>
                <br></br>

                {<label>
                Confirm Password:
                     <input type="text" name="name" value={store.passwordConfirm} onChange={handleConfirm} />
                 </label>}
                <button disabled={store.isAuthenticating} onClick={attemptSignup} >
                    Create Account
                </button>
        </div>
    )
})

export default SignUp
