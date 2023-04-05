let int, real, date, pass, pass2;

intB.onclick = function(){
	int = document.getElementById('int').value;
	if (Number.isInteger(Number(int))){
		alert("Вірно!");
		return false;
	} else {
		alert("Число повинне бути цілим!");
		return false;
	}
}

realB.onclick = function(){
	real = document.getElementById('real').value;
	if (!Number.isNaN(Number(real))){
		alert("Вірно!");
		return false;
	} else {
		alert("Число повинне бути дійсним!");
		return false;
	}
}

dateB.onclick = function(){
	date = document.getElementById('date').value;
	let regex = /^\d{2}\.\d{2}\.\d{4}$/;
	if (regex.test(date)) {
		alert("Вірно!");
		return false;
	} else {
		alert("Дата повинна бути у форматі DD.MM.YYYY");
		return false;
	}
	
}

passB.onclick = function(){
	pass2 = document.getElementById('pass2').value;
	pass = document.getElementById('pass').value;
	if(pass == pass2){
		alert("Вірно!");
		return false;
	} else{
		alert("Паролі не співпадають!");
		return false;
	}
}