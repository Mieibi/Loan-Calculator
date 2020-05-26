//UI Variable
const form = document.querySelector("#loan-form");

//add Listener
form.addEventListener('submit', calculate);

//Calculate Results
function calculate(e){
    
    //load gif amd calculations
    Loader();


    e.preventDefault();
}

//Gif Loader
function Loader(){
    const gif = document.querySelector(".load");
    gif.style.display = "block";
    document.querySelector(".result").style.display = "none";

    setTimeout(clearGif, 2000);
}

//Clear Gif and load calculations
function clearGif(){
    document.querySelector(".load").style.display = "none";

    const monthlyPayment = document.querySelector(".month-text");
    const totalPayment = document.querySelector(".total-text");
    const totalInterest = document.querySelector(".interest-text");

    if(monthlyPayment.textContent && totalPayment.textContent && totalInterest.textContent === ""){
        //show Calculations
        calculations();
    }
    else{
        monthlyPayment.textContent = "";
        totalPayment.textContent = "";
        totalInterest.textContent = "";

        //show Calculations
        calculations();
        
    }
    
    //show Calculations
    // calculations();
}

//Calculations
function calculations() {
    // UI Variables
    const amount = document.querySelector(".amount");
    const interestRate = document.querySelector(".rate");
    const time = document.querySelector(".time");
    const monthlyPayment = document.querySelector(".month-text");
    const totalPayment = document.querySelector(".total-text");
    const totalInterest = document.querySelector(".interest-text");

    // Values used to calculate
    const principal = parseFloat(amount.value);
    const calInterest = (parseFloat(interestRate.value) / 100) / 12;
    const calTime = parseFloat(time.value) * 12;

    //Monthly payment Calculation
    const x = Math.pow((1 + calInterest), calTime);
    const calMonth = (principal * x * calInterest) / (x - 1);

    //total payment calculation
    const calTotal = (calMonth * calTime).toFixed(2);

    //Total Interest
    const calTotalInterest = ((calMonth * calTime) - principal).toFixed(2);

    //creating value content for results
    const textMonth = document.createTextNode(calMonth.toFixed(2));
    const textTotal = document.createTextNode(calTotal);
    const textInterest = document.createTextNode(calTotalInterest);

    //Test for infinity
    testInfinity(calMonth, monthlyPayment, textMonth, totalPayment, textTotal, totalInterest, textInterest);
}

//Test for infinity
function testInfinity(calMonth, monthlyPayment, textMonth, totalPayment, textTotal, totalInterest, textInterest) {
    if (isFinite(calMonth)) {
        //adding values to fields
        monthlyPayment.appendChild(textMonth);
        totalPayment.appendChild(textTotal);
        totalInterest.appendChild(textInterest);
        document.querySelector(".result").style.display = "block";
    }
    else {
        document.querySelector(".alert").style.display = "block";

        //clear error 
        setTimeout(clearError, 3000);
    }
}

//clear error
function clearError(){
    document.querySelector(".alert").style.display = "none";
}
