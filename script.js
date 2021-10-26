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
const deleteButton = document.querySelector('[data-delete]')
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

deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})

changeSignButton.addEventListener('click', button => {
    calculator.changeSign()
    calculator.updateDisplay()
})

const keyboardButtons = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '+', '-', '*', '/', '=', 'Enter', 'c', 'd', 's', 'C', 'D', 'S']

window.addEventListener('keydown', e => {
    const key = e.key
    const keyIndex = keyboardButtons.indexOf(key)
    
    if (keyIndex > -1) {
        switch (key){
            case '1':
                calculator.writeNumber(1)
                break
            case '2':
                calculator.writeNumber(2)
                break
            case '3':
                calculator.writeNumber(3)
                break
            case '4':
                calculator.writeNumber(4)
                break
            case '5':
                calculator.writeNumber(5)
                break
            case '6':
                calculator.writeNumber(6)
                break
            case '7':
                calculator.writeNumber(7)
                break
            case '8':
                calculator.writeNumber(8)
                break
            case '9':
                calculator.writeNumber(9)
                break
            case '0':
                calculator.writeNumber(0)
                break
            case '.':
                calculator.writeNumber(".")
                break
            case '+':
                calculator.chooseOperation('+')
                break
            case '-':
                calculator.chooseOperation('-')
                break
            case '*':
                calculator.chooseOperation('x')
                break
            case '/':
                calculator.chooseOperation('÷')
                break
            case '=':
                calculator.compute()
                break
            case 'Enter':
                calculator.compute()
                break
            case 'c':
                calculator.clear()
                break
            case 'C':
                calculator.clear()
                break
            case 'd':
                calculator.delete()
                break
            case 'D':
                calculator.delete()
                break
            case 's':
                calculator.changeSign()
                break
            case 'S':
                calculator.changeSign()
                break
            default:
                return
        }
        calculator.updateDisplay()
    }
})