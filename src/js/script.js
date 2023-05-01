const digitButtons = document.querySelectorAll('.digit');
const percentageButton = document.querySelector('.percent');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const decimalButton = document.querySelector('.decimal');
const plusMinusButton = document.querySelector('.plus-minus');
const deleteButton = document.querySelector('.delete');
const previousOperandTextElement = document.querySelector('.previous-operand');
const currentOperandTextElement = document.querySelector('.current-operand');
const buttons = document.querySelectorAll(".btn");

class Calculator {
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	clear() {
		this.currentOperand = '0';
		this.previousOperand = '';
		this.operation = undefined;
	}

	computePercentage() {
		const current = parseFloat(this.currentOperand);
		if (isNaN(current)) return;
		this.currentOperand = current / 100;
	}

	delete() {
		if(this.currentOperand.length){
			this.currentOperand = this.currentOperand.toString().slice(0, -1);
		} else{
			this.currentOperand = 0;
		}
		
	}

	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	compute() {
		let computation;
		const prev = parseFloat(this.previousOperand);
		const current = parseFloat(this.currentOperand);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '×':
				computation = prev * current;
				break;
			case '÷':
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentOperand = computation;
		this.operation = undefined;
		this.previousOperand = '';
	}

	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}.${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}

	updateDisplay() {
		this.currentOperandTextElement.textContent =
			this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
			this.previousOperandTextElement.textContent =
				`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		} else {
			this.previousOperandTextElement.textContent = '';
		}
	}
}

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

digitButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.textContent);
		calculator.updateDisplay();
	})
})

operatorButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.textContent);
		calculator.updateDisplay();
	})
})

equalsButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
})

clearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
})

decimalButton.addEventListener('click', button => {
	calculator.appendNumber('.');
	calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
	calculator.delete();
	calculator.updateDisplay();
})

percentageButton.addEventListener('click', button => {
	calculator.computePercentage();
	calculator.updateDisplay();
})

plusMinusButton.addEventListener('click', () => {
	calculator.currentOperand = -calculator.currentOperand;
	calculator.updateDisplay();
});

document.addEventListener('keydown', event => {
	console.log(event.key);
	if (event.key >= 0 && event.key <= 9) {
		calculator.appendNumber(event.key);
		calculator.updateDisplay();
	} else if (event.key === '.') {
		calculator.appendNumber('.');
		calculator.updateDisplay();
	} else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
		if(event.key === '/') event.key = '÷';
		console.log(event.key);
		if(event.key === '*') event.key = '×';
		calculator.chooseOperation(event.key);
		calculator.updateDisplay();
	} else if (event.key === 'Enter') {
		calculator.compute();
		calculator.updateDisplay();
	} else if (event.key === 'Backspace') {
		calculator.delete();
		calculator.updateDisplay();
	}
});

document.addEventListener("keydown", (event) => {
	buttons.forEach((button) => {
		if (button.textContent === event.key) {
			button.classList.add("pressed");
		}
	});
});

document.addEventListener("keyup", (event) => {
	buttons.forEach((button) => {
		if (button.textContent === event.key) {
			button.classList.remove("pressed");
		}
	});
});