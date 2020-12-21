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
    const $name = $('#name'); // select id by name 
    const $age = $('#age'); 
    const $gender = $('#gender'); 
    const $email = $('#email'); 
    const $feedback = $('#feedback'); 
    const dataSent = {
        "Name":$name.val(), 
        "Age":$age.val(), 
        "Gender":$gender.val(), 
        "Email":$email.val(), 
        "Feedback":$feedback.val()
    }
    $.ajax({
        type: 'POST', 
        url: 'http://127.0.0.1:5000/attr',  
        data: dataSent, 
        processData: false,
        contentType: false,
        success: () => {
            console.log('dataSent is now in db');
            // console.log(dataSent);
        },
    })
}

let dataID = null 

const idSelector = event => {
    idValue = $(event.target).attr('class')
    dataID = idValue
    console.log(dataID);
}

const editEventHandler = () => {
    // console.log(dataID);
    // The following is for testing purposes
    $.ajax({
        type: 'PUT', 
        url: `http://127.0.0.1:5000/attr/${idValue}`, 
        dataType: 'json', 
        data: {
            "Name": 'Tiff', 
            "Age": '27', 
            "Gender": '1', 
            "Email":'Tiff@gmail.com', 
            "Feedback":'Hi!',
            "id":`${idValue}`
        },
        success: () => {
            console.log('Hacked!');
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
                data = data || null
                if (data === null ) {table.append('<p>No data<p>')}
                $.each(data, (rowIndex, r) => {
                        let row = $('<tr/>');
                        $.each(r, (colIndex, c) => { 
                            row.append(
                                $('<t'+(rowIndex == 0 ?  `h class='${idValue}' id="dataEl"` : `d class='${idValue}' id="dataEl"`)+'/>').text(c) 
                                );
                            });
                        idValue++
                        table.append(row);
                    });
                }
            })
        })
    $('.table').append(table)
    $('#tableId').on('click', dataSelector);
    $('#tableId').on('click', idSelector);
}

const dataSelector = event => {
    $(event.target).css('background-color', 'yellow'); 
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

