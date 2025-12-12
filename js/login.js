const form = document.querySelector("form");
const submitBtn = document.querySelector("main .link-btn_red");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = "Envoi... <i class='fa-solid fa-spinner fa-spin'></i>";
  submitBtn.disabled = true;

  try {
    const response = await fetch("/admin-login", {
      method: "POST",
      body: JSON.stringify({
        username: formData.get("username"),
        password: formData.get("password"),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: data.message,
        text: "Vous avez été connecter en tant qu'administrateur avec succès.",
        icon: "success",
      }).then(() => {
        setTimeout(() => {
          window.location.href = "/admin";
        }, 500);
      });
      form.reset();
    } else {
      Swal.fire({
        title: data.message,
        text: "Erreur : Utilisateur ou/et mot de passe incorrect.",
        icon: "error",
      });
    }
  } catch (error) {
    Swal.fire({
      title: "Erreur !",
      text: "Une erreur s'est produite. Réessayez.",
      icon: "error",
    });
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});
