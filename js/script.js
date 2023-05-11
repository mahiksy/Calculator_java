const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operators");
const resultText = document.querySelector("p");

const calculator = {
    firstNum: "",
    secondNum: "",
    result: "",
    operator: "",
    checkNumTwo: false,
    checkOperate: false,
    checkForFloat:false,
    printResult: false
}

//operation process
function operate(num1, num2, op){
    if(num2 == ""){
        calculator.result = num1;
    }
    else {
        switch (op) {
            case " + ":
                calculator.result = (parseFloat(num1) + parseFloat(num2));
                break;
            case " - ":
                calculator.result = (parseFloat(num1) - parseFloat(num2));
                break;
            case " * ":
                calculator.result = (parseFloat(num1) * parseFloat(num2));
                break;
            case " / ":
                if(num2 != '0'){
                    calculator.result = (parseFloat(num1) / parseFloat(num2));
                }
                else{
                    calculator.result  = "ERR! Click C";
                }
                break;
        }
    }
    calculator.printResult = true;
}

//update the result on the screen
function updateResult(res){
    resultText.textContent = res;
}

//update the object for the next operation
function updateObject(obj){
    obj.checkNumTwo = false;
    obj.checkOperate = false;
    obj.checkForFloat = false;
    obj.firstNum = calculator.result;
    obj.secondNum = "";
    obj.result = "";
}

function operation(){
    operate(calculator.firstNum, calculator.secondNum, calculator.operator);
    updateResult(calculator.result);
    updateObject(calculator);
}

function getNumber(){
    if(calculator.checkNumTwo){
        return calculator.secondNum;
    }
    else{
        return calculator.firstNum;
    }
}

function updateNumber(num){
    if(calculator.checkNumTwo){
        calculator.secondNum = num;
    }
    else{
        calculator.firstNum = num;
    }
}

//set numbers to first or second number in the object
function setNumbers(num){
    let number = getNumber();
    if(number.length == 19){
        return;
    }
    if(!calculator.printResult){
        if(!calculator.checkForFloat && num === "."){      
            if(number == ""){
                number += "0.";
            }
            else{
                number += ".";
            }
            calculator.checkForFloat = true;
        }
        else{
            number += num;
        }
        updateNumber(number);
        updateResult(number);
    }
}

function setOperator(op){
    if (calculator.firstNum === "" && op === " - "){
        calculator.firstNum += "-";
        updateResult(calculator.firstNum);
        return;
    }

    else if(calculator.secondNum === "" && op === " - " && calculator.checkOperate){
        calculator.secondNum += "-";
        updateResult(calculator.secondNum);
        return;
    }

    if(calculator.firstNum != "" && calculator.checkOperate){
        operation();
        calculator.operator = op;
        calculator.checkNumTwo = true;
        calculator.printResult = false;
        calculator.checkOperate = true;
    }
    else{
            calculator.operator = op;
            calculator.checkNumTwo = true;
            calculator.checkOperate = true;
            calculator.checkForFloat = false;
            resultText.textContent = "0";
            calculator.printResult = false;
    }
}

function clear(){
    calculator.firstNum = "";
    calculator.operator = "";
    calculator.result = "";
    calculator.secondNum = "";
    calculator.checkNumTwo = false;
    calculator.checkOperate = false;
    calculator.checkForFloat = false;
    calculator.printResult = false;
    resultText.textContent = "0";
}

function backSpace(){
    let number = getNumber();
    if(!calculator.printResult){
            number = number.substring(0,number.length -1);
            if(number.length == 0){
                updateResult('0');
            }
            else{
                updateResult(number);
            }
        }
    updateNumber(number);
}

//add Event listneres to number buttons
numberButtons.forEach(number=>{
    number.addEventListener('click',()=>{
        if(number.textContent == " . "){
            setNumbers(".")
        }
        else{
            let int = parseInt(number.textContent);
            setNumbers(int);
        }
    });
})

//add Event listeners to operator buttons
operatorButtons.forEach(button =>{
    button.addEventListener("click", ()=>{
        if(button.textContent == " C "){
            clear();
        }
        else if(button.textContent == " B "){
            backSpace();
        }
        else if(button.textContent == " = "){
            operation();
        }
        else{
            setOperator(button.textContent);
        }
    });
})
