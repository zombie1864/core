const form = () => { 
    const form = $('<form/>'); 
    const label = $('<label/>'); 
    const formLabels = ['name', 'age', 'gender', 'email', 'feedback']
    const labelBtns = [
        '<input type="submit" value="Add" id="Add"/>',
        '<input type="submit" value="Edit" id="Edit"/>',
        '<input type="submit" value="Delete"/>'
    ]

    $.each(formLabels, (idx, formLabel) => {
        formLabel = label.textContent = formLabels[idx]
        form.append(label, formLabel, `<input id="${formLabel}">`, '<br>','<br>')
    })
    $('.form').append(form)
    $.each(labelBtns, (idx, labelBtn) => {
        $('.form').append(labelBtn)
    })
    $('#Add').on('click', addEventHandler)
    $('#Edit').on('click', editEventHandler);
    
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
            data: dataSent, 
            success: () => {
                console.log('dataSent is now in db');
            },
        })
    }
} // end of func 

const formValidation = () => {
    let hasNumber = /\d/g
    if ($('#name').val() !== null) { // validation for name 
        if(hasNumber.test($('#name').val())){        
            alert ('Please input only characters for your name')
            return false;
        };
    }

    if ($('#age').val() !== null ) {
        if (!hasNumber.test($('#age').val())) { // validation for age 
            alert ('Please input only numbers for your age');
            return false;
        }
    }

    if ($('#gender').val() !== null ) { // validation for gender
        if (!hasNumber.test($('#age').val())) {
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
}

let dataID = null 
let rowIndex = null

const idSelector = event => {
    idValue = $(event.target).attr('class')
    dataID = idValue
    // console.log(dataID)
    $.ajax({
        type: 'GET', 
        url: 'http://127.0.0.1:5000/attr',
        success: data => {
            objectLength = Object.keys(data[dataID -1]).length
            // console.log(objectLength);
            dataValuesArray = Object.values(data[dataID -1])
            // console.log(dataValuesArray);
            $('#name').val(dataValuesArray[4])
            $('#age').val(dataValuesArray[0])
            $('#gender').val(dataValuesArray[3])
            $('#email').val(dataValuesArray[1])
            $('#feedback').val(dataValuesArray[2])
        }
    })
} // end of func 

const editEventHandler = () => {
    console.log(dataID);
    const dataSent4Update = {
        "Name":$('#name').val(), 
        "Age":$('#age').val(), 
        "Gender":$('#gender').val(), 
        "Email":$('#email').val(), 
        "Feedback":$('#feedback').val()
    }
    // console.log(dataSent4Update);
    dataSent4Update
    // The following is for testing purposes
    $.ajax({
        type: 'PUT', 
        url: `http://127.0.0.1:5000/attr/${dataID}`, 
        data: dataSent4Update,
        success: () => {
            console.log('Updated!');
        }
    })
} // end of func 

const removeEventHandler = () => {
}

const construct_table = () => {
    let table = $('<table id="tableId"/>');
    $( () => {
        $.ajax({
            type: 'GET', 
            url: 'http://127.0.0.1:5000/attr', 
            success: data => {
                let idValue = 1;
                let rowID = 1; 
                data = data || null
                if (data === null ) {table.append('<p>No data<p>')}
                $.each(data, (rowIndex, r) => {
                        let row = $(`<tr id='${rowIndex}'/>`);
                        // console.log(rowIndex);
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
    $('#tableId').on('click', idSelector);
    $('#tableId').on('click', dataSelector);
    
} // end of func 

const dataSelector = event => { // COME BACK TO THIS LATER 
    // EFFECTIVLY TRYING TO TOGGLE BACKGROUND BETWEEN CLICKS 

    let idValue = $(event.target).attr('class')
    console.log('cliked');
    let rowIndex = idValue - 1;
    // console.log(rowIndex);
    $(`#${rowIndex}`).css('background-color', 'red');
    // $(`#${rowIndex}`).toggle("selected").css('background-color', 'red');
    // $(`#${rowIndex}`).toggle("selected").css('background-color', 'red');
    $('#tableId').on('click', dataSelector2);
}
const dataSelector2 = event => { 
    let idValue = $(event.target).attr('class')
    console.log('clicked another');
    let rowIndex = idValue - 1;
    // console.log(rowIndex);
     $(`#${rowIndex}`).css('background-color', 'yellow');
    // $(`#${rowIndex}`).toggle("selected").css('background-color', 'yellow');
    $('#tableId').on('click', dataSelector);

}

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

