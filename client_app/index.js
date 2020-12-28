const form = () => { 
    const form = $('<form/>'); 
    const label = $('<label/>'); 
    const formLabels = ['name', 'age', 'gender', 'email', 'feedback']
    const labelBtns = [
        '<input type="submit" value="Add" id="Add"/>',
        '<input type="submit" value="Edit" id="Edit"/>',
        '<input type="submit" value="Delete" id="Delete"/>'
    ]

    $.each(formLabels, (idx, formLabel) => { // generates the fields for the forms 
        formLabel = label.textContent = formLabels[idx] // gives the labels name in dynamic fashion 
        form.append(label, formLabel, `<input id="${formLabel}">`, '<br>','<br>')
    })
    $('.form').append(form) // appends Add, Edit, delete btn to form 
    $.each(labelBtns, (idx, labelBtn) => {
        $('.form').append(labelBtn)
    })
    $('#Add').on('click', addEventHandler);
    $('#Edit').on('click', editEventHandler);
    $('#Delete').on('click', deleteEventHandler);
    
} // end of func 

const addEventHandler = event => {
    event.preventDefault(); 
    const dataSent = { // data to be transmitted with post HTTP req 
        "Name":$('#name').val(), 
        "Age":$('#age').val(), 
        "Gender":$('#gender').val(), 
        "Email":$('#email').val(), 
        "Feedback":$('#feedback').val()
    }
    if (formValidation()) { // validates the form before requesting API 
        $.ajax({
            type: 'POST', 
            url: 'http://127.0.0.1:5000/attr',  
            data: dataSent
        })
    }
} // end of func 

const formValidation = () => {
    if ($('#name').val() !== null) { // validation for name 
        let hasNumber = /\d/ // checks if str has num 
        if(hasNumber.test($('#name').val())){ // test method used for testing validations     
            alert ('Please input only characters for your name')
            return false;
        };
    }

    if ($('#age').val() !== null ) {
        let onlyNumbers = /^[0-9]+$/ 
        if (!onlyNumbers.test($('#age').val())) { // validation for age 
            alert ('Please input only numbers for your age');
            return false;
        }
    }

    if ($('#gender').val() !== null ) { // validation for gender
        let onlyNumbers = /^[0-1]$/
        if ( !onlyNumbers.test($('#gender').val())) {
            alert ('Please input 0 if you are male, 1 if you are female');
            return false; 
        }
    }

    if ($('#email').val() !== null) { // validation for email 
        if ($('#email').val().indexOf('@') === -1 || $('#email').val().indexOf('.com') == -1) {
            alert ('Please input valid email address')
            return false 
        }
    }

    return true 
} // end of func 

let rowID = null // each row on table has an ID
let dataIDFromDB = null // the ID stored in db to each obj entry in db 
let rowIndex = null // used for CSS dataSelector

const rowSelector4Editing = event => {  
    let idValue = $(event.target).attr('class') //gets idValue from class attr 
    rowID = idValue 
    $.ajax({
        type: 'GET', 
        url: 'http://127.0.0.1:5000/attr',
        success: data => {
            let idx = rowID -1; // starts idx at 0 rather than 1 
            dataValuesArray = Object.values(data[ idx ]) // selects values for any data[ idx ] into arr
            dataIDFromDB = dataValuesArray[5]
            $('#name').val(dataValuesArray[4]) // fill in dataValue to form entry
            $('#age').val(dataValuesArray[0]) // fill in dataValue to form entry
            $('#gender').val(dataValuesArray[3]) // fill in dataValue to form entry
            $('#email').val(dataValuesArray[1]) // fill in dataValue to form entry
            $('#feedback').val(dataValuesArray[2]) // fill in dataValue to form entry
        }
    })
} // end of func 

const editEventHandler = () => {
    const dataSent4Update = {
        "Name":$('#name').val(), 
        "Age":$('#age').val(), 
        "Gender":$('#gender').val(), 
        "Email":$('#email').val(), 
        "Feedback":$('#feedback').val()
    }
    $.ajax({
        type: 'PUT', 
        url: `http://127.0.0.1:5000/attr/${dataIDFromDB}`, 
        data: dataSent4Update
    })
} // end of func 

const deleteEventHandler = () => {
    $.ajax({
        type: 'DELETE', 
        url: `http://127.0.0.1:5000/attr/${dataIDFromDB}`
    })
} // end of func 

const construct_table = () => {
    let table = $('<table id="tableId"/>');
    $( () => {
        $.ajax({
            type: 'GET', 
            url: 'http://127.0.0.1:5000/attr', 
            success: data => {
                let idValue = 1;
                let rowID = 1; 
                if (data.length === 0 ) {table.append('<p>No data<p>')}
                $.each(data, (rowIndex, r) => {
                        let row = $(`<tr id='${rowIndex}'/>`);
                        $.each(r, (colIndex, c) => { 
                            row.append(
                                $('<t'+(rowIndex == 0 ?  `h class='${idValue}'` : `d class='${idValue}' `)+'/>').text(c) 
                                );
                            });
                        idValue++
                        rowID++
                        table.append(row);
                    });
                }
            })
        })
    $('.table').append(table)
    $('#tableId').on('click', rowSelector4Editing); // selects row data from table to populate on form 
    $('#tableId').on('click', rowSelectionHighlight);
    
} // end of func 

let currRowToggle = null
let prevRowToggle = null 

const rowSelectionHighlight = event => {
    let idValue = $(event.target).attr('class') // gives the idValue of currTarget 
    let rowIndex = idValue - 1; 
    currRowToggle = $(`#${rowIndex}`) 
    if (currRowToggle !== null && prevRowToggle === null ) {
        currRowToggle.css('background-color', 'yellow');
    } else if (currRowToggle !== null && prevRowToggle !== null) {
        prevRowToggle.css('background-color', '')
    } 
    $('#tableId').on('click', prevRowToggle = $(`#${rowIndex}`), nxtRowSelectionHighlight);
} // end of func 

const nxtRowSelectionHighlight = event => { 
    let idValue = $(event.target).attr('class')
    let rowIndex = idValue - 1;
     $(`#${rowIndex}`).css('background-color', 'yellow');
} // end of func 

const pageLayout = () => {
    $('.id').append('<table id="layoutTable" border="2"/>')
    const parent = document.getElementById('layoutTable')
    const thread = document.createElement('thread'); // could not use $('tag') see why later
    const th1 = document.createElement('th');// could not use $('tag') see why later
    th1.className='form';
    const th2 = document.createElement('th');// could not use $('tag') see why later
    th2.className='table';
    parent.append(thread,th1,th2)
} // end of func 

$("document").ready(function() {  
    appLayout = pageLayout()  
    dataTable = construct_table(); 
    formCol = form()
}); 

