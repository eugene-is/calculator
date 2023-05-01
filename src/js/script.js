//Получаем элементы со страницы
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

//Определение класса калькулятора
class Calculator {

	//Конструктор класса, принимающий операнды, а также очищает операнды при инициализации
	constructor(previousOperandTextElement, currentOperandTextElement) {
		this.previousOperandTextElement = previousOperandTextElement;
		this.currentOperandTextElement = currentOperandTextElement;
		this.clear();
	}

	//Метод очистки калькулятора
	clear() {
		this.currentOperand = '0';
		this.previousOperand = '';
		this.operation = undefined;
	}

	//Метод для вычисления процента от текущего операнда
	computePercentage() {
		const current = parseFloat(this.currentOperand);
		if (isNaN(current)) return;
		this.currentOperand = current / 100;
	}

	//Метод удаления последнего символа из текущего операнда
	delete() {
		if(this.currentOperand.length){
			this.currentOperand = this.currentOperand.toString().slice(0, -1);
		} else{
			this.currentOperand = 0;
		}
		
	}

	//Метод добавления цифры к текущему операнду
	appendNumber(number) {
		if (number === '.' && this.currentOperand.includes('.')) return;
		this.currentOperand = this.currentOperand.toString() + number.toString();
	}

	//Метод выбора оператора и выполнения предыдущей операции
	chooseOperation(operation) {
		if (this.currentOperand === '') return;
		if (this.previousOperand !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousOperand = this.currentOperand;
		this.currentOperand = '';
	}

	//Метод вычисления результата
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

	//Метод форматирования числа в соответствии с локальными настройками
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

	//Метод обновления текущего отображения калькулятора
	updateDisplay() {
		this.currentOperandTextElement.textContent =
			this.getDisplayNumber(this.currentOperand);
		if (this.operation != null) {
			this.previousOperandTextElement.textContent =
				`${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
		} else {
			this.previousOperandTextElement.textContent = '';
		}

		
		//Получаем текущий операнд и проверяем, содержит ли он более 5 цифр
		const currentOperandLength = this.currentOperand.toString().length;
		if (currentOperandLength > 5) {
			this.currentOperandTextElement.classList.add('small-text');
		} else {
			this.currentOperandTextElement.classList.remove('small-text');
		}

		//Получаем предыдущий операнд и проверяем, содержит ли он более 5 цифр
		const previousOperandLength = this.previousOperand.toString().length;
		if (previousOperandLength > 5) {
			this.previousOperandTextElement.classList.add('small-text');
		} else {
			this.previousOperandTextElement.classList.remove('small-text');
		}

		//Если предыдущий оперант имеет больше 5 цифр, то второй автоматически имеет маленький шрифт
		if (previousOperandLength > 5 || currentOperandLength > 5) {
			this.previousOperandTextElement.classList.add('small-text');
			this.currentOperandTextElement.classList.add('small-text');

		} else {
			this.previousOperandTextElement.classList.remove('small-text');
			this.currentOperandTextElement.classList.remove('small-text');
		}
	}
}

//Cоздание объекта калькулятора с передачей элементов отображения предыдущего и текущего операндов
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);

//Добавление обработчика событий нажатия на кнопки цифр
digitButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.textContent);
		calculator.updateDisplay();
	})
})

//Добавление обработчика событий нажатия на кнопки операций
operatorButtons.forEach(button => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.textContent);
		calculator.updateDisplay();
	})
})

//Добавление обработчика событий нажатия на кнопку равно
equalsButton.addEventListener('click', button => {
	calculator.compute();
	calculator.updateDisplay();
})

//Добавление обработчика событий нажатия на кнопку сброс
clearButton.addEventListener('click', button => {
	calculator.clear();
	calculator.updateDisplay();
})

//Добавление обработчика событий нажатия на кнопку десятичное число
decimalButton.addEventListener('click', button => {
	calculator.appendNumber('.');
	calculator.updateDisplay();
})

//Добавление обработчика событий нажатия на кнопку удаления последнй цифры
deleteButton.addEventListener('click', button => {
	calculator.delete();
	calculator.updateDisplay();
})

//Добавление обработчика событий нажатия на кнопку проценты
percentageButton.addEventListener('click', button => {
	calculator.computePercentage();
	calculator.updateDisplay();
})

//Добавление обработчика событий нажатия на кнопку плюс/минус
plusMinusButton.addEventListener('click', () => {
	calculator.currentOperand = -calculator.currentOperand;
	calculator.updateDisplay();
});

//Добавление обработчика событий нажатия на клавиши клавиатуры
document.addEventListener('keydown', event => {
	if (event.key >= 0 && event.key <= 9) {
		calculator.appendNumber(event.key);
		calculator.updateDisplay();
	} else if (event.key === '.') {
		calculator.appendNumber('.');
		calculator.updateDisplay();
	} else if (event.key === '+' || event.key === '-') {
		calculator.chooseOperation(event.key);
		calculator.updateDisplay();
	} else if(event.key === '*' || event.key === '/') {
		let operator = '';
		if(event.key === '/'){
			operator = '÷';
		} else{
			operator = '×';
		}
		calculator.chooseOperation(operator);
		calculator.updateDisplay();
	} else if (event.key === 'Enter') {
		calculator.compute();
		calculator.updateDisplay();
	} else if (event.key === 'Backspace') {
		calculator.delete();
		calculator.updateDisplay();
	}
});

//Добавление эффекта нажатой кнопки
document.addEventListener("keydown", (event) => {
	buttons.forEach((button) => {
		if (button.textContent === event.key) {
			button.classList.add("pressed");
		}
	});
});

//Удаление эффекта нажатой кнопки
document.addEventListener("keyup", (event) => {
	buttons.forEach((button) => {
		if (button.textContent === event.key) {
			button.classList.remove("pressed");
		}
	});
});