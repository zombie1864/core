let form = () => {
    const form = $('<form/>'); 
    const label = $('<label/>'); 
    const formLabels = ['name', 'age', 'gender', 'email']
    
    $.each(formLabels, (idx, formLabel) => {
        formLabel = label.textContent = formLabels[idx]
        form.append(label, formLabel, '<input>', '<br>')
    })
    $('.form').append(form)
}

let data = [
    ['col_1', 'col_2', 'col_3'], 
    ['data', 'data', 'data'], 
    ['data', 'data', 'data'], 
    ['data', 'data', 'data']
]

let construct_table = data => {
    data = data || null
    if (data === null ) console.log('no data');
    let table = $('<table/>');
    $.each(data, (rowIndex, r) => {
        let row = $('<tr/>');
        $.each(r, (colIndex, c) => { 
            row.append($('<t'+(rowIndex == 0 ?  'h' : 'd')+'/>').text(c));
        });
        table.append(row);
    });
    $('.table').append(table)
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
    dataTable = construct_table(); 
    formCol = form(); 
}); 
    