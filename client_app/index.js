let form = () => {
    let form = $('<form/>'); 
    let label = $('<label/>'); 
    let formLabels = ['name', 'age', 'gender', 'email']
    
    $.each(formLabels, (idx, formLabel) => {
        formLabel = label.textContent = formLabels[idx]
        form.append(label, formLabel, '<input>', '<br>')
    })
    $(document.body).append(form)
}

let data = [
    ['col_1', 'col_2', 'col_3'], 
    ['data', 'data', 'data'], 
    ['data', 'data', 'data'], 
    ['data', 'data', 'data']
]
let const_construct_table = data => {
    let table = $('<table/>');
    $.each(data, (rowIndex, r) => {
        let row = $('<tr/>');
        $.each(r, (colIndex, c) => { 
            row.append($('<t'+(rowIndex == 0 ?  'h' : 'd')+'/>').text(c));
        });
        table.append(row);
    });
    $(document.body).append(table)
}
$("document").ready(function() {    
    dataTable = const_construct_table(data); 
    formCol = form(); 
}); 
    