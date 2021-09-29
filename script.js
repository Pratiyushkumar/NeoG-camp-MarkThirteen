function reverseString(str) {
  return str.split("").reverse().join("");
}

function isPalindrome(str) {
  let str2 = reverseString(str);
  return str === str2;
}

function convertNumberToString(date) {
  let dateStr = { day: "", month: "", year: "" };

  if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }
  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }
  dateStr.year = date.year.toString();
  return dateStr;
}

function getAllDateFormats(date) {
  let ddmmyyyy = date.day + date.month + date.year;
  let mmddyyyy = date.month + date.day + date.year;
  let yyyymmdd = date.year + date.month + date.day;
  let ddmmyy = date.day + date.month + date.year.slice(-2);
  let mmddyy = date.month + date.day + date.year.slice(-2);
  let yymmdd = date.year.slice(-2) + date.month + date.day;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}

function checkPalindrome(date) {
  let listofPalindrome = getAllDateFormats(date);
  let palindromeArr = [];
  for (let i = 0; i < listofPalindrome.length; i++) {
    var result = isPalindrome(listofPalindrome[i]);
    palindromeArr.push(result);
  }
  return palindromeArr;
}

function isLeapYear(year) {
  if (year % 400 === 0) {
    return true;
  }
  if (year % 100 === 0) {
    return false;
  }
  if (year % 4 === 0) {
    return true;
  }
}

function getNextDate(date) {
  let day = date.day + 1;
  let month = date.month;
  let year = date.year;

  let maxDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // is month a febuary
  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > maxDate[month - 1]) {
      day = 1;
      month = month + 1;
    }
  }
  if (month > 12) {
    month = 1;
    year++;
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextDatePalindrome(date) {
  let nextDate = getNextDate(date);
  let counter = 0;
  while (1) {
    counter++;
    let dateStr = convertNumberToString(nextDate);
    let dateList = checkPalindrome(dateStr);
    for (let i = 0; i < dateList.length; i++) {
      if (dateList[i]) {
        return [counter, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function previousDate(date) {
  let day = date.day - 1;
  let month = date.month;
  let year = date.year;

  let maxDate = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;
    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = maxDate[month - 1];
    }
  }
  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  let prevDate = previousDate(date);
  let counter = 0;
  while (1) {
    counter++;
    let dateStr = convertNumberToString(prevDate);
    let dateList = checkPalindrome(dateStr);
    for (let i = 0; i < dateList.length; i++) {
      if (dateList[i]) {
        return [counter, prevDate];
      }
    }
    prevDate = previousDate(prevDate);
  }
}

const dateInput = document.querySelector("#dateOfBirth");
const btnClick = document.querySelector(".btn-click");
const output = document.querySelector(".output");

btnClick.addEventListener("click", () => {
  clickHandler();
});

function clickHandler(e) {
  let bday = dateInput.value;
  if (bday !== "") {
    let splitedBday = bday.split("-");
    let date = {
      day: Number(splitedBday[2]),
      month: Number(splitedBday[1]),
      year: Number(splitedBday[0]),
    };
    var dateStr = convertNumberToString(date);
    console.log(dateStr);
    var dateFormats = checkPalindrome(dateStr);
    console.log("date format", dateFormats);
    var found = false;
    for (let i = 0; i < dateFormats.length; i++) {
      if (dateFormats[i]) {
        found = true;
        break;
      }
    }
    if (!found) {
      console.log("found");
      const [counter1, nextDate] = getNextDatePalindrome(date);
      const [counter2, prevdate] = getPreviousPalindromeDate(date);
      if (counter1 > counter2) {
        output.innerText = `The Nearest pallindrome of your bday 
                                would be
                                ${prevdate.day}-${prevdate.month}-${prevdate.year} 
                                you missed it by ${counter2} days  `;
      } else {
        output.innerText = `The Nearest pallindrome of your bday 
                                would be
                                ${nextDate.day}-${nextDate.month}-${nextDate.year} 
                                you missed it by ${counter1} days  `;
      }
    } else {
      console.log("Not found");
      output.innerText = "Yay! you'r Bday is a pallindrome";
    }
  }
}
