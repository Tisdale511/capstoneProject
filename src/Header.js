import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from './store';

const Header = observer(() => {
    const store = useStore();

    return (
        <>        
            <h3>
                {/* {store.isLoggedIn ? "You're logged in" : "You're not logged in"} */}
            </h3>
            {!store.isLoggedIn &&
                <>
                    <button onClick={() => store.currentPage = 'Login'}>Login</button>
                    <button onClick={() => store.currentPage = 'Signup'}>Signup</button>
                </>}
            {store.isLoggedIn &&
                <>
                    {/* <button onClick={() => store.currentPage = 'Login'}>Login</button>
                    <button onClick={() => store.currentPage = 'Signup'}>Signup</button> */}
                    {/* <button onClick={() => store.logout()}>Logout</button> */}
                </>}
        </>
    );
});
export default Header;