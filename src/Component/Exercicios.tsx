import { useParams } from "react-router-dom";
import Utilidades from "./Utilidades";
import Exec from "./Exec";
export interface ExercicioTipo {
  titulo: string | null;
   metodo: (str: string) => string;
}
const Exercicios = () => {
   const escolhido = {} as ExercicioTipo;
  const { id } = useParams();
  switch (id) {
    case "1":
      escolhido.titulo = "Dobro de um número";
      escolhido.metodo = Utilidades.dobro;
      break;

    case "2":
      escolhido.titulo = "Máquina de Selos";
      escolhido.metodo = Utilidades.selos;
      break;

    /*case "3":
      escolhido.titulo = "Números Primos";
      escolhido.metodo = Utilidades.primos;
      break;*/

    case "4":
      escolhido.titulo = "Inversão de Algarismos";
      escolhido.metodo = Utilidades.inverterAlgarismos;
      break;

    default:
      escolhido.titulo = "Opção não contemplada";
      escolhido.metodo = Utilidades.erro;
      break;
    


  }
  return <Exec titulo={escolhido.titulo} metodo={escolhido.metodo} />;
};

export default Exercicios;
