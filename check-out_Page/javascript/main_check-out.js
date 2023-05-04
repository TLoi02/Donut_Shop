function valForm(id, type){
    const checkContent = document.querySelector(`#${id}`);
    const regexMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const regexPhone = /^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$/

    switch(type){
        case 'input':
            if (checkContent.value === ''){
                checkContent.style.borderColor = 'red'; 
            }
            else{
                checkContent.style.borderColor = 'green';
            }
            break;
        case 'email':
            if (checkContent.value === ''){
                checkContent.style.borderColor = 'red'; 
            }
            else{
                //True Email Type
                if (regexMail.test(checkContent.value)){
                    checkContent.style.borderColor = 'green';
                }
                else{
                    checkContent.style.borderColor = 'red'; 
                }
            }
            break;
        case 'phone':
            if (checkContent.value === ''){
                checkContent.style.borderColor = 'red'; 
            }
            else{
                //True Phone Number Type
                if (regexPhone.test(checkContent.value)){
                    checkContent.style.borderColor = 'green';
                }
                else{
                    checkContent.style.borderColor = 'red'; 
                }
            }
            break;
    }
}

function handelCheckoutButton(){
    //Content Code to validate all form
    

}