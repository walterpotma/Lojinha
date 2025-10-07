document.addEventListener("DOMContentLoaded", () => {
  const btnOutros = document.getElementById("btn-outros");
  const maisCategorias = document.getElementById("mais-categorias");

  btnOutros.addEventListener("click", () => {
    maisCategorias.classList.toggle("mostrar");

    if (maisCategorias.classList.contains("mostrar")) {
      btnOutros.querySelector("h3").textContent = "Mostrar menos";
    } else {
      btnOutros.querySelector("h3").textContent = "Outros";
    }
  });
});

