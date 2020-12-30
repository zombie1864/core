const form = () => { 
    const form = $('<form/>'); 
    const formLabels = ['name', 'age', 'gender', 'email', 'feedback']
    const labelBtns = [
        '<input type="submit" value="Add" id="Add"/>',
        '<input type="submit" value="Edit" id="Edit"/>',
        '<input type="submit" value="Delete" id="Delete"/>'
    ]
    $('.form').append(form) // appends Add, Edit, delete btn to form 
    $.each(formLabels, (idx, formLabel) => { // generates the fields for the forms 
        let pTags = `<p class="${formLabel}">${formLabel}`
        form.append(pTags, `<input id="${formLabel}">`, '<br>',`<br id="${formLabel}Break">`)
        $(`.${formLabel}`).css('display', 'inline')
    })
    $.each(labelBtns, (idx, labelBtn) => {
        $('.form').append(labelBtn)
    })
    $('#Add').on('click', addEventHandler);
    $('#Edit').on('click', editEventHandler);
    $('#Delete').on('click', deleteEventHandler);
} // end of func 

const addEventHandler = () => {
    if (formValidation()) { // validates the form before requesting API 
        const dataSent = { // data to be transmitted with post HTTP req 
            "Name":$('#name').val(), 
            "Age":$('#age').val(), 
            "Gender":$('#gender').val(), 
            "Email":$('#email').val(), 
            "Feedback":$('#feedback').val()
        }
        $.ajax({
            type: 'POST', 
            url: 'http://127.0.0.1:5000/attr',  
            data: dataSent, 
            error: () => {
                alert('Something went wrong')
            }
        })
    } else {
        alert('Please fill out the form, thank you')
    }
} // end of func 

const formValidation = () => {
    if ($('#name').val() !== null) { // validation for name 
        let hasNumber = /\d/ // checks if str has num 
        if(hasNumber.test($('#name').val()) || $('#name').val() === '') { // test method used for testing validations     
            $('<p id="nameError">Please input characters for your name</p>').insertBefore('#nameBreak').css(
                {
                    'display': 'inline', 
                    'text-decoration': 'underline', 
                    'font-style': 'italic',
                    'color': 'red' 
                })
            $('.name').css('background-color', 'red');
            return false; // used for boolean value for validation before post API req 
        } else {
            $('.name').css('background-color', '');
            $('#nameError').remove();
        };
    }

    if ($('#age').val() !== null ) {
        let onlyNumbers = /^[0-9]+$/ 
        if (!onlyNumbers.test($('#age').val())) { // validation for age 
            $('<p id="ageError">Please input only numbers for your age</p>').insertBefore('#ageBreak').css(
                {
                    'display': 'inline', 
                    'text-decoration': 'underline', 
                    'font-style': 'italic',
                    'color': 'red' 
                });
            $('.age').css('background-color', 'red');
            return false; // used for boolean value for validation before post API req 
        } else {
            $('.age').css('background-color', '');
            $('#ageError').remove();
        }
    }

    if ($('#gender').val() !== null ) { // validation for gender
        let onlyNumbers = /^[0-1]$/
        if ( !onlyNumbers.test($('#gender').val())) {
            $('<p id="genderError">Please input 0 for male, 1 for female</p>').insertBefore('#genderBreak').css(
                {
                    'display': 'inline', 
                    'text-decoration': 'underline', 
                    'font-style': 'italic',
                    'color': 'red' 
                });
            $('.gender').css('background-color', 'red');
            return false; // used for boolean value for validation before post API req 
        } else {
            $('.gender').css('background-color', '');
            $('#genderError').remove();
        }
    }

    if ($('#email').val() !== null) { // validation for email 
        if ($('#email').val().indexOf('@') === -1 || $('#email').val().indexOf('.com') == -1) {
            $('<p id="emailError">Please input a valid email address</p>').insertBefore('#emailBreak').css(
                {
                    'display': 'inline', 
                    'text-decoration': 'underline', 
                    'font-style': 'italic',
                    'color': 'red' 
                });
            $('.email').css('background-color', 'red');
            return false; // used for boolean value for validation before post API req 
        } else {
            $('.email').css('background-color', '');
            $('#emailError').remove();
        }
    }

    return true; // used for boolean value for validation before post API req 
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
        data: dataSent4Update, 
        error: () => {
            alert('Something went wrong')
        }
    })
} // end of func 

