const testCases = {
    'input': [ // test cases 
        {  
            "Name" : 'Karl@yay.io', //---nameValidation failed---
            "Age" : 'Karl', // ---ageValidation failed---
            "Email" : 'Pie', // ---emailValidation failed---
            "Feedback" : 'Yay!', 
            "Gender" : '1'
        }, // false 
        {
            "Name" : 'Jimmy', 
            "Age" : '12', 
            "Email" : 'Neutron@nick.com', 
            "Feedback" : 'Gotta blast!', 
            "Gender" : '1'
        }, // true 
        {
            "Name" : 'Sheen', 
            "Age" : '12', 
            "Email" : 'Sheen100gmail.com', // ---emailValidation failed---
            "Feedback" : 'Ultra lord!', 
            "Gender" : '1'
        }, // false 
        {
            "Name" : '.comkarl', //---nameValidation failed---
            "Age" : '12', 
            "Email" : '@karl.io', // ---emailValidation failed---
            "Feedback" : 'lama', 
            "Gender" : '1'
        }, // false 
        {
            "Name" : 'spongbob', 
            "Age" : '22', 
            "Email" : 'wer23@.com', // ---emailValidation failed--- 
            "Feedback" : 'FUN!', 
            "Gender" : '1'
        }, // false 
        {
            'Name': 'Patrick24', // true 
            'Age': '22', 
            'Email': 'pat@underRock.edu', 
            'Feedback': 'My mind is an egima!', 
            'Gender': '2'
        },
        {
            "Name" : 'karl.com', //---nameValidation failed---
            "Age" : '12karl', // ---ageValidation failed---
            "Email" : 'karl@nick.com', 
            "Feedback" : 'lamas Jimmy!', 
            "Gender" : '1'
        }, // false 
    ],
    'output': [ false, true, false, false, false, true, false ] // predicted outcomes  
}

const _test_ENV = method => { // test ENV free from UI layer
    const arrOfInputs = testCases.input, // graps the input [{}, {}, {}]
          arrOfOutputs = testCases.output // graps the output [ boolean ]
    $.each(arrOfInputs, (idx, inputObj) => { // iterates thr arrOfInputs 
        
        try { // test the validation but not aux func 
            if (method(inputObj) !== true ) throw `${method} returns false`
        } catch (err) {
            console.log(inputObj, `predicted outcomes are: [ ${arrOfOutputs} ]\
            at index, idx = ${idx} the method\ 
            ${err}`);
        } finally {
            clearErrCssMsg() // clears err msg for nxt session 
        }
        // passes the inputObj for a second time for the aux func 
        try { // aux func are tested, if err - gives helpful msg of failure 
            if (nameValidation(inputObj.Name) !== true ) throw '---nameValidation failed---'
        } catch (err) {
            console.log(err);
        } finally {
            clearErrCssMsg() // clears err msg for nxt session 
        }
        try { // aux func are tested, if err - gives helpful msg of failure 
            if (emailValidation(inputObj.Email) !== true ) throw '---emailValidation failed---'
        } catch (err) {
            console.log(err);
        } finally {
            clearErrCssMsg() // clears err msg for nxt session 
        }
        try { // aux func are tested, if err - gives helpful msg of failure 
            if (ageValidation(inputObj.Age) !== true ) throw '---ageValidation failed---'
        } catch (err) {
            console.log(err);
        } finally {
            clearErrCssMsg() // clears err msg for nxt session 
        }
    })

    $.each( formLabels, (idx, formlabel) => {
        $(`#${formlabel}`).val('') // clears the input fields 
    })
}