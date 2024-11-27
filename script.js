async function getQuote() {
  // Make API request to get quote and return data
  const API_KEY = "nbAbpl9YIV6vKrPrwR03uQ==iebZ8EkNNQ57Exee";
  const response = await fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: { "X-Api-Key": API_KEY },
    method: "GET",
    contentType: "application/json",
  });
  const data = await response.json();
  return data[0];
}
function homePageLoad() {
  const quoteTextEle = document.getElementById("quote-text");
  const authorEle = document.getElementById("author");
  const refreshEle = document.getElementById("refresh");

  refreshEle.addEventListener("click", () => {
    getQuote() // Calling getQuote function
      .then((res) => {
        quoteTextEle.innerHTML = res.quote;
        authorEle.innerHTML = "~ " + res.author;
      })
      .catch((error) => {
        console.log(error);
      });

  })

    getQuote() // Calling getQuote function
      .then((res) => {
        quoteTextEle.innerHTML = res.quote;
        authorEle.innerHTML = "~ " + res.author;
      })
      .catch((error) => {
        console.log(error);
      });

  setDates(); // Calling setDates function
}
function setDates() {
  // Gettind elements references
  const dateNumEle = document.getElementById("date-num");
  const dateDayEle = document.getElementById("date-day");
  const dateMonthEle = document.getElementById("date-month");
  const dateYearEle = document.getElementById("date-year");

  // Getting current date
  const dateNum = new Date().getDate();
  const dateDay = new Date().toLocaleDateString("en-US", { weekday: "long" });
  const dateMonth = new Date().toLocaleDateString("en-US", { month: "long" });
  const dateYear = new Date().getFullYear();

  // Displaying current date to DOM
  dateNumEle.innerHTML = dateNum;
  dateDayEle.innerHTML = dateDay;
  dateMonthEle.innerHTML = dateMonth;
  dateYearEle.innerHTML = dateYear;
  dateStoringFunction(dateNum, dateDay, dateMonth, dateYear);

}
function get(name) {
    return localStorage.getItem(name);
}
function set(name, value) {
    return localStorage.setItem(name, value);
}
function dateStoringFunction(dateNum, dateDay, dateMonth, dateYear) {
  if (!get("date") || !get("day") || !get("month") || !get("year")) {
      set("date", dateNum);
      set("day", dateDay);
      set("month", dateMonth);
      set("year", dateYear);
      set("tasks", JSON.stringify([]));
  }
  if (get("date") != dateNum || get("day") != dateDay || get("month") != dateMonth || get("year") != dateYear) {
      set("date", dateNum);
      set("day", dateDay);
      set("month", dateMonth);
      set("year", dateYear);
      set("tasks", JSON.stringify([]));
  }
}
// StopWatch related Fucntion
function stopWatch() {
    const hourEle = document.getElementById("hour");
    const minuteEle = document.getElementById("minute");
    const secondEle = document.getElementById("second");
    const startEle = document.getElementById("start");
    const stopEle = document.getElementById("stop");
    const resetEle = document.getElementById("reset");

    hourEle.innerHTML = "00";
    minuteEle.innerHTML = "00";
    secondEle.innerHTML = "00";

    let timer = false;
    let count = 0;
    let second = 0;
    let hour = 0;
    let minute = 0;

    startEle.addEventListener("click", () => {
        timer = true
        handleCalculateTime();
    });
    stopEle.addEventListener("click", () => {
        timer = false;
    });
    resetEle.addEventListener("click", () => {
        clearInterval(timer);
        timer = false;
        count = 0;
        second = 0;
        hour = 0;
        minute = 0;
        hourEle.innerHTML = "00";
        minuteEle.innerHTML = "00";
        secondEle.innerHTML = "00";
    });


    function handleCalculateTime() {
        if (timer){
            count++;
            if (count == 100) {
                second++;
                count = 0;
            }
            if (second == 60) {
                minute++;
                second = 0;
            }
            if (minute == 60) {
                hour++;
                minute = 0;
            }
            let hrString = hour;
            let minString = minute;
            let secString = second;
            let countString = count;
    
            if (hour < 10) {
                hrString = "0" + hrString;
            }
    
            if (minute < 10) {
                minString = "0" + minString;
            }
    
            if (second < 10) {
                secString = "0" + secString;
            }
    
            if (count < 10) {
                countString = "0" + countString;
            }
            hourEle.innerHTML = hrString;
            minuteEle.innerHTML = minString;
            secondEle.innerHTML = secString;
            setTimeout(handleCalculateTime, 10);
    }
} 
}


