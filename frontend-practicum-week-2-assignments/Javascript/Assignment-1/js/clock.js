const start = prompt("Lütfen isminizi giriniz.");
document.querySelector("#myName").innerHTML = start;


function showTime(){
    const today=new Date();
    let hour=today.getHours();
    let minute=today.getMinutes();
    let second=today.getSeconds();
    let day=today.getDay();
 
    const daysName=["PAZARTESİ", "SALI", "ÇARŞAMBA", "PERŞEMBE","CUMA", "CUMARTESİ", "PAZAR"]

    document.querySelector("#myClock").innerHTML=hour + ":" + minute + ":" +second + "  " + daysName[day-1] ;
    setTimeout(showTime, 1000);
}
showTime();