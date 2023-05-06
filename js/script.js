let numberButtons = document.querySelectorAll(".numbers");
let operatorButtons = document.querySelectorAll(".operators");
let resultText = document.querySelector("p");

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

//set numbers to first or second number in the object
function setNumbers(num){
    if(!calculator.printResult){
        if(calculator.checkNumTwo){
            if(calculator.secondNum.length < 20){
                if(num === "."){
                    if(!calculator.checkForFloat){
                        if(calculator.secondNum == ""){
                            calculator.secondNum += "0.";
                        }
                        else{
                            calculator.secondNum += ".";
                        }
                        calculator.checkForFloat = true;
                    }
                }
                else{
                    calculator.secondNum += num;
                }
                updateResult(calculator.secondNum);
            }
        }
        else{
            if(calculator.firstNum.length < 20){
                if(num === "."){
                    if(!calculator.checkForFloat){
                        if(calculator.firstNum == ""){
                            calculator.firstNum += "0.";
                        }
                        else{
                            calculator.firstNum += ".";
                        } 
                        calculator.checkForFloat = true;
                    }
                }
                else{
                    calculator.firstNum += num;
                }
                updateResult(calculator.firstNum);
            }
        }
    }
}

function setOperator(op){
    if(calculator.firstNum != ""){
        if(calculator.checkOperate){
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
    if(!calculator.printResult){
        if(calculator.checkNumTwo){
            calculator.secondNum = calculator.secondNum.substring(0,calculator.secondNum.length -1);
            if(calculator.secondNum.length == 0){
                updateResult('0');
            }
            else{
                updateResult(calculator.secondNum);
            }
        }
        else{
            calculator.firstNum = calculator.firstNum.substring(0,calculator.firstNum.length -1);
            if(calculator.firstNum.length == 0){
                updateResult('0');
            }
            else{
                updateResult(calculator.firstNum);
            }
        }
    }
}

//add Event listneres to number buttons
for(let i = 10; i >= 0; i--){
    numberButtons[i].addEventListener('click',()=>{
        if(i==10){
            setNumbers(".")
        }
        else{
            setNumbers(9-i);
        }
    })
};

//add Event listeners to operator buttons
for(let i = 0; i < 7; i++){
    operatorButtons[i].addEventListener("click", ()=>{
        if(i == 0){
            clear();
        }
        else if(i == 1){
            backSpace();
        }
        else if(i == 6){
            operation();
        }
        else{
            setOperator(operatorButtons[i].textContent);
        }
    })
}
