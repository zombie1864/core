import {tableGeneratorFunc} from './pageTable'
import {rowSelector4Editing, addEventHandler, editEventHandler, clearErrCssMsg, clearInputTxtFields} from './selectors'
import { tableDataGenerator } from './pageTable'
import {tableTag, dataIDFromDB, webUrl} from './globalConst'


export const addEventBtns = () => {
    const labelBtns = ['Add', 'Edit', 'Delete', 'Demo']

    $.each(labelBtns, (_, labelBtn) => {
        $('.form').append(`<input type="submit" value="${labelBtn}" id="${labelBtn}">`)
    })
    $('#Add, #Edit, #Delete, #Demo').on('click', function() {
        switch(this.id) {
            case 'Add':
                _textFieldData(this.id)
                break 
            case 'Edit':
                _textFieldData(this.id)
                break 
            case 'Delete':
                _deleteEventHandler()
                break 
            case 'Demo': 
                _demoEventHandler()
        }
    })
    $( document ).ajaxComplete( () => { // determines the css style for btns after ajax call 
        let lengthOfTable = $('#tableId tr').length
        switch (lengthOfTable) {
            default: 
                _btnsCss(labelBtns)
        }
    })
} 


const _textFieldData = (labelBtnID) => { // creates the data obj from input for adding or editing 
    let textFieldDataObj = { // graps the data from the text fields 
        "Name":$('#Name').val(), 
        "Age":$('#Age').val(), 
        "Email":$('#Email').val(), 
        "Feedback":$('#Feedback').val(),
        "Gender":$('#GenderOptions option:selected').val() 
    }
    switch(labelBtnID) { // based on ID data obj will be added or edited 
        case 'Add':
            addEventHandler(textFieldDataObj)
            break
        case 'Edit':
            editEventHandler(textFieldDataObj)
    }
} 


const _deleteEventHandler = () => {
    $.ajax({
        type: 'DELETE', 
        url: `${webUrl + '/' + dataIDFromDB}`, 
        success: (dataFromDB) => {
            $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
            tableDataGenerator(dataFromDB[1])// generates the rows for the table 
            $('#tableId tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
            clearInputTxtFields() // clears the input fields after deleting form 
            clearErrCssMsg() // clears the err msg for nxt session 
        }, 
        error: (errMsg) => {
            $('.id').append(`<div>${errMsg}`)
        }
    })
} 


const _demoEventHandler = () => { // iterates seedDB, each obj is sent via post api 
    $.each( seedDB, (_, dataObj) => {
        $.ajax({
            type: 'POST', 
            url: webUrl,  
            data: dataObj, 
            success: () => {
                $.get(webUrl, (dataFromDB) => {
                    if ( $('.table').find('tr').length === 0 ) {
                        $('.noData2').remove()
                        tableGeneratorFunc(dataFromDB, tableTag)
                    } else {
                        $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
                        tableDataGenerator(dataFromDB) // generates the rows for the table 
                    }
                    clearInputTxtFields()
                    $('#tableId tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
                })            
            }, 
            error: (errMsg) => {
                $('.id').append(`<div>${errMsg}`)
            }
        })
    }) 
} 


const _btnsCss = labelBtns => { // NOTE css isolation is needed 
    $.each(labelBtns, ( _, labelBtn) => {
        $(`#${labelBtn}`).css(
            {
                'background-color': '#4CAF50',
                'border-radius': '10px',
                'color': 'white',
                'padding': '10px 20px',
                'text-align': 'center',
                'display': 'inline-block',
                'font-size': '16px',
                'margin': '10px 5px',
                'cursor': 'pointer', 
                'position': 'relative', 
                'bottom': '-150px',
                'left': '80px'

            }
        )
    })
} 

const seedDB = [ // seeds the db with some dummy data  NOTE this needs to be in globalConst
    {
        'Age': '27', 
        'Email': "jeff@gmail.com",
        'Feedback': "demo test",
        'Gender': '0',
        'Name': "jeff"
    }, 
    {
        'Age': '25', 
        'Email': "jessie@gmail.com",
        'Feedback': "demo test again",
        'Gender': '1',
        'Name': "jessie"
    }, 
    {
        'Age': '29', 
        'Email': "mark@gmail.com",
        'Feedback': "mark's demo",
        'Gender': '0',
        'Name': "mark"
    }, 
    {
        'Age': '22', 
        'Email': "amy@gmail.com",
        'Feedback': "a-demo-trick",
        'Gender': '1',
        'Name': "amy"
    }
]