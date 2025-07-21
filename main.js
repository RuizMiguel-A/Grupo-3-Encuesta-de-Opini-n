document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-opinion');
  const tabla = document.querySelector('#tabla-opiniones tbody');

  // Cargar opiniones almacenadas al iniciar
  mostrarOpiniones();

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const satisfaccion = form.satisfaccion.value;
    const recomendaria = form.recomendaria.value;
    const comentario = form.comentario.value;
    const fecha = new Date().toISOString().split('T')[0];

    const nuevaOpinion = {
      id: Date.now(),
      fecha,
      satisfaccion,
      recomendaria,
      comentario
    };

    guardarOpinion(nuevaOpinion);
    form.reset();
    mostrarOpiniones();
  });

  function guardarOpinion(opinion) {
    let opiniones = JSON.parse(localStorage.getItem('opiniones')) || [];
    opiniones.push(opinion);
    localStorage.setItem('opiniones', JSON.stringify(opiniones));
  }

  function mostrarOpiniones() {
    const opiniones = JSON.parse(localStorage.getItem('opiniones')) || [];
    tabla.innerHTML = "";

    opiniones.forEach((op, index) => {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${index + 1}</td>
        <td>${op.fecha}</td>
        <td>${op.satisfaccion}</td>
        <td>${op.recomendaria}</td>
        <td>${op.comentario || "—"}</td>
      `;
      tabla.appendChild(fila);
    });
  }
});
