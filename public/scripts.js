let $ = document.querySelector.bind(document);


let btnQueroAjudar = $('header button');
    btnQueroAjudar.addEventListener(
        'click',()=>{
            $('.form')
            .classList.toggle('hide')
        });