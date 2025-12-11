const formEl = document.getElementById('form');
const fnameEl = document.getElementById('fname');
const emailEl = document.getElementById('email');
const passwordEl = document.getElementById('password');
const errorMsgEl = document.getElementById('errorMsg');
let errors=[];

formEl.addEventListener('submit',(e)=>{
    errors=[];
    if(fnameEl=== null){
        //signin
        signInFormValidation(emailEl.value,passwordEl.value);
    }
    else{
        //signup
        signUpFormValidation(fnameEl.value,emailEl.value,passwordEl.value);
    }
    if(errors.length>0){
        e.preventDefault();
        errorMsgEl.innerHTML=errors.join('<br>');
    }

    let fname=fnameEl.value;
    let email=emailEl.value;
    let password=passwordEl.value;
})
const inputEls = [fnameEl, emailEl, passwordEl].filter((el) => el !== null);
inputEls.forEach((el)=>{
    el.addEventListener('input',()=>{
        if(el.parentElement.classList.contains('incorrect')){
            el.parentElement.classList.remove('incorrect');
        }
    })
})

const regex =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ ;
function signUpFormValidation(name,email,password){
    if(name===''){
        errors.push('Please enter a name.');
        fnameEl.parentElement.classList.add('incorrect');
    }
    if(email===''){
        errors.push('Please enter a email.');
        emailEl.parentElement.classList.add('incorrect');
    }
    else if(!regex.test(email)){
        errors.push('Please enter a valid email.');
        emailEl.parentElement.classList.add('incorrect');
    }
    if(password.length===0){
        errors.push('Please enter password');
        passwordEl.parentElement.classList.add('incorrect');
    }
    else if(password.length<8){
        errors.push('Password should be less than 8 characters.');
        passwordEl.parentElement.classList.add('incorrect');
    }
}
function signInFormValidation(email,password){
    if(email===''){
        errors.push('Please enter a email.');
        emailEl.parentElement.classList.add('incorrect');
    }
    else if(!regex.test(email)){
        errors.push('Please enter a valid email.');
        emailEl.parentElement.classList.add('incorrect');
    }
    if(password.length===0){
        errors.push('Please enter password');
        passwordEl.parentElement.classList.add('incorrect');
    }
    else if(password.length<8){
        errors.push('Password should be less than 8 characters.');
        passwordEl.parentElement.classList.add('incorrect');
    }
}