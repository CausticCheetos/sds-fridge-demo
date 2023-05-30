const baseUrl = 'http://127.0.0.1:8000'

const getMaxi = () => {
    return fetch(`${baseUrl}/maxigauge/latest/`)
        .then((response) => response.json())
}

const getRTP = () => {
    return fetch(`${baseUrl}/rtp/`)
        .then((response) => response.json())
}

const getValves = () => {
    return fetch(`${baseUrl}/valves/latest`)
    .then((response) => response.json())
} 

const getFlow = () => {
    return fetch(`${baseUrl}/flow/latest`)
    .then((response) => response.json())
} 

const createEmail = async(email) => {
    await fetch(`${baseUrl}/create_Email/`,{
        method: 'POST',
        headers: {
            // 'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
        })
}

const getEmail = (id) => {
    return fetch(`${baseUrl}/emailDetail/${id}`)
    .then((response) => response.json())
} 

const getEmails = () => {
    return fetch(`${baseUrl}/getEmails`)
    .then((response) => response.json())
} 

const updateEmail = async(email) => {
    await fetch(`${baseUrl}/update_Email/`,{
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(email)
        })
    }

const deleteEmail = (id) => {
    fetch(`${baseUrl}/delete_Email/${id}`,{method: "DELETE"})
}

const exported = {
    getMaxi,
    getRTP,
    getValves,
    getFlow,
    createEmail,
    getEmail,
    getEmails,
    updateEmail,
    deleteEmail
}

export default exported