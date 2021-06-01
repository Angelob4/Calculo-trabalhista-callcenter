function calc(){

	sal = document.getElementById("sal").value

	fgts = getFGTS(sal, 1100)

	dvt = getValeTransporte(sal)

	sin = sal * 0.01

	if(document.getElementById("check-vt").checked){
		dvt = 0
	}

	if(document.getElementById("check-sin").checked){
		sin = 0
	}	

	document.getElementById("fgts").value = (fgts *-1).toFixed(2)

	document.getElementById("dVT").value =  (dvt* -1).toFixed(2) 

	document.getElementById("sindicato").value =  (sin* -1).toFixed(2) 

	document.getElementById("total").innerHTML =  (sal - fgts - dvt - sin).toFixed(2)



}

function getFGTS(salario, salarioMinimo){

	var fgts = 0

	if( salario <= salarioMinimo ){

		fgts7 = salario * 0.075

		} else {
			fgts7 = salarioMinimo * 0.075
		}
		
	fgts9 = 0
	fgts12 = 0
	fgts15 = 0			

			
	if ( salario > salarioMinimo ) {				
		if ( salario <= ( salarioMinimo * 2 ) ){
			fgts9 = ( salario - salarioMinimo  ) * 0.09
		} else {
			fgts9 = salarioMinimo * 0.09
		}
		
	}	

	if ( salario >= ( salarioMinimo * 2 ) ){				
				
		if ( salario <= ( salarioMinimo * 3 ) ){
			fgts12 = ( salario - (salarioMinimo * 2) ) * 0.12
		} else {
			fgts12 = salarioMinimo * 0.12
		}			
				
	}
						
	if ( salario >= ( salarioMinimo * 3 ) ){

		fgts15 = ( salario - (salarioMinimo * 3 )  ) * 0.14

		
	}

	fgts = fgts7 + fgts9 + fgts12 + fgts15

	return fgts	
}

function getValeTransporte(salario){

	return salario * 0.06
}