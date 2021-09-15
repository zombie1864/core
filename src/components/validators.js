const emailUrls = ['.com', '.co', '.io', '.net', '.edu']
const errorTypes = ['nameError', 'ageError', 'emailError']; 


export const nameValidation = (nameValue) => { // only handles returning a boolean 
    let result = true; 
    return _nameValidationCSSErr(nameValue, result)
} // end of func


const _nameValidationCSSErr = (nameValue, result) => { // handles the UI CSS layer 
    if ( $('#nameError').length > 0 && nameValue === '') { // ensures name validation regardless of how many attempts to submit 
        return result = false ;
    } else if ( nameValue === '' ) {
        $('.Name').append(`<p id="${errorTypes[0]}">Please input a name</p>`)
        _errorMsgCss(errorTypes[0], 'formLabelName') 
        return result = false; // used for boolean value for validation before post API req 
    }
    $.each(emailUrls, (_, emailUrl) => {
        let emailUrlIdx = nameValue.indexOf(emailUrl)
        if (nameValue.includes(emailUrl) && $('#nameError').length > 0) {
            return result = false 
        } else if (emailUrlIdx !== -1) {
            $('.Name').append('<p id="nameError">Please input a name</p>')
            _errorMsgCss(errorTypes[0], 'formLabelName')
            return result = false // if emailUrl found this breaks the loop and returns false
        } else if ( emailUrlIdx === -1 && nameValue.length > 1 ) {
            $('.formLabelName').css('background-color', '');
            $('#nameError').remove();
        }
    })
    return result
}

export const ageValidation = (ageValue) => { 
    let result = true; 
    let onlyNumbers = /^[0-9]+$/ 
    if ( $('#ageError').length > 0 && !onlyNumbers.test( ageValue )) { // ensures age validation regardless of how many attempts to submit
        result = false 
    } else if (!onlyNumbers.test( ageValue )) { // validation for age 
        $('.Age').append(`<p id="${errorTypes[1]}">Please input only numbers for your age`)
        _errorMsgCss(errorTypes[1], 'formLabelAge')
        result = false; // used for boolean value for validation before post API req 
    }
    if ( ageValue > 0 ) {
        $('.formLabelAge').css('background-color', '');
        $('#ageError').remove();
    }
    return result 
} // end of func

export const emailValidation = (emailValue) => {
    let result = true; 
    if ( $('#emailError').length > 0 ) { // SEE IF YOU CAN MAKE THIS MAKE MORE SENSE 
        $('.formLabelEmail').css('background-color', '');
        $('#emailError').remove();
    } 
    if ( _invalidEmailAddress(emailValue) ) {
        $('.Email').append(`<p id="${errorTypes[2]}">Please input a valid email address</p>`)
        _errorMsgCss(errorTypes[2], 'formLabelEmail')
        result = false; // used for boolean value for validation before post API req 
    } 
    return result
} // end of func

const _invalidEmailAddress = (emailValue) => {
    let missingEmailRequirements = 0; 

    if ( emailValue.indexOf('@') === -1  || emailValue.indexOf('@') === 0) missingEmailRequirements++; 

    $.each(emailUrls, (idx, emailUrl) => {
        if ( emailValue.includes(`@${emailUrl}`) ) missingEmailRequirements++; 
        if (
            emailValue.includes(`${emailUrl}${emailUrl}`) ||
            emailValue.includes(`${emailUrl}.com`) || 
            emailValue.includes(`${emailUrl}.co`) || 
            emailValue.includes(`${emailUrl}.io`) || 
            emailValue.includes(`${emailUrl}.net`) || 
            emailValue.includes(`${emailUrl}.edu`)
        ) missingEmailRequirements++; 
        if ( ( emailValue.includes(emailUrl) ) ) {
            return false // this breaks the loop 
        } else if ( idx === emailUrls.length - 1 ) {
            missingEmailRequirements++;
        }
    })
    
    return (missingEmailRequirements > 0 ) ? true : false
} // end of func

const _errorMsgCss = ( errorId, formLabelClass) => {
    $(`#${errorId}`).css(
        {
            'text-decoration': 'underline', 
            'font-style': 'italic',
            'color': 'red', 
            'position': 'relative', 
            'left': '10vw', 
        })
    $(`.${formLabelClass}`).css(
        {
            'background-color': 'red', 
            'border-radius': '10px',
        }
    );
}

export const formValidated = (textFieldDataObj) => {
    return (nameValidation(textFieldDataObj.Name) && ageValidation(textFieldDataObj.Age) && emailValidation(textFieldDataObj.Email) ) ? true : false;
} // end of func 
