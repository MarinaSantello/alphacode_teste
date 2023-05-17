'use strict'

const url = 'http://127.0.0.1/senai/SENAI/teste_alphacode/app/api/'

const getContacts = async () => {
    const response = await fetch(url)
    return response.json()
}

const getContactById = async (id) => {
    const response = await fetch(`${url}?id=${id}`)
    return response.json()
}

const postContact = async (contact) => {
    console.log(contact);
    const options ={
        method: 'POST',
        body: JSON.stringify(contact),
        headers: {
            'content-type' : 'application/json'
        }
    }

    await fetch(url, options)
}

const deleteItem = async (id) => {
    const options = {
        method: 'DELETE'
    }

    const response = await fetch(`${url}?id=${id}`, options)
    return response.status
}

const updateItem = async (contact, id) => {
    console.log(contact);
    console.log(id);
    const options ={
        method: 'PUT',
        body: JSON.stringify(contact),
        headers: {
            'content-type' : 'application/json'
        }
    }

    await fetch(`${url}?id=${id}`, options)
}

export {
    getContacts,
    getContactById,
    postContact,
    deleteItem,
    updateItem
}