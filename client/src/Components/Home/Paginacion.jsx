import React, { useState } from "react";
import "./Paginacion.css";
function Paginacion({ pagina, setPagina, maximo, paginado }) {
  const [input, setInput] = useState(1);

  const pages = [];
  for (let i = 1; i <= Math.ceil(maximo); i++) {
    pages.push(i);
  }

  const previousPage = () => {
    setInput(input - 1);
    setPagina(pagina - 1);
  };
  const nextPage = () => {
    setInput(input + 1);
    setPagina(pagina + 1);
  };
  return (
    <div className="Paginacion">
      <button className="buttonInicio2"disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
      <span class="SpanDelBoton2">Previus</span>
      </button>
      <ul className="lista">
        {pages &&
          pages.map((number) => (
            <li key={number}>
              <span onClick={() => paginado(number)}>{number}</span>
            </li>
          ))}
      </ul>
      <button className="buttonInicio2"
        disabled={pagina === maximo || pagina > maximo}
        onClick={nextPage}
      >
        <span class="SpanDelBoton2">Next</span>
      </button>
    </div>
  );
}

export default Paginacion;
