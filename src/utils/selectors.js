import {tableGeneratorFunc, tableDataGenerator} from '../components/table'
import {formValidated} from '../utils/validators'
import {webUrl, tableTag, dataIDFromDB, formLabels} from '../utils/globalConst'

let currRowToggle = null // NOTE these need to be isolated into globalConst
let prevRowToggle = null // NOTE these need to be isolated into globalConst 


export const clearInputTxtFields = () => { // clears the input fields
    $.each( formLabels, (_, formlabel) => {
        $(`#${formlabel}`).val('')  
    })
}


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
} 


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
} 

