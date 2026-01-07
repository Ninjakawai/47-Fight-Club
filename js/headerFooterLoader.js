let header = `<!--********HEADER********-->
    <header>
      <nav>
        <div class="container-logo">
          <img src="./img/logo.png" alt="Logo 47 Fight club." />
          <a href="/" class="nav-title_links">47 Fight club</a>
        </div>
        <a href="#open">
          <i class="fa-solid fa-bars header-burger_icon"></i>
        </a>
        <ul>
          <li><a href="/">Accueil</a></li>
          <li><a href="/histoire">Histoire</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/nous-rejoindre" class="link-btn_red">Nous rejoindre</a></li>
        </ul>
      </nav>
    </header>`;

let footer = `
<footer>
      <nav>
        <div class="container-logo">
          <img src="./img/logo.png" alt="Logo 47 Fight club." />
          <a href="/">47 Fight club</a>
        </div>
        <ul>
          <li><a href="/histoire">Histoire</a></li>
          <li><a href="/nous-rejoindre">Nous rejoindre</a></li>
          <li><a href="/hall-of-fame">Hall of fame</a></li>
          <li><a href="/calendrier">Evènements</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/don">Don</a></li>
        </ul>
      </nav>
      <div class="line"></div>
      <div class="container-footer">
        <p>47 Fight club@ 2025. All rights reserved.</p>
        <div class="container-footer_links">
          <a href="#main" class="arrow-up">
            <i class="fa-solid fa-arrow-up"></i>
          </a>
            <i class="fa-brands fa-youtube"></i>
            <i class="fa-brands fa-linkedin-in"></i>
            <i class="fa-brands fa-x-twitter"></i>
            <i class="fa-brands fa-instagram"></i>
            <i class="fa-brands fa-facebook-f"></i>
      </div>
    </footer>`;

if (window.location.pathname.startsWith("/admin")) {
  header = header.replaceAll("./img/", "../img/");
  footer = footer.replaceAll("./img/", "../img/");
}

document.body.insertAdjacentHTML("afterbegin", header);
document.body.insertAdjacentHTML("beforeend", footer);
