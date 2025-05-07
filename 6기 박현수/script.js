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

const $previousPreview = document.querySelector("[data-previous-preview]");
const $currentPreview = document.querySelector("[data-current-preview]");

// 숫자 선택
$numbers.forEach(($number) => {
    $number.addEventListener("click", (e) => {
        console.log(e.target.innerHTML);
    });
});

// 연산자 선택택
$operations.forEach(($operation) => {
    $operation.addEventListener("click", (e) => {
        console.log(e.target.innerHTML);
    });
});
