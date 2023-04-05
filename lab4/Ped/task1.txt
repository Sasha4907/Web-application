let len = 0;

document.forms.arr.onsubmit = function(){
	len = Number(this.size.value);
	console.log(len);
	return false;
}

let	array = [];

function arr_fill(){
	array = [];
	for(let i = 0; i < len; i++){
		array.push(Math.floor(Math.random() * 100));
	}
	document.getElementById('textplace').innerHTML = array + "<br \/>";
}

let min, max;
let mnIndex = 0, mxIndex = 0;

function Max(){
	let tmp = 0;
	for(let i = 0; i < len; i++){
		if((array[i] % 2 == 0)  && (array[i] > tmp)){
			tmp = array[i];
		}
	}
	max = tmp;
	document.getElementById('textplace').innerHTML += "Максимальний серед парних елементів: " + max  + "<br \/>";
}

function Min(){
	let tmp = array[2];
	for(let i = 2; i < len; i++){
		if((i % 2 == 0)  && (array[i] < tmp)){
			tmp = array[i];
		}
	}
	min = tmp;
	document.getElementById('textplace').innerHTML += "Мінімальний серед елементів з парними індексами: " + min + "<br \/>";
}

function max_min_swap(){
	let tmp = 0;
	for(let i = 0; i < len; i++){
		if(array[i] > tmp){
			tmp = array[i];
			mxIndex = i;
		}
		max = tmp;
	}

	for(let i = 0; i < len; i++){
		if(array[i] < tmp){
			tmp = array[i];
			mnIndex = i;
		}
		min = tmp;
	}

	array[mxIndex] = min;
	array[mnIndex] = max;
	document.getElementById('textplace').innerHTML += "Масив після перестановки мінімального і максимального елементів: " + array + "<br \/>";
}

function insertion_sort(){
	for(let i = 0; i < len; i++){
		const current = array[i];
		let j = i;
		while((j > 0) && (array[j - 1] > current)){
			array[j] = array[j - 1];
			j--;
		}
		array[j] = current;
	}
	document.getElementById('textplace').innerHTML += "Масив після сортування вставкою: " + array + "<br \/>";
}

window.onload = function(){
	document.getElementById('showArr').onclick = arr_fill;
	document.getElementById('maxArr').onclick = Max;
	document.getElementById('minArr').onclick = Min;
	document.getElementById('swapArr').onclick = max_min_swap;
	document.getElementById('sortArr').onclick = insertion_sort;
};