import React, { useEffect, useState } from 'react'
import { baseUrl, getRequest } from '../utils/services'

const UseFetchRecipientUser = (chat, user) => {
    const [recipientUser, setRecipientUser] = useState(null)
    const [error, setError] = useState(null)
    console.log("recipientUser : ", recipientUser);
    const recipientId = chat?.members.find((id) => id !== user?._id)
    useEffect(() => {
        const getUser = async () => {
            if (!recipientId) {
                return null
            }
            const response = await getRequest(`${baseUrl}/user/get-user/${recipientId}`)
            if (response.error) {
                return setError(error)
            }
            setRecipientUser(response)
        }
        getUser();
    }, [recipientId])

    return { recipientUser }
}

export default UseFetchRecipientUser