document.getElementById('btn-button').addEventListener('click', function(){

    const inputNumber = document.getElementById('input-number');
    const number = inputNumber.value;

    const inputCode = document.getElementById('input-code');
    const pin = inputCode.value;

    if (number === '01234567890' && pin === '1234'){
        alert('login success');
        window.location.assign("/main.html")
    } else {
        alert('login Failed');
    }

});