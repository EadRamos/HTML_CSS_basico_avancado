
const body = document.getElementsByTagName('body')[0];
const labelBtnDark = document.getElementById("active_dark");
const btnDark = document.getElementsByClassName('btn-dark')[0];
const header = document.getElementsByTagName('header')[0];
const btnContrai = document.getElementsByClassName('btn-contrai')[0];
const titleMenu = document.getElementById('titleMenu');

document.addEventListener('DOMContentLoaded', () => {
    const dark = localStorage.getItem('dark');
    const menu = localStorage.getItem('menu');
    if(dark){
        if(body.classList[0] != dark){
            body.classList.add(dark);
            btnDark.classList.add(dark);
        }
    }
    if(menu){
        if(header.classList[0] != menu){
            header.classList.add(menu);
            titleMenu.innerText = 'T';
        }
    }
})

labelBtnDark.addEventListener('click', () => {
    btnDark.classList.toggle('dark');
    btnDark.classList.toggle('white');
    body.classList.toggle('dark');
    if(body.classList[0]){
        localStorage.setItem('dark','dark');
    }else{
        localStorage.removeItem('dark')
    }
})

btnContrai.addEventListener('click', () => {
    if(header.classList[0]){
        btnContrai.classList.toggle('voltar');
    }else{
        btnContrai.classList.remove('voltar');
    }
    header.classList.toggle('contrai');
    
    titleMenu.innerText = titleMenu.innerText == 'T' ? 'TITULO' : 'T';
    
    if(body.classList[0]){
        localStorage.setItem('menu','contrai');
    }else{
        localStorage.removeItem('menu')
    } 
})