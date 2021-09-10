const bdayInput = document.querySelector("#birthday-input");
const showBtn = document.querySelector("#show-btn");
const output = document.querySelector("#result-output");
const loadingImage = document.querySelector('.img-display');

loadingImage.style.display = "none";

function showMessage(message){
output.innerText = message;
}

function showHideImage(showOrHide){
  loadingImage.style.display = showOrHide;
}

function reverseDate(str) {
  let reversedString = str.split("").reverse().join("");
  return reversedString;
}

function checkPalindrome(str) {
  return str === reverseDate(str);
}

function convertDateToString(date) {
  let dateInString = { day: "", month: "", year: "" };
  if (date.day < 10) {
    dateInString.day = "0" + date.day;
  } else {
    dateInString.day = date.day.toString();
  }

  if (date.month < 10) {
    dateInString.month = "0" + date.month;
  } else {
    dateInString.month = date.month.toString();
  }

  dateInString.year = date.year.toString();
  return dateInString;
}

function dateInAllVariations(date) {
  let ddmmyyyy = date.day + date.month + date.year;
  let mmddyyyy = date.month + date.day + date.year;
  let yyyymmdd = date.year + date.month + date.day;
  let ddmmyy = date.day + date.month + date.year.slice(-2);
  let mmddyy = date.month + date.day + date.year.slice(-2);
  let yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkPalindromeForAllDateVariations(date) {
  let dateFormatList = dateInAllVariations(date);
  let palindromeList = [];
  for (let i = 0; i < dateFormatList.length; i++) {
    let result = checkPalindrome(dateFormatList[i]);

    palindromeList.push(result);
  }
  return palindromeList;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 4 === 0) return true;

  if (year % 100 === 0) return false;

  return false;
}

function nextDate(date) {
  let nextDateCount = { day: "", month: "", year: "" };
  nextDateCount.day = date.day + 1;
  nextDateCount.month = date.month;
  nextDateCount.year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (nextDateCount.month === 2) {
    if (isLeapYear(nextDateCount.year)) {
      if (nextDateCount.day > 29) {
        nextDateCount.day = 1;
        nextDateCount.month = 3;
      }
    } else {
      if (nextDateCount.day > 28) {
        nextDateCount.day = 1;
        nextDateCount.month = 3;
      }
    }
  } else {
    if (nextDateCount.day > daysInMonth[nextDateCount.month - 1]) {
      nextDateCount.day = 1;
      nextDateCount.month++;
    }
  }

  if (nextDateCount.month > 12) {
    nextDateCount.month = 1;
    nextDateCount.year++;
  }

  return nextDateCount;
}
function getNextPalindromeDate(date) {
  let nextDateValue = nextDate(date);

  let nextDaysCounter = 0;
  while (1) {
    nextDaysCounter++;
    let nextDateString = convertDateToString(nextDateValue);
    let dateResultList = checkPalindromeForAllDateVariations(nextDateString);
   
    for (let i = 0; i < dateResultList.length; i++) {
      if (dateResultList[i]) {
        return [nextDaysCounter, nextDateString];
      }
    }
    nextDateValue = nextDate(nextDateValue);
  }
}
function prevDate(date) {
  let previousDateCount = { day: "", month: "", year: "" };
  previousDateCount.day = date.day - 1;
  previousDateCount.month = date.month;
  previousDateCount.year = date.year;

  const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (previousDateCount.day === 0) {
    previousDateCount.month--;

    if (previousDateCount.month === 0) {
      previousDateCount.month = 12;
      previousDateCount.day = 31;
      previousDateCount.year--;
    } else if (previousDateCount.month === 2) {
      if (isLeapYear(previousDateCount.year)) {
        previousDateCount.day = 29;
      } else {
        previousDateCount.day = 28;
      }
    } else {
      previousDateCount.day = daysInMonth[previousDateCount.month - 1];
    }
  }

  return previousDateCount;
}

function getPrevPalindromeDate(date) {
  let prevDateValue = prevDate(date);

  let prevDaysCounter = 0;
  while (1) {
    prevDaysCounter++;
    let prevDateString = convertDateToString(prevDateValue);
    let dateResultList = checkPalindromeForAllDateVariations(prevDateString);
    for (let i = 0; i < dateResultList.length; i++) {
      if (dateResultList[i]) {
        return [prevDaysCounter, prevDateString];
      }
    }
    prevDateValue = prevDate(prevDateValue);
  }
}

function clickHandler(e) {
  
  if(bdayInput.value){


    showHideImage('block');
    let message = 'we are calculating please wait';
    showMessage(message);

    setTimeout(() => {
       loadingImage.style.display = "none";
      let bdayStr = bdayInput.value;
       if (bdayStr !== "") {
         var date = bdayStr.split("-");
         let yyyy = date[0];
         let mm = date[1];
         let dd = date[2];
         var date = {
           day: Number(dd),
           month: Number(mm),
           year: Number(yyyy),
         };

         let dateStr = convertDateToString(date);
         let list = checkPalindromeForAllDateVariations(dateStr);

         let isPalindrome = false;

         for (let i = 0; i < list.length; i++) {
           if (list[i]) {
             isPalindrome = true;
             break;
           }
         }
         if (!isPalindrome) {
           const [prevDaysCounter, prevDate] = getPrevPalindromeDate(date);
          
           const [nextDaysCounter,nextDate] = getNextPalindromeDate(date);
          

           if (nextDaysCounter < prevDaysCounter) {
          
            let message = `The palindrome date nearer to your birthday is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${nextDaysCounter} days`;
            showMessage(message);
            
             
           } else {
           ;
            let message = `The palindrome date nearer to your birthday is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${prevDaysCounter} days`;
           

            showMessage(message)

           }
         } else {
          let message = "hey your birthday is palindrome";
          showMessage(message);
         }
       }
    }, 3000);
  }
}
showBtn.addEventListener("click", clickHandler);
