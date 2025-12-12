const submitBtn = document.getElementById("submitEventBtn");
const form = document.getElementById("contactForm");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());
  const originalText = submitBtn.innerHTML;

  submitBtn.innerHTML = "Envoi... <i class='fa-solid fa-spinner fa-spin'></i>";
  submitBtn.disabled = true;

  try {
    const response = await fetch("/events-write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      await Swal.fire({
        title: "Événement ajouté !",
        icon: "success",
      });
      form.reset();
    } else {
      await Swal.fire({
        title: "Erreur",
        text: "Impossible d'ajouter l'événement",
        icon: "error",
      });
    }
  } catch (error) {
    await Swal.fire({
      title: "Erreur serveur",
      text: "Réessayez.",
      icon: "error",
    });
  } finally {
    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  }
});
