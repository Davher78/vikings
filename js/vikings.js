
/* Clase luchador */
function Fighter (maxHealth, maxStrong) {
	
	this.health = Math.floor((Math.random() * maxHealth) + 1);
	this.strong = Math.floor((Math.random() * maxStrong) + 1);

}

/* Puntos de ataque del luchador */
Fighter.prototype.attack = function() {
	return this.strong;
}

/* Indica si el luchado se puede defender de un ataque de x puntos*/
Fighter.prototype.canDefense = function(points) {

	/* miramos si se queda sin vida */
	var live = this.health - points;
	/* si le queda vida, se puede defender --> true */
	if (live > 0) {
		return true;
	}
	/* si no, no puede defenderse --> false */
	else {
		return false;
	}
}

/* Ejecutamos la defensa en un ataque */ 
Fighter.prototype.defense = function(points) {

	this.health = this.health - points;
	if (this.health < 0) {
		this.health = 0;
	}
	return true;
}

/* -------------------------------------------------- */ 
/* Clase Sajon */

function Saxon () {

	/* definimos salud y vida */
	var maxHealth = 40;
	var maxStrong = 12;

	/* llamamos al constructor de fighter */
	Fighter.call(this, maxHealth, maxStrong);
}
/* Creamos el objeto prototipe de saxon a partir de Fighter*/
Saxon.prototype = Object.create(Fighter.prototype);

/* Cambiamos el tipo del objeto de Fighter a Saxon en el constructor */   
Saxon.prototype.constructor = Saxon;

/* Podemos redefinir las funciones prototype de Fighter*/

/* -------------------------------------------------- */ 

/* Clase Vikingo */

function Viking (name, age, weapon) {

	/* añadimos el nombre a los vikingos */
	this.name = name;
	this.weapon = weapon;
	this.age = age;

	/* definimos salud y vida */
	var maxHealth = 60;
	var maxStrong = 20;

	/* llamamos al constructor de fighter */
	Fighter.call(this, maxHealth, maxStrong);

}

/* Creamos el objeto prototipe de saxon a partir de Fighter*/
Viking.prototype = Object.create(Fighter.prototype);

/* Cambiamos el tipo del objeto de Fighter a Saxon en el constructor */   
Viking.prototype.constructor = Viking;

/* Redefinimos la funcion para un vikingo */
Viking.prototype.attack = function() {
	if (weapon == "axes"){
		return (this.strong + 10); 
	} elseif (weapon == "spears"){
		return (this.strong + 10); 
	}

	return this.strong;
}

/* -------------------------------------------------- */

/* Configuracion de la vista, en este caso la consola */

