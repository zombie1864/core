const form = () => { 
    const formLabels = ['name', 'age', 'email', 'feedback', 'gender']
    $('.form').append('Form')
    $('.form').append(
        `<th class="formColName">field label`, 
        `<th class="formColName">text field`, 
    ) // gives each col a category name 
    $.each(formLabels, (rowIndex, formLabel) => {
        let rowForm = $(`<tr class='${formLabel}'>`); // gives the HTML tr with id attr 
        if ( rowIndex === 4 ) {
            rowForm.append(`<td class='formLabel${formLabel[0].toUpperCase()+ formLabel.slice(1,formLabel.length)}'>${formLabel}</td>`,`<select id="${formLabel}Options">`);
        } else {
            rowForm.append(`<td class='formLabel${formLabel[0].toUpperCase()+ formLabel.slice(1,formLabel.length)}'>${formLabel}</td>`,`<input id="${formLabel}">`);
        }
        $('.form').append(rowForm);
    });
    $('#genderOptions').append('<option value = "0">Female', '<option  value = "1">Male', '<option value = "2">Other')
    addEventBtns()
    formCss()
} // end of func 

const addEventBtns = () => {
    const labelBtns = [
        '<input type="submit" value="Add" id="Add"/>',
        '<input type="submit" value="Edit" id="Edit"/>',
        '<input type="submit" value="Delete" id="Delete"/>',
        '<input type="submit" value="Demo" id="Demo"/>'
    ]
    $.each(labelBtns, (idx, labelBtn) => {
        $('.form').append(labelBtn)
    })
    $('#Add').on('click', addEventHandler); 
    $('#Edit').on('click', editEventHandler);
    $('#Delete').on('click', deleteEventHandler);
    $('#Demo').on('click', demoEventHandler);
}

const formCss = () => {
    $('.formColName').css( // stylized col
        {
            'text-decoration': 'underline', 
            'font-style': 'italic',
            'color': 'green'
        });
}

const formValidation = () => {
    let allValidationReq = 0
    if ($('#name').val() !== null) { // validation for name 
        if ( nameValidation() ) allValidationReq ++
    }

    if ($('#age').val() !== null ) { // validation for age 
        if ( ageValidation() ) allValidationReq ++
    }
    
    if ($('#email').val() !== null) { // validation for email 
        if ( emailValidation() ) allValidationReq ++
        // console.log(emailValidation());
    }

    if ( allValidationReq === 3 ) return true; // used for boolean value for validation before post API req 
} // end of func 

const nameValidation = () => {
    let nameValue = $('#name').val()
    if ( nameValue === '' ) {
        $('.name').append('<p id="nameError">Please input a name</p>')
        $('#nameError').css(
            {
                'text-decoration': 'underline', 
                'font-style': 'italic',
                'color': 'red' 
            })
        $('.formLabelName').css('background-color', 'red');
        return false; // used for boolean value for validation before post API req 
    }
    $.each(emailUrls, (idx, emailUrl) => {
        let emailUrlIdx = $('#name').val().indexOf(emailUrl)
         if (emailUrlIdx !== -1) {
            $('.name').append('<p id="nameError">Please input a name</p>')
            $('#nameError').css(
                {
                    'text-decoration': 'underline', 
                    'font-style': 'italic',
                    'color': 'red' 
                })
            $('.formLabelName').css('background-color', 'red');
            return false 
        } else {
            $('.formLabelName').css('background-color', '');
            $('#nameError').remove();
        }
    })
    return true; 
}

const ageValidation = () => {
    let onlyNumbers = /^[0-9]+$/ 
    if (!onlyNumbers.test($('#age').val())) { // validation for age 
        $('.age').append('<p id="ageError">Please input only numbers for your age')
        $('#ageError').css(
            {
                'text-decoration': 'underline', 
                'font-style': 'italic',
                'color': 'red' 
            });
        $('.formLabelAge').css('background-color', 'red');
        return false; // used for boolean value for validation before post API req 
    } else {
        $('.formLabelAge').css('background-color', '');
        $('#ageError').remove();
    }

    return true; 
}

const emailUrls = ['.com', '.co', '.io', '.net', '.edu']

const emailValidation = () => {
    if ( invalidEmailAddress() ) {
        $('.email').append('<p id="emailError">Please input a valid email address</p>')
        $('#emailError').css(
            {
                'text-decoration': 'underline', 
                'font-style': 'italic',
                'color': 'red' 
            });
        $('.formLabelEmail').css('background-color', 'red');
        return false; // used for boolean value for validation before post API req 
    } else {
        $('.formLabelEmail').css('background-color', '');
        $('#emailError').remove();
    }

    return true; 
}

const invalidEmailAddress = () => {
    let missingEmailRequirements = 0; 

    if ( $('#email').val().indexOf('@') === -1  ) missingEmailRequirements++; 

    $.each(emailUrls, (idx, emailUrl) => {
        if ( ($('#email').val().includes(emailUrl)) ) {
            return false 
        } else if ( idx === emailUrls.length - 1 ) {
            missingEmailRequirements++;
        }
    })

    return (missingEmailRequirements > 0 ) ? true : false
}

