'use strict'

import { getContacts } from './contact.js'
import { editContact, deleteContact } from './button.js'

async function createThead() {
    const dataAPI = await getContacts()

    const table = document.getElementById('columns')

    await dataAPI.data.forEach(element => {
        const data = new Date(element.birth_date)

        let month
        if (String(data.getMonth() + 1).length <= 1) month = `0${(data.getMonth() + 1)}`
        else month = ((data.getMonth() + 1))
        
        let date
        if (String(data.getDate() + 1).length <= 1) date = `0${(data.getDate() + 1)}`
        else date = ((data.getDate() + 1))

        const dataFormatada = (date) + "/" + (month) + "/" + data.getFullYear()

        const telefoneFormatado = '(' + element.cellphone.substring(0, 2) + ') ' + element.cellphone.substring(2, 7) + '-' + element.cellphone.substring(7, 11)
        
        table.innerHTML += `
            <thead
                <tr>
                    <th scope="col">
                        <p class="fw-light">
                            ${element.name}
                        </p>
                    </th>
                    <th scope="col">
                        <p class="fw-light">
                            ${dataFormatada}
                        </p>
                    </th>
                    <th scope="col">
                        <p class="fw-light">
                            ${element.email}
                        </p>
                    </th>
                    <th scope="col">
                        <p class="fw-light" id="callphone">
                            ${telefoneFormatado}
                        </p>
                    </th>
                    <th scope="col">
                        <a href="#" class="edit" id="${element.id}">
                            <img class="img-fluid" id="icone_edicao" src="./assets/img/editar.png" alt="icone para editar um contato.">
                        </a>
                        <a href="#" class="delete" id="${element.id}">
                            <img class="img-fluid" id="icone_excluir" src="./assets/img/excluir.png" alt="icone para excliuir um contato.">
                        </a>
                    </th>
                </tr>
            </thead>
        `
    })

    editContact()
    deleteContact()
}

createThead()