document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form-opinion');
  const lista = document.getElementById('lista-opiniones');
  const URL_API = 'http://localhost:3000/opiniones';

  fetch(URL_API)
    .then(res => res.json())
    .then(data => {
      data.forEach(op => agregarOpinionLista(op));
    });

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const calidad = document.getElementById('calidad').value;
    const atencion = document.getElementById('atencion').value;
    const sugerencias = document.getElementById('sugerencias').value;

    const aspectos = [];
    if (document.getElementById('precio').checked) aspectos.push("precio");
    if (document.getElementById('sabor').checked) aspectos.push("sabor");
    if (document.getElementById('ambiente').checked) aspectos.push("ambiente");

    const nuevaOpinion = {
      fecha: new Date().toLocaleDateString(),
      calidad,
      atencion,
      aspectos,
      sugerencias
    };

    fetch(URL_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(nuevaOpinion)
    })
    .then(res => res.json())
    .then(data => {
      agregarOpinionLista(data);
      form.reset();
    });
  });

  function agregarOpinionLista(op) {
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.innerHTML = `
      <strong>${op.fecha}</strong> - 
      Calidad: ${op.calidad}, 
      Atención: ${op.atencion}, 
      Aspectos: ${op.aspectos.join(', ')}, 
      Sugerencia: ${op.sugerencias}
    `;
    lista.appendChild(item);
  }
});
