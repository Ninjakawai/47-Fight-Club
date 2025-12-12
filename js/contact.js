const form = document.querySelector("form");
const submitBtn = document.querySelector("main .link-btn_red");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = "Envoi... <i class='fa-solid fa-spinner fa-spin'></i>";
  submitBtn.disabled = true;

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (response.ok) {
      Swal.fire({
        title: "Succès !",
        text: "Votre message a été envoyé avec succès.",
        icon: "success",
      });
      form.reset();
    } else {
      Swal.fire({
        title: "Erreur !",
        text: "Erreur : " + data.message,
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
