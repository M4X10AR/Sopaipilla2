const amiiboSection = document.querySelector("#amiiboSection");
const btnCompleta = document.querySelector("#Completa")
const btnFiltro1 = document.querySelector("#Filtro1");
const btnFiltro2 = document.querySelector("#Filtro2")

async function GetAmiibo(url) {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
    return data.amiibo;

}

async function renderAmiibo(ListaMostrada) {
    if (!ListaMostrada || ListaMostrada.length === 0) {
        amiiboSection.innerHTML = "<p>No se encontraron Amiibos para esta categoría.</p>";
        return;
    }
    let template = "";
    ListaMostrada.forEach((item) => {
        template += `
            <div class="amiibo">
                <h2>${item.name}</h2>
                <p>
                    Personaje: ${item.character}
                </p>
                <p>
                    Serie: ${item.amiiboSeries}
                </p>
                <p>
                    Tipo: ${item.type}
                </p>
                <img 
                    class="Imagenamiibo"
                    src="${item.image}" 
                    alt="${item.name}"
                >
            </div>
        `;
    });
    amiiboSection.innerHTML = template;
}

async function ListaCompleta() {
    amiiboSection.innerHTML = "<p>Cargando lista completa...</p>";
    const urlCompleta = "https://amiiboapi.org/api/amiibo"
    const datos = await GetAmiibo(urlCompleta);
    renderAmiibo(datos);
}

async function ListaFiltrada1() {
    amiiboSection.innerHTML = "<p>Cargando lista completa...</p>";
    const sagaSeleccionada = btnFiltro1.value;
    if (sagaSeleccionada === "") return;
    amiiboSection.innerHTML = `<p>Cargando lista de ${sagaSeleccionada}...</p>`;
    const urlFiltrada1 = `https://amiiboapi.org/api/amiibo/?gameseries=${sagaSeleccionada}`;
    const datos = await GetAmiibo(urlFiltrada1);
    renderAmiibo(datos);
}

async function ListaFiltrada2() {
    amiiboSection.innerHTML = "<p>Cargando lista completa...</p>";
    const PersonajeSeleccionado = btnFiltro2.value;
    if (PersonajeSeleccionado === "") return;
    amiiboSection.innerHTML = `<p>Cargando lista de ${PersonajeSeleccionado}...</p>`;
    const urlFiltrada2 = `https://amiiboapi.org/api/amiibo/?character=${PersonajeSeleccionado}`;
    const datos = await GetAmiibo(urlFiltrada2);
    renderAmiibo(datos);
}

btnCompleta.addEventListener("click", ListaCompleta)
btnFiltro1.addEventListener("change", ListaFiltrada1)
btnFiltro2.addEventListener("change", ListaFiltrada2) 