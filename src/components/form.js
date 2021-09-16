import {formLabels} from '../utils/globalConst'
import{formCss} from '../css/jqueryCss'

export const form = () => { 
    /**
    @description: Inserts form fields into pageLayout table as sub headers that contain `tr` tags. This design effect happens to create a table with columns and rows inside a larger table, i.e., a table inside a table. 
    **/
    const inputPlaceHolders = ['bobby247', '18', 'abc@ccny.cuny.edu', 'cool']
    const formClassNameAttr = ['fieldCol', 'textCol'] // used to stylize the colName with css 
    const formHeaderLabels = ['field label', 'text field']

    $('.form').append('<p class="formTxt">Form')
    _formHeaders(formClassNameAttr, formHeaderLabels) // gives each col a category name 
    _formFields(formLabels, inputPlaceHolders) // gives form table, row and td tags  
    formCss(formLabels) 
} 


const _formHeaders = (formClassNameAttr, formHeaderLabels) => {
    /**
    @description: appends headers to table, effectively creating the form fields as col for the form comp 
    @param {Array[string]} formClassNameAttr: list of str containing the class name attr given to `th` tags 
    @param {Array[string]} formHeaderLabels: list of str containg the txt label used between `th` tags 
    **/
    $.each(formHeaderLabels, (idx, txtLabel) => {
        $('.form').append(`<th class="${formClassNameAttr[idx]}">${txtLabel}`)
    })
} 


const _formFields = (formLabels, inputPlaceHolders) => {
    /**
    @description: appends the labels and input fields to create a form for form comp 
    @param {Array[string]} formLabels: list of str containing the form labels used to identify input fields 
    @param {Array[string]} inputPlaceHolders: list of str containing place holders for form input fields 
    **/
    $.each(formLabels, (rowIndex, formLabel) => {
        let rowForm = $(`<tr class='${formLabel}'>`); // gives the HTML tr with class attr 
        let condition = formLabel == 'Gender' ? `<select id="${formLabel}Options">` : `<input id="${formLabel}" placeholder="${inputPlaceHolders[rowIndex]}">`
        rowForm.append(
            `<td class='formLabel${formLabel}'>${formLabel}</td>`,
            `${condition}`
        );
        $('.form').append(rowForm);
    });
    $('#GenderOptions').append('<option value = "0">Female', '<option  value = "1">Male', '<option value = "2">Other')
} 

/**
    RVD : reviewed on 9/16/21 
**/