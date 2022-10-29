const curDate = document.getElementById('date');
let weathercon = document.getElementsByClassName('weathercon');
const tempStatus = '{%tempstatus%}';
if (tempStatus === 'Sunny') {
    weathercon.innerHTML = "<i class='fa-solid fa-sun' style='color: #eccc68'></i>"
} else if (tempStatus === 'Clouds') {
    weathercon.innerHTML = "<i class='fa-solid fa-cloud' style='color: #f1f2f6'></i>"
} else if (tempStatus === 'Rainy') {
    weathercon.innerHTML = "<i class='fa-solid fa-rain' style='color: #a4b0be'></i>"
} else {
    weathercon.innerHTML = "<i class='fa-solid fa-cloud' style='color: #44c3de'></i>"
}

const getCurrentDay = () => {
    var weekday = new Array(7);
    weekday[0] = 'Sun ';
    weekday[1] = 'Mon';
    weekday[2] = 'Tues';
    weekday[3] = 'Wed';
    weekday[4] = 'Thurs';
    weekday[5] = 'Fri';
    weekday[6] = 'Sat';

    let currentTime = new Date();
    let day = weekday[currentTime.getDay()];
    return day;
};

const getCurrentTime = () => {
    var months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"]

    var now = new Date();
    var month = months[now.getMonth()];
    var date = now.getDate();

    let hours = now.getHours();
    let mins = now.getMinutes();
    let period = 'AM';

    if (hours > 11) {
        period = 'PM';
        if (hours > 12) hours -= 12;
    }
    if (mins < 10) mins = '0' + mins;

    return `${month} ${date} | ${hours}:${mins}${period}`;
};
curDate.innerText = getCurrentDay() + ' |' + getCurrentTime();