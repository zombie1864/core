export const pageLayout = () => {
    $('.id').append('<table id="layoutTable"/>')
    const th1 = $('<th class="form">');// creates th tag 
    const th2 = $('<th class="table">');// creates th tag
    $('#layoutTable').append(th1,th2)
    _pageLayoutCss(); 
} // end of func 

const _pageLayoutCss = () => {
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
} // end of func