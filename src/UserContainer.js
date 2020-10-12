import React from 'react'
import { useStore } from './store'
import { observer } from 'mobx-react'
import api from './services/api.js'


const UserContainer = observer(() => {
    const store = useStore();

    return (
        <>
            UserContainer
        </>
    )
})

export default UserContainer
