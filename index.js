let currentValue = '';
let operator = '';
const buttons = document.querySelectorAll('.number');

buttons.forEach(function(button) {
    button.addEventListener('click', function() {
        currentValue += button.innerText;
        document.getElementById('inputbox').value = currentValue;
    });
});

document.getElementById('cancle').addEventListener('click', function() {
    document.getElementById('inputbox').value = '';
    currentValue = '';
    operator = '';
});
// document.getElementById('delete').addEventListener('click', function() {
//     deleteLast();
// });

// function deleteLast() {
//     currentValue = currentValue.slice(0, -1);
//     document.getElementById('inputbox').value = currentValue;
// }

document.getElementById('delete').addEventListener('click', function() {
    deleteLast();
});

function deleteLast() {
    currentValue = currentValue.slice(0, -1);
    document.getElementById('inputbox').value = currentValue;
}
function resetCalculator() {
    currentValue = '';
    operator = '';
    document.getElementById('inputbox').value = '';
}


document.getElementById('reset').addEventListener('click', function() {
    resetCalculator();
});


document.querySelectorAll('.operator').forEach(function(button){
    button.addEventListener('click', function(){
        if(currentValue !== ''){            
            operator = button.innerText;
            currentValue += operator;
            document.getElementById('inputbox').value = currentValue;
        }
    });
});

document.getElementById('equalbtn').addEventListener('click', function(){
    if(operator !== '' && currentValue !== ''){
        calculate();
    }
});



function calculate() {
    const addition = currentValue.split('+');
    let result = 0;

    addition.forEach((addExp, index) => {
        const subtraction = addExp.split('-');
        let tempResult = calculateSubtraction(subtraction);

        if (index === 0) {
            result = tempResult;
        } else {
            result += tempResult;
        }
    });

    document.getElementById('inputbox').value = result;
    currentValue = '';
}

function calculateSubtraction(subtraction) {
    let result = calculateMultiplicationAndDivision(subtraction[0]);

    for (let i = 1; i < subtraction.length; i++) {
        const multiplyDivide = calculateMultiplicationAndDivision(subtraction[i]);
        result -= multiplyDivide;
    }

    return result;
}

function calculateMultiplicationAndDivision(expression) {
    const multiplication = expression.split('*');
    let result = 1;

    multiplication.forEach(multiplyExp => {
        const division = multiplyExp.split('/');
        let tempResult = parseFloat(division[0]);

        for (let i = 1; i < division.length; i++) {
            tempResult /= parseFloat(division[i]);
        }

        result *= tempResult;
    });

    return result;
}