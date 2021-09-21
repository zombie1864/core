import {addEventHandler, editEventHandler, deleteEventHandler, demoEventHandler} from '../utils/eventHandlers'
import {btnsCss} from '../style/jqueryCss'

export const eventBtns = () => {
    /**
    @description: comp which adds btns to page which each btn containing additional functionality and some like 'Add' passing props down to functional pipelines. 
    **/
    const btnLabels = ['Add', 'Edit', 'Delete', 'Demo']
    $.each(btnLabels, (_, btnLabel) => {
        $('.form').append(`<input type="submit" value="${btnLabel}" id="${btnLabel}">`)
    })
    btnsCss(btnLabels)
    $('#Add, #Edit, #Delete, #Demo').on('click', function() {
        switch(this.id) {
            case 'Add':
                _textFieldData(this.id)
                break 
            case 'Edit':
                _textFieldData(this.id)
                break 
            case 'Delete':
                deleteEventHandler()
                break 
            case 'Demo': 
                demoEventHandler()
        }
    })
} 


const _textFieldData = (btnLabelID) => { 
    /**
    @description: collects input field data and create an obj with values based on input fields. The data is then passed down event handlers for either adding or editing 
    @param {string} btnLabelID: str which identifies btn's label id attr 
    **/
    let textFieldDataObj = { 
        Name: $('#Name').val(), 
        Age: $('#Age').val(), 
        Email: $('#Email').val(), 
        Feedback: $('#Feedback').val(),
        Gender: $('#GenderOptions option:selected').val() 
    }
    switch(btnLabelID) { // based on ID data obj will be added or edited 
        case 'Add':
            addEventHandler(textFieldDataObj)
            break
        case 'Edit':
            editEventHandler(textFieldDataObj)
    }
} 

/**
   RVD 9/16/21   
**/