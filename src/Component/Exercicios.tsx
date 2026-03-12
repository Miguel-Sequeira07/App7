import { useMemo } from "react";
import { useParams } from "react-router-dom";
import Utilidades from "./Utilidades";
import Exec from "./Exec";
export interface ExercicioTipo {
  titulo: string | null;
   metodo: (str: string) => string;
}
const Exercicios = () => {
  const { id } = useParams();

  const escolhido = useMemo<ExercicioTipo>(() => {
    switch (id) {
      case "1":
        return { titulo: "Dobro de um número", metodo: Utilidades.dobro };

      case "2":
        return { titulo: "Máquina de Selos", metodo: Utilidades.selos };

      case "3":
        return { titulo: "Números Primos", metodo: Utilidades.primos };

      case "4":
        return { titulo: "Inversão de Algarismos", metodo: Utilidades.inverterAlgarismos };

      default:
        return { titulo: "Opção não contemplada", metodo: Utilidades.erro };
    }
  }, [id]);

  return <Exec titulo={escolhido.titulo} metodo={escolhido.metodo} />;
};

export default Exercicios;