const deleteEventHandler = () => {
    $.ajax({
        type: 'DELETE', 
        url: `http://127.0.0.1:5000/attr/${dataIDFromDB}`, 
        error: () => {
            alert('Something went wrong')
        }
    })
} // end of func 

const table = () => { // table that deals with [{}, {}, {}] DS with each obj being a row 
    let table = $('<table id="tableId"/>');
    $( () => {
        $.ajax({
            type: 'GET', 
            url: 'http://127.0.0.1:5000/attr', 
            success: data => { // data in the form of [{},{},{}]
                let rowID = 1;
                if (data.length === 0 ) {
                    table.append('<p>No data')
                } else {
                    let keys = Object.keys(data[0]) // gives the keys from obj 
                    table.append('Table').css('display', 'block')
                    table.append(
                        `<th>${keys[0]}`, 
                        `<th>${keys[1]}`, 
                        `<th>${keys[2]}`, 
                        `<th>${keys[3]}`, 
                        `<th>${keys[4]}`, 
                        `<th>${keys[5]}`
                    )
                    $.each(data, (rowIndex, rowElObj) => {
                        let row = $(`<tr id='${rowIndex}'/>`); // gives the HTML tr with id attr 
                        $.each(rowElObj, (key, val) => { 
                            row.append(
                                $(`<td class='${rowID}' />`).text(val) 
                            );
                        });
                        rowID++
                        table.append(row);
                    });
                }
            }
        })
    })
    $('.table').append(table)
    $('#tableId').on('click', rowSelector4Editing); // selects row data from table to populate on form 
    $('#tableId').on('click', rowSelectionHighlight); // highlights the row 
    
} // end of func 

let rowID = null // each row on table has an ID
let dataIDFromDB = null // the ID stored in db to each obj entry in db 

const rowSelector4Editing = event => {  
    let idValue = $(event.target).attr('class') //gets idValue from class attr 
    rowID = idValue 
    $.ajax({
        type: 'GET', 
        url: 'http://127.0.0.1:5000/attr',
        success: data => {
            let idx = rowID -1; // starts idx at 0 rather than 1 
            dataValuesArray = Object.values(data[ idx ]) // selects values for any data[ idx ] into arr
            dataIDFromDB = dataValuesArray[5] // assigns var to id value from db globally 
            $('#name').val(dataValuesArray[4]) // fill in dataValue to form entry
            $('#age').val(dataValuesArray[0]) // fill in dataValue to form entry
            $('#gender').val(dataValuesArray[3]) // fill in dataValue to form entry
            $('#email').val(dataValuesArray[1]) // fill in dataValue to form entry
            $('#feedback').val(dataValuesArray[2]) // fill in dataValue to form entry
        }
    })
} // end of func 

let currRowToggle = null
let prevRowToggle = null

const rowSelectionHighlight = event => {
    let idValue = $(event.target).attr('class') // gives the idValue of currTarget 
    let rowIndex = idValue - 1; // starts rowIndex at 0 rather than 1 
    currRowToggle = $(`#${rowIndex}`) // current rowIndex from []
    if (currRowToggle !== null && prevRowToggle === null ) {
        currRowToggle.css('background-color', 'yellow');
    } else if (currRowToggle !== null && prevRowToggle !== null) {
        prevRowToggle.css('background-color', '')
    } 
    $('#tableId').on('click', prevRowToggle = $(`#${rowIndex}`), nxtRowSelectionHighlight); 
} // end of func 

const nxtRowSelectionHighlight = event => { // act like the nextRowToggle
    let idValue = $(event.target).attr('class') // gives the idValue of currTarget 
    let rowIndex = idValue - 1; // starts rowIndex at 0 rather than 1 
    $(`#${rowIndex}`).css('background-color', 'yellow');
} // end of func 

const pageLayout = () => {
    $('.id').append('<table id="layoutTable" border="2"/>')
    const parent = document.getElementById('layoutTable')
    const th1 = document.createElement('th');// could not use $('tag') see why later
    th1.className='form';
    const th2 = document.createElement('th');// could not use $('tag') see why later
    th2.className='table';
    parent.append(th1,th2)
} // end of func 

$("document").ready(function() {  
    appLayout = pageLayout()  
    dataTable = table(); 
    formCol = form()
}); 