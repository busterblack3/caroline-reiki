// Caroline Black Reiki — small progressive enhancements.
// The site works without JavaScript; this adds the mobile menu toggle
// and a nicer (no page reload) contact-form submission.

document.documentElement.classList.add("js");

// ---- Mobile navigation ----------------------------------------------------
(function () {
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (!toggle || !nav) return;
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.textContent = open ? "Close" : "Menu";
  });
})();

// ---- Contact form ---------------------------------------------------------
// The form posts to Formspree. The form's `action` attribute in contact.html
// holds the endpoint; until Buster replaces the placeholder ID, the form runs
// in "demo" mode and nothing is sent anywhere.
(function () {
  var form = document.getElementById("contact-form");
  if (!form) return;
  var status = document.getElementById("form-status");
  var button = form.querySelector('button[type="submit"]');

  function show(kind, html) {
    status.className = "form-status is-visible " + kind;
    status.innerHTML = html;
    status.focus();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    if (form.action.indexOf("PLACEHOLDER") !== -1) {
      show("demo",
        "<strong>Prototype:</strong> this form isn’t connected yet, so nothing was sent. " +
        "[[PLACEHOLDER: Formspree form ID — see README]]");
      return;
    }

    button.disabled = true;
    button.textContent = "Sending…";

    fetch(form.action, {
      method: "POST",
      body: new FormData(form),
      headers: { Accept: "application/json" }
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Bad response");
        form.reset();
        show("ok",
          "<strong>Thank you, your note is on its way.</strong> " +
          "Caroline will reply by email or phone to find a time that works.");
      })
      .catch(function () {
        show("err",
          "<strong>Sorry, something went wrong and your message didn’t send.</strong> " +
          "Please try again in a moment.");
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = "Send request";
      });
  });
})();
