const emailUrls = ['.com', '.co', '.io', '.net', '.edu']
let rowID = null // each row on table has an ID
let dataIDFromDB = null // the ID stored in db to each obj entry in db 
let currRowToggle = null
let prevRowToggle = null

const form = () => { 
    const formLabels = ['name', 'age', 'email', 'feedback', 'gender']
    const inputPlaceHolders = ['bobby247', '18', 'abc@ccny.cuny.edu', 'cool']
    const formColNameClasses = ['fieldCol', 'textCol']
    const tableHeaders = ['field label', 'text field']

    $('.form').append('Form')
    formTableHeaders(formColNameClasses, tableHeaders) // gives each col a category name 
    formRowandData(formLabels, inputPlaceHolders) // gives form table, row and td tags  
    addEventBtns()
    formCss(formLabels) // stylizes the form
} // end of func 

const formTableHeaders = (formColNameClasses, tableHeaders) => {
    $.each(tableHeaders, (idx, tableHeader) => {
        $('.form').append(`<th class="${formColNameClasses[idx]}">${tableHeader}`)
    })
} // end of func

const formRowandData = (formLabels, inputPlaceHolders) => {
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
    $('#genderOptions').append('<option value = "0">Female', '<option  value = "1">Male', '<option value = "2">Other')
} // end of func

const addEventBtns = () => {
    const labelBtns = ['Add', 'Edit', 'Delete', 'Demo']

    $.each(labelBtns, (idx, labelBtn) => {
        $('.form').append(`<input type="submit" value="${labelBtn}" id="${labelBtn}">`)
    })
    $('#Add, #Edit, #Delete, #Demo').on('click', function() {
        switch(this.id) {
            case 'Add':
                textFieldData(this.id)
                break 
            case 'Edit':
                textFieldData(this.id)
                break 
            case 'Delete':
                deleteEventHandler()
                break 
            case 'Demo': 
                demoEventHandler()
        }
    })
    $( document ).ajaxComplete( () => { // determines the css style for btns after ajax call 
        let lengthOfTable = $('#tableId tr').length
        switch (lengthOfTable) {
            case 0: 
                noDataBtnsCss(labelBtns)
                break 
            default: 
                btnsCss(labelBtns)
        }
    })
} // end of func

const btnsCss = labelBtns => {
    $.each(labelBtns, ( idx, labelBtn) => {
        $(`#${labelBtn}`).css(
            {
                'background-color': '#4CAF50',
                'border-radius': '10px',
                'color': 'white',
                'padding': '10px 20px',
                'text-align': 'center',
                'display': 'inline-block',
                'font-size': '16px',
                'margin': '10px 5px',
                'cursor': 'pointer', 
                'position': 'relative', 
                'bottom': '-150px',
            }
        )
    })
} // end of func

const noDataBtnsCss = labelBtns => {
    $.each(labelBtns, ( idx, labelBtn) => {
        $(`#${labelBtn}`).css(
            {
                'background-color': '#4CAF50',
                'border-radius': '10px',
                'color': 'white',
                'padding': '10px 20px',
                'text-align': 'center',
                'display': 'inline-block',
                'font-size': '16px',
                'margin': '10px 5px',
                'cursor': 'pointer', 
                'position': 'relative', 
                'bottom': '-150px',
                'left': '100px'
            }
        )
    })
} // end of func

const formCss = formLabels => {
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
    $.each(formLabels, (idx, formLabel) => {
        $(`#${formLabel}, #genderOptions, .formLabel${formLabel[0].toUpperCase()+ formLabel.slice(1,formLabel.length)}`).css(
            {
                'position': 'relative', 
                'left': '10vw',     
            }
        )
    })
    $('table th.form').css('border-spacing', '25px')
} // end of func

const textFieldData = (labelBtnID) => {
    textFieldDataObj = {
        "Name":$('#name').val(), 
        "Age":$('#age').val(), 
        "Email":$('#email').val(), 
        "Feedback":$('#feedback').val(),
        "Gender":$('#genderOptions option:selected').val() 
    }
    switch(labelBtnID) {
        case 'Add':
            addEventHandler(textFieldDataObj)
            break
        case 'Edit':
            editEventHandler(textFieldDataObj)
    }
}

const formValidated = (textFieldDataObj) => {
    return (nameValidation(textFieldDataObj.Name) && ageValidation(textFieldDataObj.Age) && emailValidation(textFieldDataObj.Email) ) ? true : false;

} // end of func 

const errorTypes = ['nameError', 'ageError', 'emailError']; 

const nameValidation = (nameValue) => {
    // let nameValue = $('#name').val()
    if ( $('#nameError').length > 0 ) {
    } else if ( nameValue === '' ) {
        $('.name').append(`<p id="${errorTypes[0]}">Please input a name</p>`)
        errorMsgCss(errorTypes[0], 'formLabelName')
        return false; // used for boolean value for validation before post API req 
    }

    $.each(emailUrls, (idx, emailUrl) => {
        let emailUrlIdx = $('#name').val().indexOf(emailUrl)
         if (emailUrlIdx !== -1) {
            $('.name').append('<p id="nameError">Please input a name</p>')
            errorMsgCss(errorTypes[0], 'formLabelName')

            return false 
        } else if ( emailUrlIdx === -1 && $('#name').val().length > 1 ) {
            $('.formLabelName').css('background-color', '');
            $('#nameError').remove();
        }
    })
    if ( $('#nameError').length === 0 ) return true; 
} // end of func

