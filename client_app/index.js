const form = () => {
    const form = $('<form id="form"/>'); 
    const label = $('<label/>'); 
    const formLabels = ['name', 'age', 'gender', 'email', 'feedback']
    const labelBtns = [
        '<input type="submit" value="Add"/>',
        '<input type="submit" value="Edit"/>',
        '<input type="submit" value="Delete"/>'
    ]

    $.each(formLabels, (idx, formLabel) => {
        formLabel = label.textContent = formLabels[idx]
        form.append(label, formLabel, '<input required>', '<br>','<br>')
    })
    $('.form').append(form)
    $.each(labelBtns, (idx, labelBtn) => {
        $('.form').append(labelBtn)
    })
}

let addEventHandler = () => {
    return $.ajax({
        method: 'POST', 
        url: '/attr',
        data: data, // correct this part later
        processData: false,
        contentType: false
    })
}

let editEventHandler = () => {
}

let removeEventHandler = () => {
}

const construct_table = () => {
    let table = $('<table id="tableId"/>');
    let idValue = 0; 
    $( () => {
        $.ajax({
            type: 'GET', 
            url: 'http://127.0.0.1:5000/attr', 
            success: data => {
                data = data || null
                if (data === null ) {table.append('<p>No data<p>')}
                    $.each(data, (rowIndex, r) => {
                        let row = $('<tr/>');
                        $.each(r, (colIndex, c) => { 
                            row.append(
                                $('<t'+(rowIndex == 0 ?  `h class='${idValue}' id="dataEl"` : `d class='${idValue}' id="dataEl"`)+'/>').text(c) 
                            );
                            idValue++
                        });
                        table.append(row);
                    });
                }
            })
        })
    $('.table').append(table)
    $('#tableId').on('click', dataSelector);
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
    