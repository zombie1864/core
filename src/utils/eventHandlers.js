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
            let dataExists = dataFromDB[0].length
            if (dataExists === 0) {
                $('th').remove('.colName')
                $('.tableContentTitle').remove()
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


const _tableRefresh = dataFromDB => { 
    // NOTE NOT 100% TRUE: refreshes comp without refresh to the entire DOM <- update note later
    let tableContentExists = $('#tableContent').length
    let tableCompExists = $('#layoutTable th.table').length // 1 === DE 0 === DNE 
    console.log('\n----------[ START ]----------\n')
    console.log(`tableCompExists: ${tableCompExists}`)
    console.log(`tableContentExists: ${tableContentExists}`)
    console.log(`both: ${tableCompExists === tableContentExists}`)
    console.log('\n----------[ END ]----------\n') 

    if (tableContentExists === 0 && tableCompExists === 0) {
        $('#layoutTable').append('<th class="table">')
    }

    if (tableCompExists === 1 && tableContentExists === 0) {
        $('.noData').remove()
        $.ajax({ 
            type: 'GET', 
            url: webUrl, 
            success: dataFromDB => { // data from db, [{},{},{}] DS, each object is a row 
                $('#layoutTable').remove('.noData')
                $('.table').append(tableTag)
                generateTableUsing(dataFromDB, tableTag)
                $('#tableContent tr').on('click', rowSelector4Editing); // NOTE ajax is async, see dev notes
                $('#tableContent tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
                tableCss()
            }
        })
    } else if (tableContentExists === 0 && tableCompExists === 0) {
        $('.noData').remove()
        $('#layoutTable').append('<th class="table">')
        $.ajax({ 
            type: 'GET', 
            url: webUrl, 
            success: dataFromDB => { // data from db, [{},{},{}] DS, each object is a row 
                $('#layoutTable').remove('.noData')
                $('.table').append(tableTag)
                generateTableUsing(dataFromDB, tableTag)
                $('#tableContent tr').on('click', rowSelector4Editing); // NOTE ajax is async, see dev notes
                tableCss()
            }
        })
    } else {
        $('tr').remove('.dataElFromDB') 
        $.ajax({ 
            type: 'GET', 
            url: webUrl, 
            success: dataFromDB => { // data from db, [{},{},{}] DS, each object is a row
                addTableData(dataFromDB) 
                $('#tableContent tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
            }
        })
    }
} 