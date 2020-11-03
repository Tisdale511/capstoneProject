import React, {useEffect} from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Container, Row, Col, Button
  } from 'reactstrap';


const ContributorView = observer(() => {
    const store = useStore();

    useEffect(() => {
        if(!store.hasNoContributors ){
            return 
        }
        setTimeout(() => {store.currentPage = 'UserContainer'}, 2500 )
    }, [store.hasNoContributors])
    
    return (
        <>
            <div>
                <Button color="primary" onClick={() => store.currentPage = 'UserContainer'}> Return to search </Button>
                { !store.hasTopContributorsLoaded && !store.hasNoContributors && <div>Loading...</div> }
                { store.hasNoContributors && <div>No contributors found. Returning to search</div>}
                <div style={{
                    textAlign: 'center'
                }} >
                    {/* Candidate Name Here */}
                </div>
                <Container>
                { store.hasTopContributorsLoaded && store.topContributors.map(c => 
                <Card style={{
                    'padding-left': '2%',
                    'margin': '3%'
                }}>
                    <Row  >
                        {/* <Col width='75%'>     */}
                        <Col xs="auto">    
                            <div >
                                {`${c.name}: `}
                            </div>
                        </Col>
                        {/* <Col width='25%' >     */}
                        <Col xs="auto">    
                            <div>
                                <b>{`$${c.total}`}</b>
                            </div>
                        </Col>
                        </Row>
                </Card>
                )
                }
                </Container>
            </div>
            {/* <Container>
                <Row>
                    {store.hasPoliticiansLoaded && store.currentPoliticians.map(p =>
                        <Col xs="9" md="4" lg="3"> 
                            <CandidateCard candidate={p} />
                        </Col>)  
                    }
                </Row>
            </Container> */}
        </>
    )
})

export default ContributorView
