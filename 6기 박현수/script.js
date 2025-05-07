// [6기 박현수 / 진행중] 계산기 앱 만들기
class Calculator {
    $previousPreviewPrompt = "";
    $currentPreviewPrompt = "";
    previousOperation = "";
    currentOperation = "";

    constructor($previousPreview, $currentPreview) {
        this.$previousPreviewPrompt = $previousPreview;
        this.$currentPreviewPrompt = $currentPreview;
    }

    onPressNumber(number) {
        this.$currentPreviewPrompt.textContent += number;
    }

    onPressOperation(operation) {
        this.$previousPreviewPrompt.textContent +=
            " " + this.$currentPreviewPrompt.textContent + " " + operation;
        this.$currentPreviewPrompt.textContent = "";
    }

    onEqual() {
        let result = 0;
        if (this.previousOperation == "+") {
            result = this.handlePlus();
        } else if (this.previousOperation == "-") {
            result = this.handleMinus();
        } else if (this.previousOperation == "*") {
            result = this.handleMultiply();
        } else if (this.previousOperation == "/") {
            result = this.handleDivide();
        }
    }
    onReset() {
        this.$previousPreviewPrompt.textContent = "";
        this.$currentPreviewPrompt.textContent = "";
        this.previousOperation = "";
        this.currentOperation = "";
    }

    handlePlus() {}
    handleMinus() {}
    handleMultiply() {}
    handleDivide() {}
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

// 객체 생성
const calc = new Calculator($previousPreview, $currentPreview);
