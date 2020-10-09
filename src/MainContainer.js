import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from './store';
const MainContainer = observer(() => {
    const store = useStore();
    async function findCatText(){
            const resp = await fetch('https://cat-fact.herokuapp.com/facts')
            const json = await resp.json()
            store.tisdalesVariable = json.all[0].text
    }
    return (
        <>

        <button onClick={() => findCatText()}>Text</button>
        
        
        
        </>
    );
});
export default MainContainer;