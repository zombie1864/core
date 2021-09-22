import {generateTableUsing, addTableData} from '../components/table'
import {tableTag, dataIDFromDB, webUrl} from './globalConst'
import {seedDB} from './globalConst'
import {clearErrCssMsg,clearInputTxtFields, rowSelector4Editing} from './selectors'
import {formValidated} from './validators'
import{tableCss} from '../style/jqueryCss'


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
            $('tr').remove('.dataElFromDB') // rm all tr with class name dataElFromDB
            if (dataFromDB[0].length === 0) {
                $('.table').remove() // rm the table comp
                $('#layoutTable').append('<p class="noData">No Data</P>')
            } else {
                addTableData(dataFromDB[1])// generates the rows for the table 
                $('#tableContent tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
            }
            clearInputTxtFields() // clears the input fields after deleting form 
            clearErrCssMsg() // clears the err msg for nxt session 
        }, 
        error: (errMsg) => {
            $('.id').append(`<div>${errMsg}`)
        }
    })
} // RFE note that their is a performance issue with this design - clear all data and rebuild it 


export const demoEventHandler = () => { // iterates seedDB, each obj is sent via post api
    $.each(seedDB, (_, dataObj) => {
        $.ajax({
            type: 'POST', 
            url: webUrl,  
            data: dataObj,
            success: dataFromDB => {
                $('.noData').remove()
                let tableCompExists = $('#layoutTable th.table').length // 1 === DE 0 === DNE 
                let tableContentExists = $('#tableContent').length
                if (tableCompExists === 1 && tableContentExists === 0) {
                    $('.table').append(tableTag)
                    generateTableUsing(dataFromDB[0], tableTag)
                    $('#tableContent tr').on('click', rowSelector4Editing);
                } 
                else if (tableCompExists === 1 && tableContentExists == 1) {
                    addTableData(dataFromDB[0])
                }
                else {
                    $('#layoutTable').append('<th class="table">')
                    $('.table').append(tableTag)
                    addTableData(dataFromDB[0])
                    $('#tableContent tr').on('click', rowSelector4Editing);
                }
                tableCss()
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
        generateTableUsing(dataFromDB[1], tableTag)
    } else {
        $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
        addTableData(dataFromDB[1]) // generates the rows for the table 
    }
    $('#tableContent tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
} 