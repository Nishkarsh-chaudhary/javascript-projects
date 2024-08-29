const display = document.getElementById("display")
const buttons = [...document.querySelectorAll('.button')]

let  currentInput = ''
let  firstOperand = ''
let  secondOperand = ''
let operator = '' 



buttons.forEach(button => {
    button.addEventListener('click', () =>{
        const number = button.getAttribute('data-number')
        const operatorValue = button.getAttribute('data-operator')

        if (number !== null){
            currentInput += number;
            display.value = currentInput;
        }

        if (operatorValue !== null){
            if (currentInput !== ''){
                firstOperand = currentInput;
                currentInput = '';
                operator = operatorValue;
                display.value = operator;
            }
        }

        if (button.id === 'equal'){
            if(firstOperand !== '' && currentInput !== ''){
                secondOperand = currentInput;
                display.value = evaluateExpression(firstOperand, secondOperand, operator);
                firstOperand = '';
                currentInput = '';
                operator = '';
            }
        }

        if (button.id === 'all-clear'){
            firstOperand = '';
            secondOperand = '';
            currentInput = '';
            operator = '';
            display.value = '';
        }

        if (button.id === 'del'){
            currentInput = currentInput.slice(0 , -1);
            display.value = currentInput;
        }

    })
});


function evaluateExpression(first, second , operator){
    const firstNumber = parseFloat(first);
    const secondNumber = parseFloat(second);

    switch(operator){
        case '+':
            return firstNumber + secondNumber;
        case '-':
            return firstNumber - secondNumber;
        case '*':
            return firstNumber * secondNumber;
        case '/':
            return firstNumber / secondNumber;
        default:
            return '';
    }
}