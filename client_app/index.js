const emailUrls = ['.com', '.co', '.io', '.net', '.edu']
const errorTypes = ['nameError', 'ageError', 'emailError']; 
const formLabels = ['Name', 'Age', 'Email', 'Feedback', 'Gender']
const webUrl = 'http://127.0.0.1:5000/attr'
const tableTag = $('<table id="tableId"/>');
let rowID = null // each row on table has an ID
let dataIDFromDB = null // the ID stored in db to each obj entry in db 
let currRowToggle = null
let prevRowToggle = null

const form = () => { 
    const inputPlaceHolders = ['bobby247', '18', 'abc@ccny.cuny.edu', 'cool']
    const formColNameClasses = ['fieldCol', 'textCol'] // used to stylize the colName 
    const tableHeaders = ['field label', 'text field']

    $('.form').append('<p class="formTxt">Form')
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
    $('#GenderOptions').append('<option value = "0">Female', '<option  value = "1">Male', '<option value = "2">Other')
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
                'left': '80px'

            }
        )
    })
} // end of func

const formCss = formLabels => {
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
    $.each(formLabels, (idx, formLabel) => {
        $(`#${formLabel}, #GenderOptions, .formLabel${formLabel[0].toUpperCase()+ formLabel.slice(1,formLabel.length)}`).css(
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
    textFieldDataObj = { // graps the data from the text fields 
        "Name":$('#Name').val(), 
        "Age":$('#Age').val(), 
        "Email":$('#Email').val(), 
        "Feedback":$('#Feedback').val(),
        "Gender":$('#GenderOptions option:selected').val() 
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

const nameValidation = (nameValue) => { // only handles returning a boolean 
    let result = true; 
    return nameValidationCSSErr(nameValue, result)
} // end of func

const nameValidationCSSErr = (nameValue, result) => { // handles the UI CSS layer 
    if ( $('#nameError').length > 0 && nameValue === '') { // ensures name validation regardless of how many attempts to submit 
        return result = false ;
    } else if ( nameValue === '' ) {
        $('.Name').append(`<p id="${errorTypes[0]}">Please input a name</p>`)
        errorMsgCss(errorTypes[0], 'formLabelName') 
        return result = false; // used for boolean value for validation before post API req 
    }
    $.each(emailUrls, (idx, emailUrl) => {
        let emailUrlIdx = nameValue.indexOf(emailUrl)
        if (nameValue.includes(emailUrl) && $('#nameError').length > 0) {
            return result = false 
        } else if (emailUrlIdx !== -1) {
            $('.Name').append('<p id="nameError">Please input a name</p>')
            errorMsgCss(errorTypes[0], 'formLabelName')
            return result = false // if emailUrl found this breaks the loop and returns false
        } else if ( emailUrlIdx === -1 && nameValue.length > 1 ) {
            $('.formLabelName').css('background-color', '');
            $('#nameError').remove();
        }
    })
    return result
}

const ageValidation = (ageValue) => { 
    let result = true; 
    let onlyNumbers = /^[0-9]+$/ 
    if ( $('#ageError').length > 0 && !onlyNumbers.test( ageValue )) { // ensures age validation regardless of how many attempts to submit
        result = false 
    } else if (!onlyNumbers.test( ageValue )) { // validation for age 
        $('.Age').append(`<p id="${errorTypes[1]}">Please input only numbers for your age`)
        errorMsgCss(errorTypes[1], 'formLabelAge')
        result = false; // used for boolean value for validation before post API req 
    }
    if ( ageValue > 0 ) {
        $('.formLabelAge').css('background-color', '');
        $('#ageError').remove();
    }
    return result 
} // end of func

const emailValidation = (emailValue) => {
    let result = true; 
    if ( $('#emailError').length > 0 ) { // SEE IF YOU CAN MAKE THIS MAKE MORE SENSE 
        $('.formLabelEmail').css('background-color', '');
        $('#emailError').remove();
    } 
    if ( invalidEmailAddress(emailValue) ) {
        $('.Email').append(`<p id="${errorTypes[2]}">Please input a valid email address</p>`)
        errorMsgCss(errorTypes[2], 'formLabelEmail')
        result = false; // used for boolean value for validation before post API req 
    } 
    return result
} // end of func

const invalidEmailAddress = (emailValue) => {
    let missingEmailRequirements = 0; 

    if ( emailValue.indexOf('@') === -1  || emailValue.indexOf('@') === 0) missingEmailRequirements++; 

    $.each(emailUrls, (idx, emailUrl) => {
        if ( emailValue.includes(`@${emailUrl}`) ) missingEmailRequirements++; 
        if (
            emailValue.includes(`${emailUrl}${emailUrl}`) ||
            emailValue.includes(`${emailUrl}.com`) || 
            emailValue.includes(`${emailUrl}.co`) || 
            emailValue.includes(`${emailUrl}.io`) || 
            emailValue.includes(`${emailUrl}.net`) || 
            emailValue.includes(`${emailUrl}.edu`)
        ) missingEmailRequirements++; 
        if ( ( emailValue.includes(emailUrl) ) ) {
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
            success: dataFromDB => {
                tableRefresh(dataFromDB) // refreshes the table 
                clearInputTxtFields() // clears the input fields after adding form 
            }, 
            error: (errMsg) => {
                $('.id').append(`<div>${errMsg}`)
            }
        })
    }
} // end of func 

const editEventHandler = (textFieldDataObj) => { 
    if (formValidated(textFieldDataObj)) {
        $.ajax({
            type: 'PUT', 
            url: `${webUrl + '/' + dataIDFromDB}`, 
            data: textFieldDataObj, 
            success: dataFromDB => {
                tableRefresh(dataFromDB)
                clearInputTxtFields() // clears the input fields after editing form
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
        success: (dataFromDB) => {
            $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
            tableDataGenerator(dataFromDB[1])// generates the rows for the table 
            $('#tableId tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
            clearInputTxtFields() // clears the input fields after deleting form 
            clearErrCssMsg() // clears the err msg for nxt session 
        }, 
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
                    if ( $('.table').find('tr').length === 0 ) {
                        $('.noData2').remove()
                        tableGeneratorFunc(dataFromDB, tableTag)
                    } else {
                        $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
                        tableDataGenerator(dataFromDB) // generates the rows for the table 
                    }
                    clearInputTxtFields()
                    $('#tableId tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
                })            
            }, 
            error: (errMsg) => {
                $('.id').append(`<div>${errMsg}`)
            }
        })
    }) 
} // end of func 

const tableRefresh = dataFromDB => { // refreshes comp without refresh to the entire DOM 
    if ( $('.table').find('tr').length === 0 ) { // no td -> generate the table
        $('.noData2').remove()
        tableGeneratorFunc(dataFromDB[1], tableTag)
    } else {
        $('tr').remove('.dataElFromDB') // removes all tr with class name dataElFromDB
        tableDataGenerator(dataFromDB[1]) // generates the rows for the table 
    }
    $('#tableId tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
} // end of func

const clearInputTxtFields = () => { // clears the input fields
    $.each( formLabels, (idx, formlabel) => {
        $(`#${formlabel}`).val('')  
    })
}

const clearErrCssMsg = () => {
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
    $.ajax({
        type: 'GET', 
        url: webUrl, 
        success: dataFromDB => { // data taken from db in the form of [{},{},{}
            if (dataFromDB.length === 0) {
                emptyDB_CSS(tableTag)
            } else {
                tableTag.remove('.noData2')
                tableGeneratorFunc(dataFromDB, tableTag)
                $('#tableId tr').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 
            }            
        }
    })
    $('.table').append(tableTag)
    // $('#tableId').on('click', rowSelector4Editing); // selects row data from table to populate on form, placed after ajax call IMPORTANT 

} // end of func 

const emptyDB_CSS = tableTag => {
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
}

const tableGeneratorFunc = (dataFromDB, tableTag) => { // data comes from db [ {}, {}, {} ]
    colNameGenerator(dataFromDB, tableTag) // generates the colNames for the table 
    tableDataGenerator(dataFromDB) // generates the data that is display to the table 
} // end of wrapper func

const colNameGenerator = (dataFromDB, tableTag) => {
    if ( $('.table').find('th').length === 0) {
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

const rowSelector4Editing = event => { // deals w. the logic if populating the text field
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
    rowSelectionHighlight(event) // deals w. the logic for highlighting row 
} // end of func 

const rowSelectionHighlight = (event) => { // highlights the currRow onClick 
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

    $('#layoutTable th.table').css(
        {
        'border-style': 'solid', 
        'position': 'relative', 
        'left': '200px'
        }
    )
} // end of func

/*****************************************************************************/
// ---------------------------------[ Unit Testing ]---------------------------------
/*****************************************************************************/
const testCases = {
    'input': [ // test cases 
        {  
            "Name" : 'Karl@yay.io', //---nameValidation failed---
            "Age" : 'Karl', // ---ageValidation failed---
            "Email" : 'Pie', // ---emailValidation failed---
            "Feedback" : 'Yay!', 
            "Gender" : '1'
        }, // false 
        {
            "Name" : 'Jimmy', 
            "Age" : '12', 
            "Email" : 'Neutron@nick.com', 
            "Feedback" : 'Gotta blast!', 
            "Gender" : '1'
        }, // true 
        {
            "Name" : 'Sheen', 
            "Age" : '12', 
            "Email" : 'Sheen100gmail.com', // ---emailValidation failed---
            "Feedback" : 'Ultra lord!', 
            "Gender" : '1'
        }, // false 
        {
            "Name" : '.comkarl', //---nameValidation failed---
            "Age" : '12', 
            "Email" : '@karl.io', // ---emailValidation failed---
            "Feedback" : 'lama', 
            "Gender" : '1'
        }, // false 
        {
            "Name" : 'spongbob', 
            "Age" : '22', 
            "Email" : 'wer23@.com', // ---emailValidation failed--- 
            "Feedback" : 'FUN!', 
            "Gender" : '1'
        }, // false 
        {
            'Name': 'Patrick24', // true 
            'Age': '22', 
            'Email': 'pat@underRock.edu', 
            'Feedback': 'My mind is an egima!', 
            'Gender': '2'
        },
        {
            "Name" : 'karl.com', //---nameValidation failed---
            "Age" : '12karl', // ---ageValidation failed---
            "Email" : 'karl@nick.com', 
            "Feedback" : 'lamas Jimmy!', 
            "Gender" : '1'
        }, // false 
    ],
    'output': [ false, true, false, false, false, true, false ] // predicted outcomes  
}

const _test_ENV = method => { // test ENV free from UI layer
    const arrOfInputs = testCases.input, // graps the input [{}, {}, {}]
          arrOfOutputs = testCases.output // graps the output [ boolean ]
    $.each(arrOfInputs, (idx, inputObj) => { // iterates thr arrOfInputs 
        
        try { // test the validation but not aux func 
            if (method(inputObj) !== true ) throw `${method} returns false`
        } catch (err) {
            console.log(inputObj, `predicted outcomes are: [ ${arrOfOutputs} ]\
            at index, idx = ${idx} the method\ 
            ${err}`);
        } finally {
            clearErrCssMsg() // clears err msg for nxt session 
        }
        // passes the inputObj for a second time for the aux func 
        try { // aux func are tested, if err - gives helpful msg of failure 
            if (nameValidation(inputObj.Name) !== true ) throw '---nameValidation failed---'
        } catch (err) {
            console.log(err);
        } finally {
            clearErrCssMsg() // clears err msg for nxt session 
        }
        try { // aux func are tested, if err - gives helpful msg of failure 
            if (emailValidation(inputObj.Email) !== true ) throw '---emailValidation failed---'
        } catch (err) {
            console.log(err);
        } finally {
            clearErrCssMsg() // clears err msg for nxt session 
        }
        try { // aux func are tested, if err - gives helpful msg of failure 
            if (ageValidation(inputObj.Age) !== true ) throw '---ageValidation failed---'
        } catch (err) {
            console.log(err);
        } finally {
            clearErrCssMsg() // clears err msg for nxt session 
        }
    })

    $.each( formLabels, (idx, formlabel) => {
        $(`#${formlabel}`).val('') // clears the input fields 
    })
}

$(() => {  // this is the same as $('document').ready(function() { ... })
    pageLayout();  
    form(); 
    pageTable(); 
    // _test_ENV( formValidated ) // test unit for dev purposes 
}); 