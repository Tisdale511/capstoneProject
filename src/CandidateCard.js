import React from 'react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const CandidateCard = ({candidate}) => {
    const {
        candidate_name, 
        candidate_party_affiliation: party, 
        candidate_incumbent_challenger_open_seat: incumbent, 
        candidate_office: office_sought } = candidate
    return (
        <div>
        {/* <div style={{textTransform: 'lowercase', textTransform: 'capitalize'}}> */}
            <Card>
            <CardBody>
            {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />     */}
                <CardTitle><b>{candidate_name}</b></CardTitle>
                <CardSubtitle>Party Affiliation: <b>{party}</b></CardSubtitle>
                <CardText>
                    Candidate Status: <b>{incumbent}</b><br></br>
                    Office Sought: <b>{office_sought}</b>
                </CardText>
                {/* <Button>Button</Button> */}
            </CardBody>
            </Card>
        </div>
    )
}

export default CandidateCard