const addEventHandler = () => {
    if (formValidation()) { // validates the form before requesting API 
        const dataSent = { // data to be transmitted with post HTTP req 
            "Name":$('#name').val(), 
            "Age":$('#age').val(), 
            "Email":$('#email').val(), 
            "Feedback":$('#feedback').val(),
            "Gender":$('#genderOptions option:selected').val()
        }
        $.ajax({
            type: 'POST', 
            url: 'http://127.0.0.1:5000/attr',  
            data: dataSent, 
            error: () => {
                alert('Something went wrong')
            }
        })
    }
} // end of func 

const editEventHandler = () => { 
    if (formValidation()) {
        const dataSent4Update = {
            "Name":$('#name').val(), 
            "Age":$('#age').val(), 
            "Email":$('#email').val(), 
            "Feedback":$('#feedback').val(),
            "Gender":$('#genderOptions option:selected').val()
        }
        $.ajax({
            type: 'PUT', 
            url: `http://127.0.0.1:5000/attr/${dataIDFromDB}`, 
            data: dataSent4Update, 
            error: () => {
                alert('Something went wrong')
            }
        })
    }
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

const demoEventHandler = () => { // iterates seedDB, each obj is sent via post api 
    $.each( seedDB, (idx, dataObj) => {
        $.ajax({
            type: 'POST', 
            url: 'http://127.0.0.1:5000/attr',  
            data: dataObj, 
            error: () => {
                alert('Something went wrong')
            }
        })
    }) 
} // end of func 

const seedDB = [ // seeds the db with some dummy data  
    {
        'Age': '27', 
        'Email': "jeff@gmail.com",
        'Feedback': "demo test",
        'Gender': '0',
        'Name': "jeff"
    }, 
    {
        'Age': '25', 
        'Email': "jessie@gmail.com",
        'Feedback': "demo test again",
        'Gender': '1',
        'Name': "jessie"
    }, 
    {
        'Age': '29', 
        'Email': "mark@gmail.com",
        'Feedback': "mark's demo",
        'Gender': '0',
        'Name': "mark"
    }, 
    {
        'Age': '22', 
        'Email': "amy@gmail.com",
        'Feedback': "a-demo-trick",
        'Gender': '1',
        'Name': "amy"
    }
]

const tableTag = $('<table id="tableId"/>');

const pageTable = () => { // table that deals with [{}, {}, {}] DS with each obj being a row 
    $( () => {
        $.ajax({
            type: 'GET', 
            url: 'http://127.0.0.1:5000/attr', 
            success: dataFromDB => { // data in the form of [{},{},{}]
                if (dataFromDB.length === 0) {
                    tableTag.append('<p>No data')
                } else {
                    table_generator_func(dataFromDB)
                }
            }
        })
    })
    $('.table').append(tableTag)
    $('#tableId').on('click', rowSelector4Editing); // selects row data from table to populate on form 
    $('#tableId').on('click', rowSelectionHighlight); // highlights the row 
    
} // end of func 

const table_generator_func = data => { // data comes from db 
    let rowID = 1;
    let keys = Object.keys(data[0]) // gives the keys from obj 
    tableTag.append('Table').css('display', 'block')
    tableTag.append(
        `<th class="colName">${keys[0]}`, 
        `<th class="colName">${keys[1]}`, 
        `<th class="colName">${keys[2]}`, 
        `<th class="colName">${keys[3]}`, 
        `<th class="colName">${keys[4]}`, 
        `<th class="colName">${keys[5]}`
    ) // gives each col a category name 
    $('.colName').css( // stylized col
        {
            'text-decoration': 'underline', 
            'font-style': 'italic',
        });
    $.each(data, (rowIdx, rowElObj) => {
        let row = $(`<tr id='${rowIdx}'/>`); // gives the HTML tr with id attr 
        $.each(rowElObj, (key, val) => { 
            row.append(
                $(`<td class='${rowID}' />`).text(val) 
            );
        });
        rowID++
        tableTag.append(row);
    });
}

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

const rowSelectionHighlight = event => { // highlights the currRow onClick 
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

const nxtRowSelectionHighlight = event => { // highlights the next row onClick 
    let idValue = $(event.target).attr('class') // gives the idValue of currTarget 
    let rowIndex = idValue - 1; // starts rowIndex at 0 rather than 1 
    $(`#${rowIndex}`).css('background-color', 'yellow');
} // end of func 

const pageLayout = () => {
    $('.id').append('<table id="layoutTable" border="2"/>')
    const parent = document.getElementById('layoutTable')
    const th1 = document.createElement('th');// creates th tag 
    th1.className='form';
    const th2 = document.createElement('th');// creates th tag
    th2.className='table';
    parent.append(th1,th2)
} // end of func 

$(() => {  // this is the same as $('document').ready(function() { ... })
    appLayout = pageLayout();  
    formCol = form(); 
    dataTable = pageTable(); 
}); 