let head_html = `<nav><div class="container-logo"><img src="./img/logo.png" alt="Logo 47 Fight Club." />
<a href="#" class="nav-title_links">47 Fight Club</a></div><ul><li><a href="#">Accueil</a></li>
<li><a href="#">Histoire</a></li><li><a href="#">Contact</a></li><li>
<a href="#" class="link-btn_red">Nous rejoindre</a></li></ul></nav>`;

let foot_html = `<nav><div class="container-logo"><img src="./img/logo.png" alt="Logo 47 Fight Club." />
<a href="#">47 Fight Club</a></div><ul><li><a href="#">Histoire</a></li><li><a href="#">Nous rejoindre</a></li>
<li><a href="#">Hall of fame</a></li><li><a href="#">Evènements</a></li><li><a href="#">Contact</a></li><li>
<a href="#">Don</a></li></ul></nav><div class="line"></div><div class="container-footer">
<p>47 Fight Club@ 2025. All rights reserved.</p><div class="container-footer_links"><a href="#main" class="arrow-up">
<i class="fa-solid fa-arrow-up"></i></a><i class="fa-brands fa-youtube"></i><i class="fa-brands fa-linkedin-in"></i>
<i class="fa-brands fa-x-twitter"></i><i class="fa-brands fa-instagram"></i><i class="fa-brands fa-facebook-f"></i></div>`

function insert(id, file) {
    let element = document.querySelector(id);
    element.innerHTML = file;
};

insert("header", head_html);
insert("footer", foot_html);