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
        form.append(label, formLabel, `<input id="${formLabel}"required>`, '<br>','<br>')
    })
    $('.form').append(form)
    $.each(labelBtns, (idx, labelBtn) => {
        $('.form').append(labelBtn)
    })
    $('#Add').on('click', addEventHandler)
    $('#Edit').on('click', editEventHandler);
    
}

const addEventHandler = event => {
    event.preventDefault(); 
    const dataSent = {
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
        success: () => {
            console.log('dataSent is now in db');
        },
    })
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
}

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
}

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
                        let row = $(`<tr class='${rowIndex}'/>`);
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
    // $('.2').on('click', dataSelector);
}

const dataSelector = event => { // SOMETHING LIKE THIS BUT KEEP WORKING ON IT 
    idValue = $(event.target).attr('class')
    console.log(idValue);
    rowIndex = idValue - 1
    // $(event.target).css('background-color', 'yellow'); 
    console.log(rowIndex);
    $(`.${rowIndex}`).css('background-color', 'yellow');
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
}

$("document").ready(function() {  
    appLayout = pageLayout()  
    dataTable = construct_table(); 
    formCol = form()
}); 

