import {tableGeneratorFunc, tableDataGenerator} from '../components/table'
import {tableTag, dataIDFromDB, webUrl} from './globalConst'
import {seedDB} from './globalConst'
import {clearErrCssMsg,clearInputTxtFields, rowSelector4Editing} from './selectors'


export const addEventHandler = (textFieldDataObj) => {
    if (formValidated(textFieldDataObj)) { // validates the form before requesting API 
        $.ajax({
            type: 'POST', 
            url: webUrl,  
            data: textFieldDataObj, // { ... } single obj added to [ {}, {}, ..., {}]
            success: dataFromDB => {
                _tableRefresh(dataFromDB) // refreshes the table 
                clearInputTxtFields() // clears the input fields after adding form 
            }, 
            error: (errMsg) => {
                $('.id').append(`<div>${errMsg}`)
            }
        })
    }
}


export const editEventHandler = (textFieldDataObj) => { 
    if (formValidated(textFieldDataObj)) {
        $.ajax({
            type: 'PUT', 
            url: `${webUrl + '/' + dataIDFromDB}`, 
            data: textFieldDataObj, 
            success: dataFromDB => {
                _tableRefresh(dataFromDB)
                clearInputTxtFields() // clears the input fields after editing form
            },
            error: (errMsg) => {
                $('.id').append(`<div>${errMsg}`)
            }
        })
    }
} 


export const deleteEventHandler = () => {
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


export const demoEventHandler = () => { // iterates seedDB, each obj is sent via post api 
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


const _tableRefresh = dataFromDB => { // refreshes comp without refresh to the entire DOM 
    if ( $('.table').find('tr').length === 0 ) { // no td -> generate the table
        $('.noData2').remove()
        tableGeneratorFunc(dataFromDB[1], tableTag)
    } else {
        $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
        tableDataGenerator(dataFromDB[1]) // generates the rows for the table 
    }
    $('#tableId tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
} 