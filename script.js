(function () {
  var header = document.querySelector("[data-header]");
  var toggle = document.querySelector("[data-menu-toggle]");
  var nav = document.querySelector("[data-nav]");
  var quote = document.querySelector("[data-quote]");
  var news = document.querySelector("[data-news]");
  var gallery = document.querySelector("[data-gallery]");
  var lightbox = document.querySelector("[data-lightbox]");
  var lightboxImg = document.querySelector("[data-lightbox-img]");
  var lightboxCap = document.querySelector("[data-lightbox-cap]");

  if (header) {
    function onScroll() {
      header.classList.toggle("is-stuck", window.scrollY > 12);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.querySelector(".sr-only").textContent = open ? "Fechar menu" : "Abrir menu";
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.querySelector(".sr-only").textContent = "Abrir menu";
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && nav.classList.contains("is-open")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  if (gallery) document.querySelectorAll("[data-filter]").forEach(function (button) {
    button.addEventListener("click", function () {
      var filter = button.getAttribute("data-filter");
      document.querySelectorAll("[data-filter]").forEach(function (item) {
        var active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", active ? "true" : "false");
      });
      gallery.querySelectorAll(".shot").forEach(function (shot) {
        var show = filter === "todos" || shot.getAttribute("data-cat") === filter;
        shot.classList.toggle("is-hidden", !show);
      });
    });
  });

  if (gallery && lightbox && lightboxImg) {
    gallery.addEventListener("click", function (event) {
      var shot = event.target.closest(".shot");
      if (!shot) return;
      var img = shot.querySelector("img");
      var fallback = shot.getAttribute("data-fallback");
      lightboxImg.alt = img.alt;
      lightboxCap.textContent = img.alt + " · fotografia ilustrativa";
      lightboxImg.onload = function () {
        lightboxImg.onerror = null;
      };
      lightboxImg.onerror = function () {
        lightboxImg.onerror = null;
        if (fallback) lightboxImg.src = fallback;
      };
      lightboxImg.hidden = false;
      lightboxImg.src = shot.getAttribute("data-full");
      lightbox.showModal();
    });

    lightbox.addEventListener("close", function () {
      lightboxImg.hidden = true;
      lightboxImg.removeAttribute("src");
    });
  }

  if (quote) quote.addEventListener("submit", function (event) {
    event.preventDefault();
    var data = new FormData(quote);
    var lines = [
      "Olá SJGOMES, o meu nome é " + data.get("nome") + ".",
      "Gostaria de pedir um orçamento.",
      "Tipo de evento: " + data.get("tipo")
    ];
    if (data.get("data")) lines.push("Data: " + data.get("data"));
    if (data.get("mensagem")) lines.push("Mensagem: " + data.get("mensagem"));
    var url = "https://wa.me/message/5VB7SV74VVEKE1?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });

  if (news) news.addEventListener("submit", function (event) {
    event.preventDefault();
    var email = new FormData(news).get("email");
    var subject = encodeURIComponent("Novidades SJGOMES");
    var body = encodeURIComponent(
      "Quero receber novidades e ofertas da SJGOMES.\nO meu email é " + email + "."
    );
    window.location.href = "mailto:sjgomesarouca@gmail.com?subject=" + subject + "&body=" + body;
  });
})();
