const API_ROOT = 'http://localhost:3000'
    
const apiKey = process.env.REACT_APP_API_KEY

const postUserInfo = async (user) => {
    console.log(user);
    const config = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(user)
    }
    return await fetch(`${API_ROOT}/api/v1/users`, config)
}


const createLoginToken = async ({username, password}) => {
    const config = {
        method: 'POST',
        headers: requestHeaders(false),
        body: JSON.stringify({username, password})
    }
    // console.log(config)
    return await fetch(`${API_ROOT}/login`, config)
}

// const createLoginToken = async ({username, password}) => {
//     const config = {
//         method: 'POST',
//         headers: requestHeaders(false),
//         body: JSON.stringify({username, password})
//     }
//     // console.log(config)
//     return await fetch(`${API_ROOT}/login`, config)
// }

const requestHeaders = (authToken = true) => {
    const headers = {
      "Content-Type": "application/json",
      Accept: "application/json",
    };
    if (authToken) headers.Authorization = localStorage.getItem("authToken");
    return headers;
  }

const findServantByAddress = async(address, apiKey) => {
    const config = {
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify({address, apiKey})
    }
    return fetch(`https://civicinfo.googleapis.com/civicinfo/v2/representatives?address=${address}&includeOffices=true&levels=country&roles=legislatorLowerBody&roles=legislatorUpperBody&key=${apiKey}`, config)
}  

const findCommitteeContributions = async() => {
    const config = {
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },

    }
    return await fetch(`${API_ROOT}/api/v1/parsed_contribution_info`, config)
} 

const findPacInfo = async() => {
    const config = {
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },

    }
    return await fetch(`${API_ROOT}/api/v1/parsed_pac_info`, config)
} 

const findCandidateNameFromStateAndDistrict = (state, number) => {
    const data = {
         state: state, 
         district: number
     }
     return fetch(`${API_ROOT}/api/v1/candidate_search_district_number_and_state`,{
        method: 'POST', 
        headers: requestHeaders(true),
        
        body: JSON.stringify(data)
     })
     .then(res => res.json())
     .then(json => json.map(json => {
         console.log(json.candidate_name)
        return json.candidate_name
     }))
} 
// componentDidMount() {
//     this.findCandidateNameFromStateAndDistrict(state, number)
// }

const findCandidateInfo = async() => {
    const config = {
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },

    }
    return await fetch(`${API_ROOT}/candidate_search_district_number_and_state`, config)
} 

export default {
    userLogin: createLoginToken,
    createUser: postUserInfo,
    findServantByAddress: findServantByAddress,
    apiKey: apiKey,
    committeeContributions: findCommitteeContributions,
    pacInfo: findPacInfo,
    candidateInfo: findCandidateInfo,
    candidateName: findCandidateNameFromStateAndDistrict
}