function ConfigVista (modo) {

	this.modo = modo;

	this.mensajeVencedor = function (){

		if (this.modo == "E") {
			return function(fighter) {
				console.log(fighter.name + " con fuerza " + fighter.strong + " y vida " + fighter.health + " no ataca pero gana el entrenamiento");
			}	
		} else {
			return function(fighter) {

				if (fighter instanceof Viking){
					console.log("El Vikingo " + fighter.name + " con fuerza " + fighter.strong + " y vida " + fighter.health + " mata al Sajon");
				} else {
					console.log("El Sajon con fuerza " + fighter.strong + " y vida " + fighter.health + " mata al Vikingo");
				}

			}
		}	
	}

	this.mensajeSajonesWin = function (){

		if (this.modo != "E") {
			return function(turns) {
				console.log("El pueblo Sajon gana la batalla en " + turns + " turnos ");
			}	
		}	
	}

	this.mensajeVikingosWin = function (){

		if (this.modo != "E") {
			return function(turns) {
				console.log("Los Vikingos ganan la batalla en " + turns + " turnos ");
			}	
		}	
	}

	this.mensajeAttack = function (){

		if (this.modo == "E") {

			return function(fighter1, fighter2) {	
				console.log(fighter1.name + " con fuerza " + fighter1.strong + " y vida " + fighter1.health + " ataca a " + fighter2.name + " con vida " + fighter2.health);
			}

		} else {

			return function(fighter1, fighter2) {	
				if (fighter1 instanceof Viking){
					console.log("El Vikingo " + fighter1.name + " con fuerza " + fighter1.strong + " y vida " + fighter1.health + " ataca al Sajon con vida " + fighter2.health);
				} else {
					console.log("El Sajon con fuerza " + fighter1.strong + " y vida " + fighter1.health + " ataca al Vikingo " + fighter2.name + " con vida " + fighter2.health);
				}
			}
		}	
	}

	this.mensajeTipo = function (){

		if (this.modo == "E"){
			return function(fighter1,fighter2){

				console.log(" --------------------------------------------------- ")
				console.log("                 ENTRENAMIENTO VIKINGO               ")
				console.log(" --------------------------------------------------- ")
				console.log("Luchador " + fighter1.name + " fuerza " + fighter1.strong + " salud " + fighter1.health);
				console.log("contra ")
				console.log("Luchador " + fighter2.name + " fuerza " + fighter2.strong + " salud " + fighter2.health);
				console.log(" --------------------------------------------------- ")
			}	
		} else {

			return function(fighter1,fighter2){
				console.log(" --------------------------------------------------- ")
				console.log("             COMIENZA LA BATALLA ESTELAR!!!          ")
				console.log(" --------------------------------------------------- ")
				console.log("Comienza el Vikingo " + fighter1.name + " con fuerza " + fighter1.strong + " y salud " + fighter1.health);
				console.log("contra ")
				console.log("Un Sajon con fuerza " + fighter2.strong + " y salud " + fighter2.health);
				console.log(" --------------------------------------------------- ")

			}
		}
	}

	this.mensajeEmpate = function (){

		if (this.modo == "E") {
			return function(turns) {
				console.log("Los luchadores han empatado en " + turns + " turnos");
			}
		} else {
			return function(turns) {
				console.log("Los ejercitos han empatado en " + turns + " turnos");
			}
		}	
	}

	this.mensajeNewSaxon = function (){

		if (this.modo != "E") {
			return function(fighter) {
				console.log("Se incorpora a la lucha un nuevo Saxon con fuerza " + fighter.strong + " y vida " + fighter.health);
			}
		}	
	}

	this.mensajeNewViking = function (){

		if (this.modo != "E") {
			return function(fighter) {
				console.log("Se incorpora a la lucha el Vikingo " + fighter.name + " con fuerza " + fighter.strong + " y salud " + fighter.health);
			}
		}	
	}

	this.mensajeStatus = function (){

		if (this.modo != "E") {
			return function(vikingos, sajones) {
				console.log("Número de Vikingos muertos: " + vikingos);
				console.log("Número de Sajones muertos: " + sajones);
			}
		}	
	}
	
	this.mensajeTurno = function () {
		if (this.modo == "E") {
			return function(cont){
				console.log("TURNO DE COMBATE: " + cont);
			}	
		} else {
			return function(cont){
				console.log("TURNO DE BATALLA: " + cont);
			}
		}
	}	

}

/* -------------------------------------------------- */

function Pit(fig1, fig2) {

	this.fighter1 = fig1;
	this.fighter2 = fig2;
}

Pit.prototype.newFighter1 = function(fig1) {
	this.fighter1 = fig1;
}

Pit.prototype.newFighter2 = function(fig2) {
	this.fighter2 = fig2;
}

Pit.prototype.fight = function(modo) {
	
	var noganador = true; 
	var winner = -1;
	var consoleMessage = "";

	var vistaController = new ConfigVista(modo);

	if (this.fighter2.canDefense(this.fighter1.strong)) {

		/* Mensajes para la vista */
		consoleMessage = vistaController.mensajeAttack();
		consoleMessage(this.fighter1, this.fighter2);
		
		this.fighter2.defense(this.fighter1.strong);

		/* si el luchador 2 no puede defenderse, el luchador 1 gana */
	} else {

		/* Mensajes para la vista */
		consoleMessage = vistaController.mensajeVencedor();
		consoleMessage(this.fighter1);

		/* Si es modo combate lo mata */
		if (modo == "C") {
			this.fighter2.defense(this.fighter1.strong)
		}

		noganador = false;
		winner = 1;
	}

	/* si el luchado 1 no ha ganado, ataca el luchador 2 */
	if (noganador) { 
			
		/* si el luchador 1 puede defenderse del ataque del luchador 2, realizamos el ataque */
		if (this.fighter1.canDefense(this.fighter2.strong)) {

			/* Mensajes para la vista */
			consoleMessage = vistaController.mensajeAttack();
			consoleMessage(this.fighter2, this.fighter1);
			
			this.fighter1.defense(this.fighter2.strong)

		/* si el luchador 1 no puede defenderse, el luchador 2 gana */
		} else {

			/* Mensajes para la vista */
			consoleMessage = vistaController.mensajeVencedor();
			consoleMessage(this.fighter2);

			/* Si es modo combate lo mata */
			if (modo == "C") {
				this.fighter1.defense(this.fighter2.strong)
			}

			noganador = false;
			winner = 2;
		}

	}

	if (noganador) { 
		winner = 0;
	}

	return winner;
}


