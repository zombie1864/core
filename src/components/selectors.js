import {tableGeneratorFunc, tableDataGenerator} from './pageTable'
import {formValidated} from './validators'
import {webUrl, tableTag, dataIDFromDB, formLabels} from './globalConst'

let currRowToggle = null
let prevRowToggle = null

const _rowSelectionHighlight = (event) => { // highlights the currRow onClick 
    let idValue = parseInt( $(event.target).closest('tr').attr('id') )// gives the idValue of currTarget
    currRowToggle = $(`#${idValue}`) // assigns globalVar the rowIndex value     

    if (currRowToggle !== null && prevRowToggle === null ) {
        currRowToggle.css('background-color', 'yellow');
    } else if (currRowToggle !== null && prevRowToggle !== null) {
        prevRowToggle.css('background-color', '')
        currRowToggle.css('background-color', 'yellow');
    } 
    prevRowToggle = $(`#${idValue}`) 
} // end of func 

const _tableRefresh = dataFromDB => { // refreshes comp without refresh to the entire DOM 
    if ( $('.table').find('tr').length === 0 ) { // no td -> generate the table
        $('.noData2').remove()
        tableGeneratorFunc(dataFromDB[1], tableTag)
    } else {
        $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
        tableDataGenerator(dataFromDB[1]) // generates the rows for the table 
    }
    $('#tableId tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
} // end of func


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
} // end of func 

export const clearInputTxtFields = () => { // clears the input fields
    $.each( formLabels, (_, formlabel) => {
        $(`#${formlabel}`).val('')  
    })
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
} // end of func 


export const rowSelector4Editing = event => { // deals w. the logic if populating the text field
    clearErrCssMsg() // clears err msg for nxt session 
    let trIdValue = $(event.target).closest('tr').attr('id') // returns the id from tr 
    let tdClassId = $(`.id${parseInt(trIdValue) + 1}`).html() // returns the id from td 
    dataIDFromDB = tdClassId

    $.each( formLabels, (idx, formLabel) => {
        let dataForSelection = $(`.${
            formLabel[0].toUpperCase()+ 
            formLabel.slice(1,formLabel.length) + 
            (parseInt(trIdValue) + 1) 
        }`).html()

        $(`#${formLabel}`).val(`${dataForSelection}`)
        if ( idx === formLabels.length - 1 ) $(`#${formLabel}Options`).val(`${dataForSelection}`) // populates inputs with td values 
    })
    _rowSelectionHighlight(event) // deals w. the logic for highlighting row 
} // end of func 

export const clearErrCssMsg = () => {
    if ( $('#nameError').length > 0 ) {
        $('.formLabelName').css('background-color', '');
        $('#nameError').remove();
    }
    if ( $('#ageError').length > 0 ) {
        $('.formLabelAge').css('background-color', '');
        $('#ageError').remove();
    }
    if ($('#emailError').length > 0 ) {
        $('.formLabelEmail').css('background-color', '');
        $('#emailError').remove();
    }
}