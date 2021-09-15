export const pageLayout = () => { 
    /**
    @description: This func hooks to the HTML div tag containing the class `.id` using jquery selector $(''), which selects tags based on there class or id attr, i.e. $('.className') or $('#id'). This func appends to the div tag a table tag with a unique id attr. This design ensures ease of expansion - by adding `th` tags to insert components.
    **/
    $('.id').append('<table id="layoutTable"/>')
    const th1 = $('<th class="form">');// This is a `th` tag - comps are appended to table 
    const th2 = $('<th class="table">');
    $('#layoutTable').append(th1,th2)
    _pageLayoutCss(); 
} 

const _pageLayoutCss = () => { // RFE - All css should live in there own module 
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