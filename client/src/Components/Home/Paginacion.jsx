import React, { useState } from "react";

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
      <button disabled={pagina === 1 || pagina < 1} onClick={previousPage}>
        {" "}
        previous{" "}
      </button>
      <ul>
        {pages&& pages.map((number) => (

          <li className="number" key={number}>
            <a onClick={() => paginado(number)}>{number}</a>;
            </li>
        )
        )}
      </ul>
      <button
        disabled={pagina === maximo || pagina > maximo}
        onClick={nextPage}
      >
        {" "}
        next{" "}
      </button>
    </div>
  );
}

export default Paginacion;
