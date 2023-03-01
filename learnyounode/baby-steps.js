let sum = 0;
let array = process.argv;
for (let i = 2; i < array.length; i++) {
    sum += Number(array[i]);
}
console.log(sum);