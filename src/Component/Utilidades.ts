class Utilidades {
  static dobro(args: string): string {
    const argumentos = args.split(",").map((v) => parseInt(v));
    return (2 * argumentos[0]).toString();
  }

  static selos(input: string): string {
    let resposta = "";
    const euros: number = parseInt(input);
    let s3: number = 0;
    let s5: number = 0;
    let quoc: number;
    let r: number;
    if (euros >= 8) {
      quoc = Math.floor(euros / 8);
      r = euros % 8;
      switch (r) {
        case 0:
          s3 = quoc;
          s5 = quoc;
          break;
        case 1:
          s3 = quoc + 2;
          s5 = quoc - 1;
          break;
        case 2:
          s3 = quoc - 1;
          s5 = quoc + 1;
          break;
        case 3:
          s3 = quoc + 1;
          s5 = quoc;
          break;
        case 4:
          s3 = quoc + 3;
          s5 = quoc - 1;
          break;
        case 5:
          s3 = quoc;
          s5 = quoc + 1;
          break;
        case 6:
          s3 = quoc + 2;
          s5 = quoc;
          break;
        case 7:
          s3 = quoc - 1;
          s5 = quoc + 2;
          break;
      }
    } else {
      if (euros == 3) s3 = 1;
      else if (euros == 2) s3 = 2;
      else if (euros == 5) s5 = 1;
      else resposta = " Devolução da Quantia";
    }
    return `Selos de três:${s3}  selos de cinco:${s5} ${resposta} `;
  }

  static erro(input: string): string {
    return input;
  }

  static inverterAlgarismos(input: string): string {
    let num: number = parseInt(input);

    if (num <= 0) {
      return "ERRO";
    }

    let rslt: number = 0;

    do {
      const r: number = num % 10;
      num = Math.floor(num / 10);
      rslt = rslt * 10 + r;
    } while (num > 0);

    return rslt.toString();
  }

  static primos(input: string): string {
    const num = parseInt(input);
    if (isNaN(num) || num < 2) return `${num} não é primo`;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return `${num} não é primo`;
    }
    return `${num} é primo`;
  }
}

export default Utilidades;
