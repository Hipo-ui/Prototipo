const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input, textarea");

const expresiones = {
	nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/,
	correo: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
}

const campos = {
	nombre: false,
	correo: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		case "nombre":
			validarCampo(expresiones.nombre, e.target, "nombre");
			validarNombreLongitud(e.target, "nombre");
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, "correo");
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`${campo}`).classList.remove("-invalid");
		document.getElementById(`${campo}`).classList.add("-valid");
		document.querySelector(`#group-${campo} .messaje-error`).classList.add("d-none");		
		campos[campo] = true;
	} else {		
		document.getElementById(`${campo}`).classList.remove("-valid");
		document.getElementById(`${campo}`).classList.add("-invalid");
		document.querySelector(`#group-${campo} .messaje-error`).classList.remove("d-none");
		campos[campo] = false;
	}

	if (input.value === "" || input.value.length == 0) {
		document.querySelector(`#group-${campo} .messaje-error`).classList.add("d-none");
		document.querySelector(`#group-${campo} .messaje-required`).classList.remove("d-none");
		document.querySelector(`#group-${campo} .messaje-length`).classList.add("d-none");	
	} else {
		document.querySelector(`#group-${campo} .messaje-required`).classList.add("d-none");
	}
}

const validarNombreLongitud = (input, campo) => {
	if(input.value.length > 45){
		document.querySelector(`#group-${campo} .messaje-length`).classList.remove("d-none");
		document.querySelector(`#group-${campo} .messaje-error`).classList.add("d-none");
	}else{
		document.querySelector(`#group-${campo} .messaje-length`).classList.add("d-none");
	}
}


inputs.forEach((input) => {
	input.addEventListener("keyup", validarFormulario);
	input.addEventListener("blur", validarFormulario);
});


formulario.addEventListener("submit", (e) => {

	e.preventDefault();

	if (campos.correo && campos.nombre) {
		document.getElementById("alert").classList.add("d-none");
		
		document.querySelectorAll(".-valid").forEach((i) => {
			i.classList.remove("-valid");
		});

		document.getElementById("formulario").submit();
		formulario.reset();
	} else {		
		document.getElementById("alert").classList.remove("d-none");	


		for(var i=0; i < formulario.elements.length; i++){
			if(formulario.elements[i].value === '' && formulario.elements[i].hasAttribute('required')){
				formulario.elements[i].classList.add("-invalid");			
			}
		}
		
		/*entrada = document.querySelectorAll("#formulario input").forEach((i) => {			
			inputs.forEach((input) => {
				if (input.value == "" || input.value.length == 0) {
					i.classList.add("-invalid");
				}		
			});	
		});*/
	}
});
