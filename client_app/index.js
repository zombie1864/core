const emailUrls = ['.com', '.co', '.io', '.net', '.edu']
const errorTypes = ['nameError', 'ageError', 'emailError']; 
const formLabels = ['name', 'age', 'email', 'feedback', 'gender']
const webUrl = 'http://127.0.0.1:5000/attr'
let rowID = null // each row on table has an ID
let dataIDFromDB = null // the ID stored in db to each obj entry in db 
let currRowToggle = null
let prevRowToggle = null

const form = () => { 
    const inputPlaceHolders = ['bobby247', '18', 'abc@ccny.cuny.edu', 'cool']
    const formColNameClasses = ['fieldCol', 'textCol'] // used to stylize the colName 
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

/*****************************************************************************/
// ---------------------------------[ FORM VALIDATION ]---------------------------------
/*****************************************************************************/

const textFieldData = (labelBtnID) => { // creates the data obj from input for adding or editing 
    textFieldDataObj = {
        "Name":$('#name').val(), 
        "Age":$('#age').val(), 
        "Email":$('#email').val(), 
        "Feedback":$('#feedback').val(),
        "Gender":$('#genderOptions option:selected').val() 
    }
    switch(labelBtnID) { // based on ID data obj will be added or edited 
        case 'Add':
            addEventHandler(textFieldDataObj)
            break
        case 'Edit':
            editEventHandler(textFieldDataObj)
    }
} // end of func 

const formValidated = (textFieldDataObj) => {
    return (nameValidation(textFieldDataObj.Name) && ageValidation(textFieldDataObj.Age) && emailValidation(textFieldDataObj.Email) ) ? true : false;
} // end of func 

const nameValidation = (nameValue) => {
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

/*****************************************************************************/
// ---------------------------------[ BtnsEventHandlers ]---------------------------------
/*****************************************************************************/

const addEventHandler = (textFieldDataObj) => {
    if (formValidated(textFieldDataObj)) { // validates the form before requesting API 
        $.ajax({
            type: 'POST', 
            url: webUrl,  
            data: textFieldDataObj, // { ... } single obj added to [ {}, {}, ..., {}]
            success: () => {
                $.get(webUrl, (dataFromDB) => {
                    $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
                    tableDataGenerator(dataFromDB) // generates the rows for the table 
                    $.each( formLabels, (idx, formlabel) => {
                        $(`#${formlabel}`).val('') // clears the input fields 
                    })
                })
            }, 
            error: (errMsg) => {
                $('.id').append(`<div>${errMsg}`)
            }
        })
    }
} // end of func 

const editEventHandler = (textFieldDataObj) => { 
    if (formValidated(textFieldDataObj)) {
        console.log(textFieldDataObj);
        $.ajax({
            type: 'PUT', 
            url: `${webUrl + '/' + dataIDFromDB}`, 
            data: textFieldDataObj, 
            success: () => {
                $.get(webUrl, (dataFromDB) => {
                    $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
                    tableDataGenerator(dataFromDB) // generates the rows for the table 
                    $.each( formLabels, (idx, formlabel) => {
                        $(`#${formlabel}`).val('') // clears the input fields 
                    })
                })
            },
            error: (errMsg) => {
                $('.id').append(`<div>${errMsg}`)
            }
        })
    }
} // end of func 

const deleteEventHandler = () => {
    $.ajax({
        type: 'DELETE', 
        url: `${webUrl + '/' + dataIDFromDB}`, 
        success: () => {
            $.get(webUrl, (dataFromDB) => {
                $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
                tableDataGenerator(dataFromDB) // generates the rows for the table 
                $.each( formLabels, (idx, formlabel) => {
                    $(`#${formlabel}`).val('') // clears the input fields 
                })
            })        }, 
        error: (errMsg) => {
            $('.id').append(`<div>${errMsg}`)
        }
    })
} // end of func 

const demoEventHandler = () => { // iterates seedDB, each obj is sent via post api 
    $.each( seedDB, (idx, dataObj) => {
        $.ajax({
            type: 'POST', 
            url: webUrl,  
            data: dataObj, 
            success: () => {
                $.get(webUrl, (dataFromDB) => {
                    $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
                    tableDataGenerator(dataFromDB) // generates the rows for the table 
                    $.each( formLabels, (idx, formlabel) => {
                        $(`#${formlabel}`).val('') // clears the input fields 
                    })
                })            
            }, 
            error: (errMsg) => {
                $('.id').append(`<div>${errMsg}`)
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
/*****************************************************************************/
// ---------------------------------[ TABLE ]---------------------------------
/*****************************************************************************/

const pageTable = () => { // table that deals with [{}, {}, {}] DS with each obj being a row 
    const tableTag = $('<table id="tableId"/>');
    $( () => {
        $.ajax({
            type: 'GET', 
            url: webUrl, 
            success: dataFromDB => { // data taken from db in the form of [{},{},{}]
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
                    tableGeneratorFunc(dataFromDB, tableTag)
                }            
            }
        })
    })
    $('.table').append(tableTag)
    $('#tableId').on('click', rowSelector4Editing); // selects row data from table to populate on form 
    $('#tableId').on('click', rowSelectionHighlight); // highlights the row     
} // end of func 

const tableGeneratorFunc = (dataFromDB, tableTag) => { // data comes from db [ {}, {}, {} ]
    colNameGenerator(dataFromDB, tableTag) // generates the colNames for the table 
    tableDataGenerator(dataFromDB) // generates the data that is display to the table 
} // end of func

const colNameGenerator = (dataFromDB, tableTag) => {
    let keys = Object.keys(dataFromDB[0]) // gives the keys from obj 
    tableTag.append('Table').css('display', 'block')
    $.each(keys, (idx, key) => {
        tableTag.append(`<th class="colName">${key}`) // gives each col a category name 
    })
    $('.colName').css( // stylized col
        {
            'text-decoration': 'underline', 
            'font-style': 'italic',
        }
    );
}

const tableDataGenerator = (dataFromDB) => { // data is [ {}, {}, {} ]
    let rowID = 1;
    $.each(dataFromDB, (rowIdx, rowElObj) => {
        let row = $(`<tr id='${rowIdx}' class="dataElFromDB"/>`); // gives the HTML tr with id attr 
        $.each(rowElObj, (key, val) => { 
            row.append(
                $(`<td class='${key + rowID}' />`).text(val) 
            );
        });
        rowID++
        $('#tableId').append(row);
    });
}

const rowSelector4Editing = event => {  
    let trIdValue = $(event.target).closest('tr').attr('id') // returns the id from tr 

    $.each( formLabels, (idx, formLabel) => {
        let dataForSelection = $(`.${
            formLabel[0].toUpperCase()+ 
            formLabel.slice(1,formLabel.length) + 
            (parseInt(trIdValue) + 1) 
        }`).html()

        $(`#${formLabel}`).val(`${dataForSelection}`)
        if ( idx === formLabels.length - 1 ) $(`#${formLabel}Options`).val(`${dataForSelection}`) // populates inputs with td values 
    })
} // end of func 

const rowSelectionHighlight = event => { // highlights the currRow onClick 
    let idValue = $(event.target).attr('class').slice(-1) // gives the idValue of currTarget 
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
    let idValue = $(event.target).attr('class').slice(-1) // gives the idValue of currTarget 
    let rowIndex = idValue - 1; // starts rowIndex at 0 rather than 1 
    $(`#${rowIndex}`).css('background-color', 'yellow');
} // end of func 

const pageLayout = () => {
    $('.id').append('<table id="layoutTable"/>')
    const th1 = $('<th class="form">');// creates th tag 
    const th2 = $('<th class="table">');// creates th tag
    $('#layoutTable').append(th1,th2)
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