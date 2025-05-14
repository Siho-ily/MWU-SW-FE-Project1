// [6기 박현수 / 진행중] 계산기 앱 만들기
class Calculator {
    $previousPreviewPrompt = "";
    $currentPreviewPrompt = "";
    previousOperation = "";
    currentOperation = "";

    // {expression : string, result: int}
    history = [];

    constructor($previousPreview, $currentPreview) {
        this.$previousPreviewPrompt = $previousPreview;
        this.$currentPreviewPrompt = $currentPreview;
    }

    onPressNumber(number) {
        let str = this.$currentPreviewPrompt.textContent;
        if (str == "0" && number == "0") return;
        else if (str.includes(".") && number == ".") return;
        else if (str == "" && number == ".") str += "0.";
        else if (str == "0" && number != "." && number != "0") str = number;
        else str += number;

        this.$currentPreviewPrompt.textContent = str;
    }

    onPressOperation(operation) {
        let pre_str = this.$previousPreviewPrompt.textContent;
        if (
            "+-*÷^".includes(pre_str[pre_str.length - 1]) &&
            this.$currentPreviewPrompt.textContent == ""
        ) {
            this.$previousPreviewPrompt.textContent =
                pre_str.slice(0, pre_str.length - 1) + operation;
            return;
        }
        this.$previousPreviewPrompt.textContent +=
            " " + this.$currentPreviewPrompt.textContent + " " + operation;
        this.$currentPreviewPrompt.textContent = "";
    }

    infixToPostfix(expression) {
        const output = [];
        const stack = [];

        const precedence = {
            "+": 1,
            "-": 1,
            "*": 2,
            "/": 2,
        };

        const isOperator = (token) => "+-*÷^".includes(token);
        const isOperand = (token) => /^[0-9]+(\.[0-9]+)?$/.test(token);

        const tokens = expression.match(/(\d+(\.\d+)?)|[()+\-*÷\/]/g);

        for (let token of tokens) {
            if (isOperand(token)) {
                output.push(token);
            } else if (token === "(") {
                stack.push(token);
            } else if (token === ")") {
                while (stack.length && stack[stack.length - 1] !== "(") {
                    output.push(stack.pop());
                }
                stack.pop(); // '(' 제거
            } else if (isOperator(token)) {
                while (
                    stack.length &&
                    isOperator(stack[stack.length - 1]) &&
                    precedence[stack[stack.length - 1]] >= precedence[token]
                ) {
                    output.push(stack.pop());
                }
                stack.push(token);
            }
        }

        while (stack.length) {
            output.push(stack.pop());
        }

        return output;
    }

    onEqual() {
        let currentInput = this.$currentPreviewPrompt.textContent.trim();
        let prevInput = this.$previousPreviewPrompt.textContent.trim();

        // 현재 입력값이 있을 경우 이어 붙이기, 없으면 기존 연산자 지우기
        if (currentInput != "") {
            prevInput += (prevInput == "" ? "" : " ") + currentInput;
        } else {
            if (prevInput == "") return;
            prevInput = prevInput.slice(0, prevInput.length - 1);
        }

        // 후위 표기법으로 변환
        const fullExpression = prevInput.replace(/\s+/g, "");
        const postCalculation = this.infixToPostfix(fullExpression);

        // 후위 표기법 계산
        let stack = [];

        for (let token of postCalculation) {
            if (!isNaN(parseFloat(token))) {
                stack.push(parseFloat(token));
            } else {
                const b = stack.pop();
                const a = stack.pop();
                let result = 0;

                switch (token) {
                    case "+":
                        result = a + b;
                        break;
                    case "-":
                        result = a - b;
                        break;
                    case "*":
                        result = a * b;
                        break;
                    case "÷":
                        if (b === 0) {
                            alert("0으로 나눌 수 없습니다.");
                            return;
                        }
                        result = a / b;
                        break;
                    default:
                        alert("알 수 없는 연산자: " + token);
                        return;
                }

                stack.push(Math.round(result * 10 ** 6) / 10 ** 6);
            }
        }

        const finalResult = stack.pop();

        // 히스토리 추가
        this.addHistory(prevInput, finalResult);

        // 이전 프롬프트 초기화
        this.onReset();

        // 결과를 현재 프롬프트에 표시
        this.$currentPreviewPrompt.textContent = finalResult;
    }

    onReset() {
        this.$previousPreviewPrompt.textContent = "";
        this.$currentPreviewPrompt.textContent = "";
        this.previousOperation = "";
        this.currentOperation = "";
    }

    onDelete() {
        this.$currentPreviewPrompt.textContent = "";
    }

    addHistory(expression, result) {
        // 히스토리 추가 코드
        let $node = document.createElement("div");
        $historyList.appendChild($node);
        $node.classList.add("node");

        $node.innerHTML = `
            <div class="expression">${expression}</div>
            <div class="result">${result}</div>
        `;
    }
}

// 연산자
const $plus = document.querySelector("[data-btn-plus]");
const $minus = document.querySelector("[data-btn-minus]");
const $multiply = document.querySelector("[data-btn-multiply]");
const $divide = document.querySelector("[data-btn-divide]");
const $eqaul = document.querySelector("[data-btn-eqaul]");

// AC, DEL
const $reset = document.querySelector("[data-btn-reset]");
const $delete = document.querySelector("[data-btn-delete]");

// history
const $history = document.querySelector("[data-btn-history]");
const $historyList = document.querySelector(".history");

// 숫자
const $numbers = document.querySelectorAll("[data-btn-number]");
const $operations = document.querySelectorAll("[data-btn-operation]");

// 프롬프트
const $previousPreview = document.querySelector("[data-previous-preview]");
const $currentPreview = document.querySelector("[data-current-preview]");

// 숫자 선택
$numbers.forEach(($number) => {
    $number.addEventListener("click", (e) => {
        calc.onPressNumber(e.target.textContent);
    });
});

// 연산자 선택
$operations.forEach(($operation) => {
    $operation.addEventListener("click", (e) => {
        if (e.target.textContent.trim() == "=") {
            calc.onEqual();
        } else {
            calc.onPressOperation($operation.textContent);
        }
    });
});

$reset.addEventListener("click", (e) => {
    calc.onReset();
});

$delete.addEventListener("click", (e) => {
    calc.onDelete();
});

$history.addEventListener("click", (e) => {
    console.log("history 누름");
    // $historyList 토글 코드 작성 예정
    $historyList.classList.toggle("hidden");
});

// 객체 생성
const calc = new Calculator($previousPreview, $currentPreview);
