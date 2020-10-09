import React from 'react';
import { observer } from 'mobx-react';
import { useStore } from './store';
const OtherContainer = observer(() => {
    const store = useStore();
    async function findCatText(){
            const resp = await fetch('https://cat-fact.herokuapp.com/facts')
            const json = await resp.json()
            store.tisdalesVariable = json.all[0].text
    }
    return (
        <>

         {store.doesTisdaleHaveAValue && <h1>The value is: {store.tisdalesVariable}</h1>}
        
        
        </>
    );
});
export default OtherContainer;