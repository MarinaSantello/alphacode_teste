'use strict'

import { crateForm } from "./form.js"
import { getContactById, postContact, deleteItem, updateItem } from './contact.js'

function editContact() {
    const button = document.getElementsByClassName('edit')
    
    for (let i = 0; i < button.length; i++) {
        const element = button[i];
        element.addEventListener('click', async () => {

            localStorage.setItem('idContact', element.id)

            const dataAPI = await getContactById(element.id)

            let profession
            if(dataAPI.data[0].profession === null) profession = ''
            else profession = dataAPI.data[0].profession

            let phone
            if(dataAPI.data[0].phone === null) phone = ''
            else phone = dataAPI.data[0].phone

            const data = new Date(dataAPI.data[0].birth_date)
            
            let month
            if (String(data.getMonth() + 1).length <= 1) month = `0${(data.getMonth() + 1)}`
            else month = ((data.getMonth() + 1))
            
            let date
            if (String(data.getDate() + 1).length <= 1) date = `0${(data.getDate() + 1)}`
            else date = ((data.getDate() + 1))

            const dataFormatada = `${date}${month}${data.getFullYear()}`
            
            const inputsJSON = [
                {
                    "id": 'name',
                    "label": 'Nome completo',
                    "placeholder": 'Ex.: Marina Santello Pimentel',
                    "required": 'required',
                    "type": 'text',
                    "value": await dataAPI.data[0].name
                },
                {
                    "id": 'date',
                    "label": 'Data de nascimento',
                    "placeholder": 'Ex.: 03/10/2003',
                    "required": 'required',
                    "value": dataFormatada
                },
                {
                    "id": 'email',
                    "label": 'E-mail',
                    "placeholder": 'Ex.: marinasantello@gmail.com',
                    "required": 'required',
                    "type": 'email',
                    "value": await dataAPI.data[0].email
                },
                {
                    "id": 'profession',
                    "label": 'Profissão',
                    "placeholder": 'Ex.: Desenvolvedora Web',
                    "required": '',
                    "value": profession
                },
                {
                    "id": 'phone',
                    "label": 'Telefone para contato',
                    "placeholder": 'Ex.: (11) 4552-1180',
                    "required": '',
                    "type": 'text',
                    "value": phone
                },
                {
                    "id": 'cellphone',
                    "label": 'Celular para contato',
                    "placeholder": 'Ex.: (11) 95637-2791',
                    "required": 'required',
                    "value": await dataAPI.data[0].cellphone
                }
            ]

            let whatsapp
            if (await dataAPI.data[0].checked_wpp == 1) whatsapp = 'checked="true"'
            else whatsapp = ''

            let email
            if (await dataAPI.data[0].checked_email == 1) email = 'checked="true"'
            else email = ''

            let sms
            if (await dataAPI.data[0].checked_sms == 1) sms = 'checked="true"'
            else sms = ''

            const checkJSON = {
                "whatsapp": whatsapp,
                "email": email,
                "sms": sms
            }

            crateForm(inputsJSON, checkJSON)
        })        
    }
}

async function postFormData() {
    const name = document.getElementById('name').value

    let date = document.getElementById('date').value.split('/')
    date = date[2] + '-' + date[1] + '-' + date[0]

    const email = document.getElementById('email').value

    let profession = document.getElementById('profession').value

    let phone = document.getElementById('phone').value
    const ddd = phone.substring(1, 3)
    const number = (phone.substring(5, 9) + phone.substring(10, 14))
    phone = (ddd + number)

    let cellphone = document.getElementById('cellphone').value
    const dddCell = cellphone.substring(1, 3)
    const numberCell = (cellphone.substring(5, 10) + cellphone.substring(11, 15))
    cellphone = (dddCell + numberCell)

    let checked_wpp = 0
    let checked_sms = 0
    let checked_email = 0

    if (document.getElementById('check_whatsapp').checked)
        checked_wpp = 1;
        
    if (document.getElementById('check_sms').checked)
        checked_sms = 1;
    
    if (document.getElementById('check_email').checked)
        checked_email = 1;
    
    const JSONpost = {
        "name": name,
        "birth_date": date,
        "email": email,
        "profession": profession,
        "phone": phone,
        "cellphone": cellphone,
        "checked_wpp": checked_wpp,
        "checked_sms": checked_sms,
        "checked_email": checked_email,
    }

    await postContact(JSONpost)

}

async function deleteContact() {
    const button = document.getElementsByClassName('delete')
    
    for (let i = 0; i < button.length; i++) {
        const element = button[i];
        element.addEventListener('click', async () => {
            const status = await deleteItem(element.id)

            if (status == 200) window.location.reload(true)
        })
    }
}

async function updateFormData(id) {
    const name = document.getElementById('name').value

    let date = document.getElementById('date').value.split('/')
    date = date[2] + '-' + date[1] + '-' + date[0]

    const email = document.getElementById('email').value

    let profession = document.getElementById('profession').value

    let phone = document.getElementById('phone').value
    const ddd = phone.substring(1, 3)
    const number = (phone.substring(5, 9) + phone.substring(10, 14))
    phone = (ddd + number)

    let cellphone = document.getElementById('cellphone').value
    const dddCell = cellphone.substring(1, 3)
    const numberCell = (cellphone.substring(5, 10) + cellphone.substring(11, 15))
    cellphone = (dddCell + numberCell)

    let checked_wpp = '0'
    let checked_sms = '0'
    let checked_email = '0'

    if (document.getElementById('check_whatsapp').checked)
        checked_wpp = '1';
        
    if (document.getElementById('check_sms').checked)
        checked_sms = '1';
    
    if (document.getElementById('check_email').checked)
        checked_email = '1';
    
    const JSONpost = {
        "name": name,
        "birth_date": date,
        "email": email,
        "profession": profession,
        "phone": phone,
        "cellphone": cellphone,
        "checked_wpp": checked_wpp,
        "checked_sms": checked_sms,
        "checked_email": checked_email,
    }

    await updateItem(JSONpost, id)
}

export {
    editContact,
    postFormData,
    deleteContact,
    updateFormData
}