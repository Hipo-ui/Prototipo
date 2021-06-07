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
			if (expresiones.nombre.test(e.target.value)) {
				document.getElementById("nombre").classList.remove("-invalid");
				document.getElementById("nombre").classList.add("-valid");
				document.querySelector("#group-nombre .messaje-error").classList.add("d-none");
				campos.nombre = true;
			} else {
				document.getElementById("nombre").classList.remove("-valid");
				document.getElementById("nombre").classList.add("-invalid");
				document.querySelector("#group-nombre .messaje-error").classList.remove("d-none");
				campos.nombre = false;
			}

			if (e.target.value.length > 45) {
				document.querySelector("#group-nombre .messaje-length").classList.remove("d-none");
				document.querySelector("#group-nombre .messaje-error").classList.add("d-none");
			} else {
				document.querySelector("#group-nombre .messaje-length").classList.add("d-none");
			}

			if (e.target.value === "" || e.target.value.length == 0) {
				document.querySelector("#group-nombre .messaje-error").classList.add("d-none");
				document.querySelector("#group-nombre .messaje-required").classList.remove("d-none");
				document.querySelector("#group-nombre .messaje-length").classList.add("d-none");	
			} else {
				document.querySelector("#group-nombre .messaje-required").classList.add("d-none");
			}			
			break;

		case "correo":
			if (expresiones.correo.test(e.target.value)) {
				document.getElementById("correo").classList.remove("-invalid");
				document.getElementById("correo").classList.add("-valid");
				document.querySelector("#group-correo .messaje-error").classList.add("d-none");
				campos.correo = true;
			} else {
				document.getElementById("correo").classList.remove("-valid");
				document.getElementById("correo").classList.add("-invalid");
				document.querySelector("#group-correo .messaje-error").classList.remove("d-none");
				campos.correo = false;
			}

			if (e.target.value.length > 45) {
				document.getElementById("correo").classList.remove("-valid");
				document.getElementById("correo").classList.add("-invalid");
				document.querySelector("#group-correo .messaje-length").classList.remove("d-none");
				document.querySelector("#group-correo .messaje-error").classList.add("d-none");
			} else {
				document.querySelector("#group-correo .messaje-length").classList.add("d-none");
			}

			if (e.target.value === "" || e.target.value.length == 0) {
				document.querySelector("#group-correo .messaje-error").classList.add("d-none");
				document.querySelector("#group-correo .messaje-required").classList.remove("d-none");
				document.querySelector("#group-correo .messaje-length").classList.add("d-none");	
			} else {
				document.querySelector("#group-correo .messaje-required").classList.add("d-none");
			}
			break;
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

		for (var i = 0; i < formulario.elements.length; i++) {
			if (formulario.elements[i].value === '' && formulario.elements[i].hasAttribute('required')) {
				formulario.elements[i].classList.add("-invalid");
			}
		}
	}
});
