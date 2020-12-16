$("document").ready(function() {
    $('#newRow').on('click', onClick); 
    function onClick() {
        var addRow = '<tr>'
        addRow += "<td> <input type='text' name='test1'></td>"
        addRow += "<td> <input type='text' name='test2'></td>"
        addRow += "<td> <input type='text' name='test3'></td>"
        addRow += '</tr>';

        $('table tbody').append(addRow)
    }
}); 