const ageValidation = (ageValue) => {
    let onlyNumbers = /^[0-9]+$/ 
    if ( $('#ageError').length > 0 ) {
    } else if (!onlyNumbers.test($('#age').val())) { // validation for age 
        $('.age').append(`<p id="${errorTypes[1]}">Please input only numbers for your age`)
        errorMsgCss(errorTypes[1], 'formLabelAge')
        return false; // used for boolean value for validation before post API req 
    }
    if ( ageValue > 0 ) {
        $('.formLabelAge').css('background-color', '');
        $('#ageError').remove();
    }

    if ( $('#ageError').length === 0 ) return true; 
} // end of func

const emailValidation = (emailValue) => {
    if ( $('#emailError').length > 0 ) {
    } else if ( invalidEmailAddress() ) {
        $('.email').append(`<p id="${errorTypes[2]}">Please input a valid email address</p>`)
        errorMsgCss(errorTypes[2], 'formLabelEmail')
        return false; // used for boolean value for validation before post API req 
    } 
    if ( emailValue.length > 0 && !invalidEmailAddress() ) {
        $('.formLabelEmail').css('background-color', '');
        $('#emailError').remove();
    }

    if ( $('#emailError').length === 0 ) return true; 
} // end of func

const invalidEmailAddress = () => {
    let missingEmailRequirements = 0; 

    if ( $('#email').val().indexOf('@') === -1  ) missingEmailRequirements++; 

    $.each(emailUrls, (idx, emailUrl) => {
        if ( ($('#email').val().includes(emailUrl)) ) {
            return false // this breaks the loop 
        } else if ( idx === emailUrls.length - 1 ) {
            missingEmailRequirements++;
        }
    })

    return (missingEmailRequirements > 0 ) ? true : false
} // end of func

const errorMsgCss = ( errorId, formLabelClass) => {
    $(`#${errorId}`).css(
        {
            'text-decoration': 'underline', 
            'font-style': 'italic',
            'color': 'red', 
            'position': 'relative', 
            'left': '10vw', 
        })
    $(`.${formLabelClass}`).css(
        {
            'background-color': 'red', 
            'border-radius': '10px',
        }
    );
}

const addEventHandler = (textFieldDataObj) => {
    if (formValidated(textFieldDataObj)) { // validates the form before requesting API 
        $.ajax({
            type: 'POST', 
            url: 'http://127.0.0.1:5000/attr',  
            data: textFieldDataObj, 
            success: () => {
                location.reload() // reloads the page on success 
            }, 
            error: () => {
                alert('Something went wrong')
            }
        })
    }
} // end of func 

const editEventHandler = (textFieldDataObj) => { 
    if (formValidated(textFieldDataObj)) {
        $.ajax({
            type: 'PUT', 
            url: `http://127.0.0.1:5000/attr/${dataIDFromDB}`, 
            data: textFieldDataObj, 
            success: () => {
                location.reload() // reloads the page on success 
            },
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
        success: () => {
            location.reload() // reloads the page on success 
        }, 
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
            success: () => {
                location.reload() // reloads the page on success 
            }, 
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

const pageTable = () => { // table that deals with [{}, {}, {}] DS with each obj being a row 
const tableTag = $('<table id="tableId"/>');
    $( () => {
        $.ajax({
            type: 'GET', 
            url: 'http://127.0.0.1:5000/attr', 
            success: dataFromDB => { // data in the form of [{},{},{}]
                if (dataFromDB.length === 0) {
                    tableTag.append('<p id="noData" class="noData2">No data').css(
                        {
                            'display': 'block'
                        }
                    )
                    $('.table').css(
                        {
                            'position': 'relative', 
                            'left': '200px'
                        }
                    )
                } else {
                    tableTag.remove('.noData2')
                    table_generator_func(dataFromDB, tableTag)
                }            
            }
        })
    })
    $('.table').append(tableTag)
    $('#tableId').on('click', rowSelector4Editing); // selects row data from table to populate on form 
    $('#tableId').on('click', rowSelectionHighlight); // highlights the row     
} // end of func 

const table_generator_func = (data, tableTag) => { // data comes from db 
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
} // end of func

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
            $('#genderOptions').val(dataValuesArray[3]) // fill in dataValue to form entry
            $('#email').val(dataValuesArray[1]) // fill in dataValue to form entry
            $('#feedback').val(dataValuesArray[2]) // fill in dataValue to form entry
        }
    })
} // end of func 

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
    $('.id').append('<table id="layoutTable"/>')
    const parent = document.getElementById('layoutTable')
    const th1 = document.createElement('th');// creates th tag 
    th1.className='form';
    const th2 = document.createElement('th');// creates th tag
    th2.className='table';
    parent.append(th1,th2)
    pageLayoutCss(); 
} // end of func 

const pageLayoutCss = () => {
    $('body').css(
        {
            'background': 'linear-gradient(#d7fadc, #85d490)',
            'height': '100%',
            'margin': '0',
            'background-repeat': 'no-repeat',
            'background-attachment': 'fixed'
        }
    )
    $('#layoutTable th.form').css(
        {
            'width': '60%', 
            'height': '600px'
        }
    )

    $('#layoutTable th.table').css('border-style', 'solid')
} // end of func

$(() => {  // this is the same as $('document').ready(function() { ... })
    pageLayout();  
    form(); 
    pageTable(); 
}); 