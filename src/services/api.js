const API_ROOT = 'http://localhost:3000'
    
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


const createLoginToken = async (token) => {
    console.log(token)
    const config = {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'accept': 'application/json'
        },
        body: JSON.stringify(token)
    }
    return await fetch(`${API_ROOT}/token`, config)
}

export default {
    userLogin: createLoginToken,
    createUser: postUserInfo
}
// import React from 'react';
// import { observer } from 'mobx-react';
// import { useStore } from './store';


// const store = useStore();

//     const API_ROOT = 'https://localhost:3000'

//     const postUserInfo = (user) => {
//         const config = {
//             method: 'POST',
//             headers: {
//                 'content-type': 'application/json',
//                 'accept: application/json'
//             },
//             body: JSON.stringify({user: user})
//         }
//         return fetch(`${API_ROOT}/users`, config)
//     }


// export default {
//     API_ROOT: API_ROOT,
//     createUser: postUserInfo()
// }

