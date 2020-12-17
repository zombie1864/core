$("document").ready(function() {

    $('.id').append("\
        <table border='2'>\
            <thread>\
                <th>form\
                    <form id='form'>\
                        <label>name</label>\
                        <input id='name' type='text'>\
                        <br>\
                        <br>\
                        <label>age</label>\
                        <input id='age' type='text'>\
                        <br>\
                        <br>\
                        <label>gender</label>\
                        <input id='gender' type='text'>\
                        <br>\
                        <br>\
                        <label>email</label>\
                        <input id='email' type='text'>\
                        <br>\
                        <br>\
                        <label>feedback</label>\
                        <input id='feedback' type='text'>\
                    </form>\
                    <th id='varTable'>table\
                        <table border='1'></table>\
                    </th>\
                </th>\
            </thread>\
            <tbody></tbody>\
        </table>"
    )
    let data = [
        ['col_1', 'col_2', 'col_3'], 
        ['data', 'data', 'data'], 
        ['data', 'data', 'data'], 
        ['data', 'data', 'data']
    ]

    let const_construct_table = data => {
        let table = $("<table/>");
        $.each(data, (rowIndex, r) => {
            let row = $("<tr/>");
            $.each(r, (colIndex, c) => { 
                row.append($("<t"+(rowIndex == 0 ?  "h" : "d")+"/>").text(c));
            });
            table.append(row);
        });
        $('#varTable').append(table)
    }
    dataTable = const_construct_table(data); 
}); 
    