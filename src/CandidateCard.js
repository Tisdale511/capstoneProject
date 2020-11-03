import React from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react'
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';
import api from './services/api.js'

const CandidateCard = observer (({candidate})  => {
    const store = useStore()
    const {
        candidate_name, 
        id: database_id,
        candidate_party_affiliation: party, 
        candidate_incumbent_challenger_open_seat: incumbent, 
        candidate_office: office_sought,
        candidate_id: candidate_id,
        has_contributors: has_contributors} = candidate

        const parties = {
            "REP": "Republican",
            "DEM": "Democrat",
            "LIB": "Libertarian",
            "IND": "Independent"

        }    

        const isFavorited = store.trackedPoliticians.some(p => database_id === p.id)
        console.log(`${candidate_name}: ${database_id}`)

        // const showContributors = (candidate_id) => {

        // }


        const handleFavoritesClick = async () => {

            const response = isFavorited ? await api.removeFavorite(database_id) : await api.addFavorite(database_id)
            const json = await response.json()
            store.trackedPoliticians = json.tracked || store.trackedPoliticians

            //has access to the database_id and isFavorited
            //call api.js function and pass ^^ these two values to delete or create accordingly
            //response = await api.setFavorite(database_id, isFavorited)
            //json = await response.json()
            //store.trackedPoliticians = json.tracked;
        }

    return (
        <div>
        {/* <div style={{textTransform: 'lowercase', textTransform: 'capitalize'}}> */}
            <Card>
            <CardBody>
            {/* <CardImg top width="100%" src="/assets/318x180.svg" alt="Card image cap" />     */}
                <CardTitle><b>{candidate_name}</b></CardTitle>
                <CardSubtitle>Party Affiliation: <b>{parties[party] || party}</b></CardSubtitle>
                <CardText>
                    Candidate Status: <b>{incumbent}</b><br></br>
                    Office Sought: <b>{office_sought}</b>
                </CardText>
                {/* <Button>Button</Button> */}
                <Button onClick={handleFavoritesClick}>{ isFavorited ? 'Watching' : 'Unwatched'}</Button>
                <Button onClick={
                () => {
                    has_contributors ? store.showContributors(candidate_id) : alert('This candidate has no contributors')}
                }>$$$</Button>
            </CardBody>
            </Card>
        </div>
    )
})

export default CandidateCard
