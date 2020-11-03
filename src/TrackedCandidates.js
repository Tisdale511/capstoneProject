import React from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react'
import { Container, Row, Col,  Button } from 'reactstrap';
import CandidateCard from './CandidateCard'

const TrackedCandidates = observer( () => {
    const store = useStore()
    return (
        <div>
            Tracked Candidates
            <Container>
                <Row>
                    {store.hasTrackedPoliticians && store.trackedPoliticians.map(p =>
                        <Col xs="9" md="4" lg="3"> 
                            <CandidateCard candidate={p} />
                        </Col>)  
                    }
                </Row>
            </Container>
        </div>
    )
})

export default TrackedCandidates
