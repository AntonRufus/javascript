let result = [0, 1];
let index = result.length;
let calculation = 0;
let element = 10;

do {
    calculation = result[index - 1] + result[index - 2];
    result.push(calculation);
    index++;
    console.log(result);
} while (result.length < element);
