import {formLabels} from './globalConst'

export const form = () => { 
    const inputPlaceHolders = ['bobby247', '18', 'abc@ccny.cuny.edu', 'cool']
    const formColNameClasses = ['fieldCol', 'textCol'] // used to stylize the colName 
    const tableHeaders = ['field label', 'text field']

    $('.form').append('<p class="formTxt">Form')
    _formHeaders(formColNameClasses, tableHeaders) // gives each col a category name 
    _formFields(formLabels, inputPlaceHolders) // gives form table, row and td tags  
    _formCss(formLabels) // stylizes the form
} // end of func 

const _formHeaders = (formColNameClasses, tableHeaders) => {
    $.each(tableHeaders, (idx, tableHeader) => {
        $('.form').append(`<th class="${formColNameClasses[idx]}">${tableHeader}`)
    })
} // end of func

const _formFields = (formLabels, inputPlaceHolders) => {
    $.each(formLabels, (rowIndex, formLabel) => {
        let rowForm = $(`<tr class='${formLabel}'>`); // gives the HTML tr with id attr 
        switch(rowIndex) {
            case 4:
                rowForm.append(`<td class='formLabel${formLabel[0].toUpperCase()+ formLabel.slice(1,formLabel.length)}'>${formLabel}</td>`,`<select id="${formLabel}Options">`);
                break
            default:
                rowForm.append(`<td class='formLabel${formLabel[0].toUpperCase()+ formLabel.slice(1,formLabel.length)}'>${formLabel}</td>`,`<input id="${formLabel}" placeholder="${inputPlaceHolders[rowIndex]}">`);
        }

        $('.form').append(rowForm);
    });
    $('#GenderOptions').append('<option value = "0">Female', '<option  value = "1">Male', '<option value = "2">Other')
} // end of func


const _formCss = formLabels => {
    $('.formTxt').css(
        {
            'position': 'relative',
            'left': '5vw'
        }
    )
    $('.fieldCol, .textCol').css( // selects both col and stylize 
        {
            'text-decoration': 'underline', 
            'font-style': 'italic',
            'color': 'green',
            'padding': '5px 10px',
            'position': 'relative', 
            'left': '10vw', 
        }
    );
    $.each(formLabels, (_, formLabel) => {
        $(`#${formLabel}, #GenderOptions, .formLabel${formLabel[0].toUpperCase()+ formLabel.slice(1,formLabel.length)}`).css(
            {
                'position': 'relative', 
                'left': '10vw',     
            }
        )
    })
    $('table th.form').css('border-spacing', '25px')
} // end of func