function Assault(kjorseyrr, saxonTown, turns) {

	this.kjorseyrr = kjorseyrr;
	this.saxonTown = saxonTown;
	this.turns = turns;
	
}
Assault.prototype.combat = function() { 

	var consoleMessage = "";
	var vistaController = new ConfigVista("C");
	var status = 0;
	var winner = 0;
	var contador = 1;
	var vikingCount = 0;
	var saxonCount = 0;
	var batalla = new Pit(this.kjorseyrr[vikingCount],this.saxonTown[saxonCount]);

	/* Configuramos la vista  --> comienzo */
	consoleMessage = vistaController.mensajeTipo();
	consoleMessage(batalla.fighter1, batalla.fighter2);

	while ((contador <= this.turns) && (winner == 0)) {
	
		/* Configuramos la vista  --> turno */
		consoleMessage = vistaController.mensajeTurno();
		consoleMessage(contador);

		/* Configuramos la vista  --> numero de muertos */
		consoleMessage = vistaController.mensajeStatus();
		consoleMessage(vikingCount, saxonCount);

		statusCombat = batalla.fight("C");

		if (statusCombat == 1){

			/* gana el vikingo */
			saxonCount++;

			/* si quedan sajones */
			if (saxonCount < this.saxonTown.length) {

				consoleMessage = vistaController.mensajeNewSaxon();
				consoleMessage(this.saxonTown[saxonCount]);
				batalla.newFighter2(this.saxonTown[saxonCount]);

			} else {

				winner = 1;	

				consoleMessage = vistaController.mensajeVikingosWin();
				consoleMessage(contador);

			}

			
			
		} else if (status == 2){

			/* gana el sajon */
			vikingCount++;

			/* si quedan vikingos */
			if (vikingCount < this.kjorseyrr.length) {

				consoleMessage = vistaController.mensajeNewViking();
				consoleMessage(this.kjorseyrr[vikingCount]);
				batalla.newFighter1(this.kjorseyrr[vikingCount]);

			} else {

				winner = 2;	

				consoleMessage = vistaController.mensajeSajonesWin();
				consoleMessage(contador);

			}
		}

		contador ++;
	}

}

/* Entrenamiento Vikingo */
function VikingPit(fig1, fig2, turns){

	/* añadimos los turnos */
	this.turns = turns;	

	/* llamamos al constructor de Pit */
	Pit.call(this, fig1, fig2);	

}

/* Creamos el objeto prototipe de VikingPit a partir de Pit*/
VikingPit.prototype = Object.create(Pit.prototype);

/* Cambiamos el tipo del objeto de Pit a vIKINGpIT en el constructor */   
VikingPit.prototype.constructor = VikingPit;

/* función entrenamiento */
VikingPit.prototype.entrenamiento = function() {

	var contador = 1; 
	var consoleMessage = "";
	var vistaController = new ConfigVista("E");
	var status = -1;
	var noganador = true;

	/* Configuramos la vista  --> comienzo entrenamiento */
	consoleMessage = vistaController.mensajeTipo();
	consoleMessage(this.fighter1,this.fighter2);

	while (noganador && (contador <= this.turns)) {

		/* Configuramos la vista  --> turno */
		consoleMessage = vistaController.mensajeTurno();
		consoleMessage(contador);

		status = this.fight("E");

		if (status != 0){
			noganador = false;
		}

		contador++;
	}

	/* si se han agotado los turnos es porque no hay ganadores */
	if (noganador && (contador > this.turns) ) { 

		/* Configuramos la vista  --> empate */
		consoleMessage = vistaController.mensajeEmpate();
		consoleMessage(this.turns);
	}
}

/* pueblo de 5 vikingos */
var kjorseyrr = [];
vikingo1 = new Viking("David");
kjorseyrr.push(vikingo1);
vikingo2 = new Viking("Pedro");
kjorseyrr.push(vikingo2);
vikingo3 = new Viking("Juan");
kjorseyrr.push(vikingo3);
vikingo4 = new Viking("Felipe");
kjorseyrr.push(vikingo4);
vikingo5 = new Viking("Alberto");
kjorseyrr.push(vikingo5);

/* pueblo de 20 sajones */
var town = [];
for (var i = 0; i < 20; i++) {
  sajon = new Saxon();
  town.push(sajon);
};

/* entrenamiento para los vikingos */ 
ring = new VikingPit(kjorseyrr[0], kjorseyrr[1], 5 )
ring.entrenamiento();

/* batalla entre pueblos */
batalla = new Assault(kjorseyrr, town, 15);
batalla.combat();

