export const formCss = formLabels => { 
    $('.formTxt').css(
        {
            'position': 'relative',
            'left': '5vw'
        }
    )
    $('.fieldCol, .textCol').css( // selects both col and stylize 
        {
            'text-decoration': 'underline', 
            'font-style': 'italic',
            'color': 'green',
            'padding': '5px 10px',
            'position': 'relative', 
            'left': '10vw', 
        }
    );
    $.each(formLabels, (_, formLabel) => {
        $(`#${formLabel}, #GenderOptions, .formLabel${formLabel[0].toUpperCase()+ formLabel.slice(1,formLabel.length)}`).css(
            {
                'position': 'relative', 
                'left': '10vw',     
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
                'bottom': '-150px',
                'left': '80px'

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
    $('#layoutTable th.form').css(
        {
            'width': '60%', 
            'height': '600px'
        }
    )

    $('#layoutTable th.table').css(
        {
        'border-style': 'solid', 
        'position': 'relative', 
        'left': '200px'
        }
    )
} 