/* function ciao() {
    return 'Ciao';
  }
  
  function oi(prim, ult) {
    return `Oi ${prim} ${ult}`;
  }
  
  function hi(name) {
    return 'Hi ' + name;
  } */
  
  /* function fatorial(n) {
    let resultado = 1;
    while (n > 1) {
      resultado *= n;
      n--;
    }
    return resultado;  
  } */
  
  let ciao = () => 'Ciao';
  
  
  
  let oi = (prim, ult) => `Oi ${prim} ${ult}`;
  
  
  
  let hi = name => 'Hi ' + name;
  
  
  
  let fatorial = n => {
    let resultado = 1;
    while (n > 1) {
      resultado *= n;
      n--;
    }
    return resultado;  
  }
  console.log(fatorial(5));