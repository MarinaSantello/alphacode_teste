'use strict'

import { postFormData, updateFormData } from './button.js'

function crateForm(inputs, checks) {
    $(document).ready(function () {
        $('#date').mask('00/00/0000')
        $('#phone').mask('(00) 0000-0000')
        $('#cellphone').mask('(00) 00000-0000')
    })

    const form = document.getElementById('form')

    form.innerHTML = ""

    for (let i = 0; i < inputs.length; i += 2) {
        form.innerHTML += `
        <div class="row">
            <div class="col">
                <div class="mb-3">
                    <label for="${inputs[i].id}" class="form-label d-flex justify-content-start">${inputs[i].label}</label>
                    <input type="${inputs[i].type}" class="form-control form-control border-top-0 rounded-0 p-0" id="${inputs[i].id}" placeholder="${inputs[i].placeholder}" value="${inputs[i].value}" ${inputs[i].required}>
                </div>
            </div>
            <div class="col">
                <div class="mb-3">
                    <label for="${inputs[i + 1].id}" class="form-label d-flex justify-content-start">${inputs[i + 1].label}</label>
                    <input type="text" class="form-control border-top-0 rounded-0 p-0" id="${inputs[i + 1].id}" placeholder="${inputs[i + 1].placeholder}" value="${inputs[i + 1].value}" ${inputs[i + 1].required}>
                </div>
            </div>
        </div>`            
    }

    if (inputs[0].value == '') form.innerHTML += `
        <div class="row">
            <div class="col">
                <div class="mb-3 form-check d-flex justify-content-start gap-2">
                    <input type="checkbox" class="form-check-input" id="check_whatsapp">
                    <label class="form-check-label text-start" for="check_whatsapp">Número de celular possui Whatsapp</label>
                </div>
            </div>
            <div class="col">
                <div class="mb-3 form-check d-flex justify-content-start gap-2">
                    <input type="checkbox" class="form-check-input" id="check_email">
                    <label class="form-check-label text-start" for="check_email">Enviar notificações por E-mail</label>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <div class="mb-3 form-check d-flex justify-content-start gap-2">
                    <input type="checkbox" class="form-check-input" id="check_sms">
                    <label class="form-check-label text-start" for="check_sms">Enviar notificações por SMS</label>
                </div>
            </div>
            <div class="col">
            </div>
        </div>
        <div class="row">
            <div class="col d-flex justify-content-end" id="post">
                <button type="submit" class="btn" data-id="insert" id="registerButton">
                    <h5 class="fw-bold text-white">
                        Cadastro de contatos
                    </h5>
                </button>
            </div>
        </div>`

    else form.innerHTML += `
    <div class="row">
        <div class="col">
            <div class="mb-3 form-check d-flex justify-content-start gap-2">
                <input type="checkbox" class="form-check-input" id="check_whatsapp" ${checks.whatsapp}>
                <label class="form-check-label text-start" for="check_whatsapp">Número de celular possui Whatsapp</label>
            </div>
        </div>
        <div class="col">
            <div class="mb-3 form-check d-flex justify-content-start gap-2">
                <input type="checkbox" class="form-check-input" id="check_email" ${checks.email}>
                <label class="form-check-label text-start" for="check_email">Enviar notificações por E-mail</label>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col">
            <div class="mb-3 form-check d-flex justify-content-start gap-2">
                <input type="checkbox" class="form-check-input" id="check_sms" ${checks.sms}>
                <label class="form-check-label text-start" for="check_sms">Enviar notificações por SMS</label>
            </div>
        </div>
        <div class="col">
        </div>
    </div>
    <div class="row">
        <div class="col d-flex justify-content-end g-2">
            <button type="submit" class="btn" data-id="update" id="updateButton">
                <h5 class="fw-bold text-white">
                    Salvar alterações
                </h5>
            </button>
        </div>
    </div>`

    const elementos = form.elements

    for (const input of form.querySelectorAll('input')) {
        if (input.value != '') {

            window.addEventListener('beforeunload', function (event) {
                event.preventDefault() // previne a página de ser atualizada imediatamente
              
                // Exibe uma mensagem de alerta para que o usuário não atualize a página sem saber das consequências
                event.returnValue
            })
        }
    }

    form.addEventListener('submit', async (event) => {
        // Previne o envio padrão do formulário
        event.preventDefault()

        const clickedButtonId = event.submitter.getAttribute('data-id')
    
        // Verifica se todos os campos obrigatórios estão preenchidos
        if (form.checkValidity() && clickedButtonId == 'insert') {
            await postFormData()

            window.location.reload(true)
        }
        else if (form.checkValidity() && clickedButtonId == 'update') {
            const id = localStorage.getItem('idContact')
            await updateFormData(id)

            // Itera sobre todos os inputs do formulário e define o valor como uma string vazia
            for (const input of form.querySelectorAll('input'))
                input.value = ''
            

            window.location.reload(true)
        }
    })
}

let inputsJSON = [
    {
        "id": 'name',
        "label": 'Nome completo',
        "placeholder": 'Ex.: Marina Santello Pimentel',
        "required": 'required',
        "type": 'text',
        "value": ''
    },
    {
        "id": 'date',
        "label": 'Data de nascimento',
        "placeholder": 'Ex.: 03/10/2003',
        "required": 'required',
        "value": ''
    },
    {
        "id": 'email',
        "label": 'E-mail',
        "placeholder": 'Ex.: marinasantello@gmail.com',
        "required": 'required',
        "type": 'email',
        "value": ''
    },
    {
        "id": 'profession',
        "label": 'Profissão',
        "placeholder": 'Ex.: Desenvolvedora Web',
        "required": '',
        "value": ''
    },
    {
        "id": 'phone',
        "label": 'Telefone para contato',
        "placeholder": 'Ex.: (11) 4552-1180',
        "required": '',
        "type": 'text',
        "value": ''
    },
    {
        "id": 'cellphone',
        "label": 'Celular para contato',
        "placeholder": 'Ex.: (11) 95637-2791',
        "required": 'required',
        "value": ''
    }
]

crateForm(inputsJSON)

export {
    crateForm
}