function taskHandle() {
    const taskInputEle = document.getElementById("task-input");
    const submitBtn = document.getElementById("submit");
    submitBtn.addEventListener("click", () => {
        const taskValue = taskInputEle.value;
        const newId = "id" + Math.random().toString(16).slice(2)
        if (taskValue && taskValue.trim() != "") {
            const taskObj = {
                isCompleted: false,
                isInProgress: false,
                isNew: true,
                id: newId,
                value: taskValue
            }
            const tasksList = JSON.parse(get("tasks"));
            tasksList.unshift(taskObj)
            set("tasks", JSON.stringify(tasksList))
            taskInputEle.value = "";
        }
        fetchTask();
    })
    const newTaskEle = document.querySelector(".newly-created");
    const progressTaskEle = document.querySelector(".progress");
    const completedTaskEle = document.querySelector(".completed");
    function fetchTask() {
        newTaskEle.innerHTML = "";
        progressTaskEle.innerHTML = "";
        completedTaskEle.innerHTML = "";

        const taskList = JSON.parse(get("tasks"));
        console.log(taskList);
        taskList.forEach((task) => {
            if (task.isCompleted) {
                let div = document.createElement("div");
                div.classList.add('taskCompleted')

                let span = document.createElement("span");
                span.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="30" fill="red"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/></svg>'
                span.id = task.id + "-delete"

                span.addEventListener('click', ()=>{ manupilateData(task.id, 'delete') })

                let p = document.createElement("p");
                p.innerHTML = task.value;

                div.appendChild(span); 
                div.appendChild(p)

                completedTaskEle.append(div)
            }
            if (task.isNew) {
                let div = document.createElement("div");
                div.classList.add('tasknew')

                let span = document.createElement("span");
                span.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="35" fill="green"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>'
                span.id = task.id + "-complete"
                span.addEventListener('click', ()=>{ manupilateData(task.id, 'complete') })

                let span2 = document.createElement("span");
                span2.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width="35" fill="blue"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M208 64a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zM9.8 214.8c5.1-12.2 19.1-18 31.4-12.9L60.7 210l22.9-38.1C99.9 144.6 129.3 128 161 128c51.4 0 97 32.9 113.3 81.7l34.6 103.7 79.3 33.1 34.2-45.6c6.4-8.5 16.6-13.3 27.2-12.8s20.3 6.4 25.8 15.5l96 160c5.9 9.9 6.1 22.2 .4 32.2s-16.3 16.2-27.8 16.2l-256 0c-11.1 0-21.4-5.7-27.2-15.2s-6.4-21.2-1.4-31.1l16-32c5.4-10.8 16.5-17.7 28.6-17.7l32 0 22.5-30L22.8 246.2c-12.2-5.1-18-19.1-12.9-31.4zm82.8 91.8l112 48c11.8 5 19.4 16.6 19.4 29.4l0 96c0 17.7-14.3 32-32 32s-32-14.3-32-32l0-74.9-60.6-26-37 111c-5.6 16.8-23.7 25.8-40.5 20.2S-3.9 486.6 1.6 469.9l48-144 11-33 32 13.7z"/></svg>'
                span2.id = task.id + "-progress"
                span2.addEventListener('click', () => { manupilateData(task.id, 'progress') })

                let p = document.createElement("p");
                p.innerHTML = task.value;

                div.appendChild(span); 
                div.appendChild(span2); 
                div.appendChild(p)

                newTaskEle.append(div)
            }
            if (task.isInProgress) {
                let div = document.createElement("div");
                div.classList.add('taskProgress')

                let span = document.createElement("span");
                span.innerHTML = ' <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="35" fill="green"><!--!Font Awesome Free 6.7.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>'
                span.id = task.id + "-complete"

                span.addEventListener('click', () => { manupilateData(task.id, 'complete') })

                let p = document.createElement("p");
                p.innerHTML = task.value;

                div.appendChild(span); 
                div.appendChild(p)

                progressTaskEle.append(div)
            }
        })
    }
    function manupilateData(id, type){
        let taskList = JSON.parse(get("tasks"))
        if (type != "delete") {

            taskList.forEach((task)=> {
                if(task.id == id) {
                    if (type == 'complete') {
                        task.isCompleted = true;
                        task.isNew = false;
                        task.isInProgress = false; 
                    }
                    if (type == 'progress') {
                        task.isCompleted = false;
                        task.isNew = false;
                        task.isInProgress = true; 
                    }
                }
            })
        }else {
            taskList = taskList.filter((task) => task.id != id)
        }

        set("tasks", JSON.stringify(taskList))
        fetchTask();
    }
    fetchTask();
}

// Main function
function main() {
  homePageLoad();
  stopWatch();
  taskHandle();
}

// DOM CONTENT LOADED
document.addEventListener("DOMContentLoaded", () => {
  main();
});
