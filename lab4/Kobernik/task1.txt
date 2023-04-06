// створюємо масив
let quantity = prompt('enter quantity:', 0);
let arr = [];
for(let i=0; i<quantity;i++)
{
    arr.push(Math.floor(Math.random() * quantity));
}
document.getElementById('answer').innerHTML += "Масив: " + arr + "<br \/>";
console.log(arr);

//швидке сортування
function Parts(array,left, right) {
     var pivot = array[0];  
    for (var i = 1; i < array.length; i++) {
        if (array[i] < pivot) {
            left.push(array[i]);
        }
        else {
            right.push(array[i]);
        }
    }
}
function quickSort(array) {
    if (array.length <= 1) {
        return array;
    } else {
        var left = [];
        var right = [];
        var pivot = array[0];  
        Parts(array,left, right);
        return quickSort(left).concat(pivot, quickSort(right));
    }
}
var sortedArray = quickSort(arr);
document.getElementById('answer').innerHTML += "Швидке сортування: " + sortedArray  + "<br \/>";
console.log(sortedArray);


//сума

function sum(array) {  
    let sum = 0;
    // Обчислюємо суму елементів між мінімальним та максимальним значеннями масиву
        for (let i = 1; i < array.length - 1; i++) {
            sum += array[i];
        }
    return sum;
}

document.getElementById('answer').innerHTML += "Обчислюємо суму елементів між мінімальним та максимальним значеннями масиву: " + sum(sortedArray)  + "<br \/>";
console.log(sum(sortedArray));