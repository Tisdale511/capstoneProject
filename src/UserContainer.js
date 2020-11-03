import React from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react'
import { Container, Row, Col,  Button } from 'reactstrap';
import api from './services/api.js'
import CandidateCard from './CandidateCard'




const UserContainer = observer(() => {
    const store = useStore();

    const queryAddress = async () => {
        // console.time('address')
        const search = store.address;
        const key = api.apiKey;

        let result = {ok: false};
    
        let response = await fetch(`https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${search}&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&key=${key}`)
        
        console.log(response)

        if (response.ok) {
            let json = await response.json();
            // debugger
            const {line1, city, state, zip} = json.normalizedInput;
            result.normalizedAddress = `${line1}  ${city}, ${state} ${zip}`
    
            const divisionKeys = Object.keys(json.divisions)
    
            // Google formats XXXXXXX's Congressional District or <State> for us
            // Object keys not predictable but the longest key is the most specific (state + district > state)
    
            const mostGranularKey = divisionKeys.reduce((res, ele)=>{if (ele.length > res.length) res = ele; return res;}, '')
            result.addressRegion = json.divisions[mostGranularKey].name.replace(' congressional', '');
            
            let divisions = divisionKeys.map(d=>d.slice(d.lastIndexOf('/') + 1));
    
            divisions.forEach(i=>{
                let [type, value] = i.split(':');
                result[type] = value.toUpperCase();
            })
    
            if (result.state && result.cd) {
                result.ok = true;
            } else if (['DE', 'VT', 'WY', 'MT', 'ND', 'AK', 'SD'].includes(result.state)) {
                result.cd = '0';
                result.ok = true;
                result.addressRegion += "'s At-Large District"
            }
        } else {
            console.error('Malformed Address. Please try again.');
        }
        // console.timeEnd('address');

        if(result.cd && result.cd.length === 1){
            result.cd = '0' + result.cd
        }
        return result;
    }

    const checkAddressInput = async () => {
        const result = await queryAddress();
        // debugger
        if (result.ok) {
            console.log(result)
            //address search successful!
            //we will want to show user options based on the state/district combo we ascertained 
            // we have      result.state      and result.cd     which we will put SOMEWHERE in the store and then REACTION to that changing
            store.districtState = result.state;
            store.districtNumber = result.cd;

        } else {
            //address search NOT successful, what else do we want to do?
            //we will want to give an error message back to the user (by setting Store variables / values) so the user knows to try again
            window.alert('Address bad!')
        }
    }
    
    const handleAddressEntry = (event) => {
        store.address = event.target.value
    }
    

    return (
        <>
             {/* */}
            <div style={{
                    width: '50%',
                    margin: 'auto',
                    border: '3px blue',
                    padding: '10px'
                }}>  {/* adds a 5% margin on all sides of page */}
                <input type="text" style={{width: '100%'}} name="name" value={store.address} onChange={handleAddressEntry}/>
                <Button onClick={checkAddressInput} color="primary" style={{
                    marginLeft: '25%',
                    marginop: '3%',
                    border: '3px light blue',
                    padding: '10px'
                }}>
                    Find Politician by Address
                </Button>{' '}
            </div>
            <Container>
                <Row>
                    {store.hasPoliticiansLoaded && store.currentPoliticians.map(p =>
                        <Col xs="9" md="4" lg="3"> 
                            <CandidateCard candidate={p} />
                        </Col>)  
                    }
                </Row>
            </Container>

        </>
    )
})

export default UserContainer
