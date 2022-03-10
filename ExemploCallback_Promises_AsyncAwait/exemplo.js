const fs = require('fs');

const x='Hello world';

 //exemplo de função síncrona
/* console.log(" I ");

console.log(" eat ");

console.log(" Ice Cream\n\n\n ");

//Exemplo de função assíncrona
console.log("I");

// aguarda 2 milisecundos
setTimeout(()=>{
  console.log("eat");
},2000)

console.log("Ice Cream"); */

/* console.log('entrando no callback');
// Exemplo de callback
fs.writeFile('teste.txt', `${x}` , () =>{
	console.log(x);
});
console.log('Após o callback'); */

 /* console.log('Exemplo Promises');

//Exemplo Promises
function espera(tempo) {
    return new Promise(resolver => {
      setTimeout(resolver, tempo*1000)
    })
  }
  espera(10)
  .then(() => console.log('10s depois'));
  await espera (10);

console.log('Tempo de execução da Promises'); */
 
 //Exemplo async e await 
 let hello = async () => { return "Hello" };
 hello().then((value) => console.log(value)); 

  function func1(number){
    return new Promise(resolve =>{
        setTimeout(() => resolve(77 + number) , 1000)
    })
}

function func2(number){
    return new Promise(resolve =>{
        setTimeout(() => resolve(22 + number) , 1000)
    })
}

function func3(number){
    return new Promise(resolve =>{
        setTimeout(() => resolve(14 * number) , 1000)
    })
}

 async function myAsyncFunction(){
    var number = await func1(4);

    console.log('Hello');
    number = await func2(number);

    console.log('World');
    var result = await func3(number);

    console.log(result);
}
myAsyncFunction()