let form = () => {
    const form = $('<form/>'); 
    const label = $('<label/>'); 
    const formLabels = ['name', 'age', 'gender', 'email', 'feedback']

    $.each(formLabels, (idx, formLabel) => {
        formLabel = label.textContent = formLabels[idx]
        form.append(label, formLabel, '<input class="must">', '<br>','<br>')
    })
    form.append('<input class="submit" type="submit" value="Add">')
    $('.form').append(form)
}

let data = [
    {'col_1':'data', 'col_2':'data', "col_3":'data'},
    {'col_1':'data', 'col_2':'data', "col_3":'data'}, 
    {'col_1':'data', 'col_2':'data', "col_3":'data'}
]

let onclick = () => {
    console.log('clicked');
}

let construct_table = data => {
    data = data || null
    let table = $('<table id="tableId"/>');
    let idValue = 0; 
    if (data === null ) {
        table.append('<p>No data<p>')
    } else {
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
    $('.table').append(table)
    $('#tableId').on('click', event => {
        $(event.target).css('background-color', 'yellow'); 
    });
}

let pageLayout = () => {
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
    dataTable = construct_table(data); 
    formCol = form()
    $('.must').validate(); 
}); 
    