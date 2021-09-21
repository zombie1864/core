export const formCss = formLabels => { 
    $('.formTxt').css(
        {
            'position': 'relative',
        }
    )
    $('.fieldCol, .textCol').css( // selects both col and stylize 
        {
            'text-decoration': 'underline', 
            'font-style': 'italic',
            'color': 'green',
            'padding': '5px 10px',
            'width': "200vw"
        }
    );
    $.each(formLabels, (_, formLabel) => {
        $(`#${formLabel}, #GenderOptions, .formLabel${formLabel}`).css(
            {
                'position': 'relative',    
            }
        )
    })
    $('table th.form').css('border-spacing', '25px')
} 


export const btnsCss = btnLabels => { 
    $.each(btnLabels, ( _, btnLabel) => {
        $(`#${btnLabel}`).css(
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
                'bottom': '-20vh',
            }
        )
    })
} 


export const pageLayoutCss = () => { 
    $('body').css(
        {
            'background': 'linear-gradient(#d7fadc, #85d490)',
            'height': '100%',
            'margin': '0',
            'background-repeat': 'no-repeat',
            'background-attachment': 'fixed'
        }
    )
    
    $('#layoutTable').css(
        {
            'padding': '10px', 
        }
    )

    $('#layoutTable th.form').css(
        {
            'width': '100vw', 
            'max-width': '550px',
        }
    )
} 


export const tableCss = () => {
    $('#layoutTable th.table').css(
        {
        'max-width': '400px',
        'border-style': 'solid', 
        'position': 'relative', 
        }
    )
}

export const stylizeCols = () => {
    $('.colName').css( // stylized col
        {
            'text-decoration': 'underline', 
            'font-style': 'italic',
        }
    );
}