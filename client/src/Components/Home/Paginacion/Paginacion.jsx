import React from "react";
import "./Paginacion.css";
function Paginacion({ pagina, setPagina, maximo }) {

  const pages = [];
  for (let i = 1; i <= Math.ceil(maximo); i++) {
    pages.push(i);
  }

  const previousPage = () => {
    setPagina(pagina - 1);
  };
  const nextPage = () => {
    setPagina(pagina + 1);
  };
  return (
    <div className="Paginacion">
      <button className="buttonInicio2"disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
      <span className="SpanDelBoton2">Previus</span>
      </button>
      <ul className="lista">
        {pages &&
          pages.map((number) => (
            <li key={number}>
              <span className="spanPaginacion" onClick={() => setPagina(number)}>{number}</span>
            </li>
          ))}
      </ul>
      <button className="buttonInicio2"
        disabled={pagina === maximo || pagina > maximo}
        onClick={nextPage}
      >
        <span className="SpanDelBoton2">Next</span>
      </button>
    </div>
  );
}

export default Paginacion;
