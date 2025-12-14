const eventDisplay = async () => {
  const url = "../events.json";
  const response = await fetch(url);
  const data = await response.json();

  const table = document.querySelector("table tbody");
  const section = document.querySelector("section");

  if (data.length === 0) {
    let content = "<p>Aucun événement</p>";
    section.insertAdjacentHTML("beforeend", "<p>Aucun événement</p>");
  } else {
    for (let i = 0; i < data.length; i++) {
      let content = `
        <tr>
            <td>${data[i].titre}</td>
            <td>${data[i].content}</td>
            <td>${data[i].select === 0 ? "Fabrice" : "Marion"}</td>
            <td>${data[i].horaire}</td>
            <td>${data[i].date}</td>
            <td><button class="link-btn_red btn-delete" data-id="${i}">Supprimer</button></td>
        </tr>
        `;

      table.insertAdjacentHTML("beforeend", content);
    }

    deleteFunction();
  }
};

eventDisplay();

const deleteFunction = async () => {
  const btnDelete = document.querySelectorAll(".btn-delete");
  btnDelete.forEach((b) => {
    b.addEventListener("click", async () => {
      const id = b.getAttribute("data-id");
      const response = await fetch(`/events-delete/${id}`, {
        method: "DELETE",
      });
      const text = await response.text();
      if (response.ok) {
        Swal.fire({
          title: "Événement supprimé !",
          text: text,
          icon: "success",
        }).then(() => {
          eventDisplay();
          window.location.reload();
        });
      } else {
        Swal.fire({
          title: "Erreur !",
          text: "Erreur : " + text,
          icon: "error",
        });
      }
    });
  });
};
