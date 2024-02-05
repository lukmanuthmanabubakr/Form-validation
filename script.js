'use strict';


const form = document.querySelector('#registrationForm');
const formValidation = () => {

    form.setAttribute('novalidate', '');
    form.addEventListener('submit', e => {  
        e.preventDefault();
        const formValid = validateFormDetails(form)
        if(formValid){
           fetch(form.action, {
            method: 'POST',
            body: new FormData(form)
           }).then((res) => res.json())
            .then(() => {
                // const successMsg = document.querySelector('.successMsg')
                // successMsg.style.color = 'green'
                // successMsg.textContent = 'You Have Registered Successfully with Matex  '

                // setTimeout(() => {
                //     successMsg.textContent = ''
                // }, 6000)

                form.reset()
            }).then(() => {
                open('success.html', '__blank')
            })

           
         }
       
        

    })

    const fromElToBlur = Array.from(form.elements)
    console.log(fromElToBlur)


   fromElToBlur.forEach((formEL) => {

        formEL.addEventListener('blur' , (e) => {
            validateSingleDetails(e.srcElement.parentElement.parentElement.parentElement);
        })
   })

}





formValidation()

const validateFormDetails = (formToValidate) => {

     const formDetailsEl = Array.from(formToValidate.querySelectorAll('.formDetails'))
     return  formDetailsEl.every((formDetail) =>  validateSingleDetails(formDetail))
      
    }

const validateOptions = [
     


    {
        attribute: 'minlength',
        isValid: input =>input.value && input.value.length >= input.minLength,
        errorMessage: (input, label) =>  `${label.textContent}  needs to be atleast ${input.minLength}  characters`
    },


    {
        attribute: 'custommaxlength',
        isValid: input =>input.value && input.value.length <= input.getAttribute('custommaxlength'),
        errorMessage: (input, label) =>  `${label.textContent}  needs to be atleast ${input.getAttribute('custommaxlength')}  characters
        or less than ${input.getAttribute('custommaxlength')} characters
        
        `
    },

    {
        attribute:'pattern',
        isValid: input =>{

         const regex =  new RegExp(input.pattern)
         return regex.test(input.value)
        },
        errorMessage:(input, label) =>  `${input.value} is not a valid ${label.textContent}`
    },


    {
        attribute:'match',
        isValid: input => {
         const matchSelector =  input.getAttribute('match');
         const matchedEl= form.querySelector(`#${matchSelector}`)
         return matchedEl && matchedEl.value.trim() === input.value.trim()
        },
        errorMessage:(input, label) =>  {
            const matchSelector =  input.getAttribute('match');
            const matchedEl = form.querySelector(`#${matchSelector}`)
            const matchedElLabel = matchedEl.parentElement.parentElement.querySelector('label')
            return `${label.textContent} must match ${matchedElLabel.textContent}`
          
           },
        
       

    },
   
    {
        attribute: 'required',
        isValid: input =>input.value.trim() !== '',
        errorMessage: (input, label) =>  `${label.textContent} is required, kindly fill this field`
        },

        

    

    

]

const validateSingleDetails = (formDetail) => {
const label = formDetail.querySelector('label');
const input = formDetail.querySelector('input');
const successIcon = formDetail.querySelector('.success-mark');
const errorIcon = formDetail.querySelector('.error-check');
const errorMsg = formDetail.querySelector('.error-message');


let errorDetail = false;

for (const options of validateOptions) {
    if(input.hasAttribute(options.attribute)   && !options.isValid(input)){
          errorMsg .textContent = options.errorMessage(input, label)
          input.classList.remove('greenBorder')
          input.classList.add('redBorder')
          errorIcon.style.display = 'inline'
          successIcon.style.display = 'none'
        errorDetail = true;
    }
    
    if(!errorDetail){
         errorMsg.textContent = '';
         input.classList.add('greenBorder')
         input.classList.remove('redBorder')
         successIcon.style.display = 'inline'
         errorIcon.style.display = 'none'
    }

 
}


return !errorDetail


}



