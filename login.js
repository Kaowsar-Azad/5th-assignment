document.getElementById('btn-button').addEventListener('click', function(){

    const inputNumber = document.getElementById('input-number');
    const number = inputNumber.value;

    const inputCode = document.getElementById('input-code');
    const pin = inputCode.value;

    if (number === 'admin' && pin === 'admin123'){
        
        window.location.assign("./main.html")
    } else {
        alert('login Failed');
    }

});