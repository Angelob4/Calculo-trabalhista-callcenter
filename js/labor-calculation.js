$(document).ready(function () {

	var mySalary = 0;
	var fgts = 0
	var transportTax = 0;
	var affiliateFee = 0;

	var $salaryInput = $('#salary');
	var $transportTicket = $('#transport-ticket')
	var $syndicateInput = $('#affiliate-fee');
	var $syndicateWrap = $('#syndicate');

	/**
	 *  On change "salary" input
	 */
	$salaryInput.on('change, keyup', function () {

		mySalary = parseFloat(this.value);

		updateVariables();
		updateTable();
	})

	/**
	 * On change syndicate inpute
	 */
	$syndicateInput.on('change, keyup', function () {

		var $isChecked = $syndicateWrap.is(":checked");

		if ($isChecked) {
			affiliateFee = parseFloat((mySalary * (this.value / 100)).toFixed(2) * -1);
		} else {
			affiliateFee = 0;
		}

		updateTable();
	});

	/**
	 * On change syndicate input
	 */
	$syndicateWrap.on('change', function () {
		var $isChecked = $(this).is(':checked');

		if ($isChecked) {
			$(('.syndicate-tax')).show("blind", {}, 1000);
		} else {
			$(('.syndicate-tax')).hide("blind", {}, 675);
		}

		$syndicateInput.trigger("keyup");

		updateTable();
	})

	/**
	 * On change transport Ticket input
	 */
	$transportTicket.on('change', function () {

		var $isChecked = $(this).is(":checked");

		if ($isChecked) {
			transportTax = parseFloat((mySalary * 0.06).toFixed(2) * -1);
		} else {
			transportTax = 0;
		}
		updateTable();
	});

	/**
	 * Calculate FGTS Tax
	 * @returns float
	 */
	function getFGTS() {

		var salaryMinimum = 1212;

		fgts = 0;

		var progressiveFGTS = {
			1: 7.5 / 100,
			2: 9 / 100,
			3: 12 / 100,
			4: 14 / 100,
		}

		index = 1;
		amountForCalculation = parseFloat(mySalary);

		while (amountForCalculation > 0) {

			if (amountForCalculation - salaryMinimum > 0) {

				if (index == 1) {
					fgts += salaryMinimum * progressiveFGTS[index];
					amountForCalculation -= salaryMinimum;
				} else {

					fgts = fgts + (amountForCalculation * progressiveFGTS[index]);
					amountForCalculation -= salaryMinimum;
				}

			} else {
				if (amountForCalculation > 0) {
					fgts = fgts + (amountForCalculation * progressiveFGTS[index]);
					salary = 0;
					break;
				}
			}

			if (index < 4) {
				index++;
			}

		};
		
		fgts = parseFloat((fgts * -1).toFixed(2));

		return parseFloat(fgts)
	}

	/**
	 * Calculate salary 
	 */
	var getSalaryMinimum = function () {
		
		return parseFloat(mySalary + fgts + transportTax + affiliateFee).toFixed(2);
	}

	/**
	 * Update inputs in HTML
	 */
	var updateTable = function () {
		$('ul li span.item-value span')[0].innerHTML = mySalary	 				;
		$('ul li span.item-value span')[1].innerHTML = getFGTS()				;
		$('ul li span.item-value span')[2].innerHTML = parseFloat(transportTax) ;
		$('ul li span.item-value span')[3].innerHTML = parseFloat(affiliateFee) ;
		$('ul li span.item-value span')[4].innerHTML = getSalaryMinimum()		;
	};
	
	var updateVariables = function () {
		$transportTicket.trigger("change");
		$syndicateWrap.trigger("change");
		$syndicateInput.trigger("change");
	}

	$salaryInput.trigger("keyup");
	updateVariables();

});