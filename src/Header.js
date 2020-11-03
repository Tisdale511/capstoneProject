import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from './store';
import { Button } from 'reactstrap';

const Header = observer(() => {
    const store = useStore();

    return (
        <>        
            <h3>
                {/* {store.isLoggedIn ? "You're logged in" : "You're not logged in"} */}
            </h3>
            {!store.isLoggedIn &&
                <>
                    <Button disabled={store.currentPage === 'Login'} color="secondary"  onClick={() => store.currentPage = 'Login'}  >Login</Button>
                    
                    <Button color="secondary" onClick={() => store.currentPage = 'Signup'} style={{
                        position: 'absolute',
                        right: '0px',
                    }}>Signup</Button>

                    
                </>}
            {store.isLoggedIn && 
                <>
                <Button disabled={store.currentPage === 'Login'} color="secondary"  onClick={() => store.currentPage = 'TrackedCandidates'}  >Tracked Politicians</Button>

                <Button disabled={store.currentPage === 'Login'} color="secondary"  onClick={() => store.currentPage = 'UserContainer'}  >Return to search</Button>
                    {/* <button onClick={() => store.currentPage = 'Login'}>Login</button>
                    <button onClick={() => store.currentPage = 'Signup'}>Signup</button>  */}
                    <Button color="secondary" onClick={() => {store.logout()}} >Logout</Button>
                </>}
        </>
    );
});
export default Header;