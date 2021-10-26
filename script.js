class Calculator {
    constructor(previousNumberTextElement, currentNumberTextElement) {
        this.previousNumberTextElement = previousNumberTextElement
        this.currentNumberTextElement = currentNumberTextElement
    }

    clear() {
        this.previousNumber = ''
        this.currentNumber = ''
        this.operation = undefined
    }

    delete() {
        this.currentNumber = this.currentNumber.toString().slice(0, -1)
    }

    writeNumber(number) {
        if (number === '.' && this.currentNumber.includes('.')) return
        else if (number === '.' && this.currentNumber === '') {
            this.currentNumber = '0'
        }
        this.currentNumber = this.currentNumber.toString() + number.toString()
    }

    changeSign() {
        if (this.currentNumber === '' || this.currentNumber === '0.') return
        this.currentNumber = this.currentNumber * -1;
        this.currentNumber = this.currentNumber.toString()
    }

    chooseOperation(operation) {
        if (this.currentNumber === '') return
        if (this.previousNumber !== '') {
            this.compute()
        }
        this.operation = operation
        this.previousNumber = this.currentNumber
        this.currentNumber = ''
    }
    
    compute() {
        let computation
        const previous = parseFloat(this.previousNumber)
        const current = parseFloat(this.currentNumber)
        if (isNaN(previous) || isNaN(current)) return
        switch (this.operation) {
            case '+':
                computation = previous + current
                break
            case '-':
                computation = previous - current
                break
            case 'x':
                computation = previous * current
                break
            case '÷':
                computation = previous / current
                break
            default:
                return
        }
        this.currentNumber = computation
        this.operation = undefined
        this.previousNumber = ''
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigits = stringNumber.split('.')[1]
        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ''
        } else {
            integerDisplay = integerDigits.toLocaleString('en',
            {maximumFractionDigits: 0})
        }
        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentNumberTextElement.innerText = 
            this.getDisplayNumber(this.currentNumber)
        if (this.operation != null) {
            this.previousNumberTextElement.innerText = 
                `${this.getDisplayNumber(this.previousNumber)} ${this.operation}`
        } else {
            this.previousNumberTextElement.innerText = ''
        }
    }
}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const cancelButton = document.querySelector('[data-cancel]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousNumberTextElement = document.querySelector('[data-previous-number]')
const currentNumberTextElement = document.querySelector('[data-current-number]')
const changeSignButton = document.querySelector('[data-change-sign]')


const calculator = new Calculator(previousNumberTextElement, currentNumberTextElement)
calculator.clear()



numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.writeNumber(button.innerText)
        calculator.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})

cancelButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

changeSignButton.addEventListener('click', button => {
    calculator.changeSign()
    calculator.updateDisplay()
})