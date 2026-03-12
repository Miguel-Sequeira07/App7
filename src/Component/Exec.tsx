import { useState, type ChangeEvent } from "react";
import type { ExercicioTipo } from "./Exercicios";

const Exec = (props: ExercicioTipo) => {
  const [args, setArgs] = useState<string>("");
  const [rslt, setRslt] = useState<string>("");

  // CÁLCULO DIRETO: Não precisa de state nem de useEffect para isso.
  // Se o título mudar, o React re-calcula isso instantaneamente.
  const bloqueado = props.titulo === 'Opção não contemplada';

  const executa = (s: string) => {
    setRslt(props.metodo(s));
  };

  const handleArgs = (evt: ChangeEvent<HTMLInputElement>) => {
    setArgs(evt.target.value);
  };

  return (
    <div className="cx2">
      <h1>{props.titulo}</h1>
      <br />
      <div className="form-group">
        <label>Input:&nbsp;</label>

        <input
          readOnly={bloqueado}
          type="text"
          style={!bloqueado ? {
            textAlign: "center",
            border: "solid green 2px",
            borderRadius: "5px", // Removido o ';' que estava dentro da string do style
          } : { backgroundColor: "black", color: "white" }} // Adicionei color white para o texto não sumir no fundo preto
          value={args}
          onChange={handleArgs}
        />
      </div>
      <hr />
      <div className="form-group">
        {!bloqueado && (
          <button className="btn btn-success" onClick={() => executa(args)}>
            Executa
          </button>
        )}
      </div>

      <div id="tv">{rslt}</div>
    </div>
  );
};

export default Exec;