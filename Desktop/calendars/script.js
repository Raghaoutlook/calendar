    var d = new Date();
    var month_name = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    var month = d.getMonth();   
    var year = d.getFullYear(); 
    var first_date = month_name[month] + " " + 1 + " " + year;
    var tmp = new Date(first_date).toDateString();
    var first_day = tmp.substring(0, 3);   
    var day_name = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
    var day_no = day_name.indexOf(first_day);   
    var days = new Date(year, month+1, 0).getDate();    
    var presentMonth;

window.onload = function(){    
    var calendar = get_calendar(day_no, days);
    document.getElementById("calendar-month-year").innerHTML = month_name[month]+" "+year;
    document.getElementById("calendar-dates").appendChild(calendar);
    var presentDate = String(d.getDate());
    document.getElementById(presentDate).style.backgroundColor = "green";
    var dd = d.getDate();
    var mm = d.getMonth()+1; 
    if(dd<10){
        dd='0'+dd;
    }    
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+'/'+mm+'/'+year;
    document.getElementById("display-date").innerHTML = today;
    var table = document.getElementsByTagName("table");
    var cells = table[0].getElementsByTagName("td"); 
    for (var i = 0; i < cells.length; i++) { 
        if(cells[i].id !==""){
            cells[i].onclick = function(){
                displayDate(this);
            };     
        }
        
    }
}

function get_calendar(day_no, days){
    var table = document.createElement('table');
    var tr = document.createElement('tr');
    
    //row for the day letters
    for(var c=0; c<=6; c++){
        var td = document.createElement('td');
        td.innerHTML = "SMTWTFS"[c];
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //create 2nd row
    tr = document.createElement('tr');
    var c;
    for(c=0; c<=6; c++){
        if(c == day_no){
            break;
        }
        var td = document.createElement('td');
        td.innerHTML = "";
        tr.appendChild(td);
    }
    
    var count = 1;
    for(; c<=6; c++){
        var td = document.createElement('td');        
        td.setAttribute('id',count);
        td.innerHTML = count;
        count++;
        tr.appendChild(td);
    }
    table.appendChild(tr);
    
    //rest of the date rows
    for(var r=3; r<=7; r++){
        tr = document.createElement('tr');
        for(var c=0; c<=6; c++){
            if(count > days){
                table.appendChild(tr);
                return table;
            }
            var td = document.createElement('td');            
            td.setAttribute('id',count);
            td.innerHTML = count;
            count++;
            tr.appendChild(td);
        }
        table.appendChild(tr);        
    }
    return table;
}

function setPresentEvent(monthNumber){
    presentMonth =  monthNumber;
}

function getPresentEvent(){
    if(presentMonth){
       return presentMonth; 
    }
    else{
        return d.getMonth();
    }
}

function displayDate(vm){
    var dd = vm.innerText;
    var mm = getPresentEvent()+1; 
    if(dd<10){
        dd='0'+dd;
    }    
    if(mm<10){
        mm='0'+mm;
    } 
    var today = dd+'/'+mm+'/'+year;
    document.getElementById("display-date").innerHTML=today; 
    var table = document.getElementsByTagName("table");
    var cells = table[0].getElementsByTagName("td"); 
    for (var i = 0; i < cells.length; i++) { 
        if(cells[i].style.border !==""){
            cells[i].removeAttribute("style");
        }        
    } 
    document.getElementById(vm.innerText).style.border = "2px solid green";
}


function prevMonth(){
    document.getElementById("display-date").innerHTML='';   
    var prevmontFirstDate = new Date(month_name[getPresentEvent()-1] + " " + 1 + " " + year).toDateString();
    prevday_no = day_name.indexOf(prevmontFirstDate.substring(0, 3));   
    preMonthDays = new Date(year, getPresentEvent(), 0).getDate();  

    var calendar = get_calendar(prevday_no, preMonthDays);
    document.getElementById("calendar-month-year").innerHTML = month_name[getPresentEvent()-1]+" "+year;
    document.getElementById("calendar-dates").parentNode.removeChild(document.getElementById("calendar-dates"));
    var p=document.createElement("div")
    p.setAttribute('id','calendar-dates');
    document.getElementById("calendar-container").appendChild(p);
    document.getElementById("calendar-dates").appendChild(calendar);
    month=getPresentEvent()-1;
    setPresentEvent(month);
    var table = document.getElementsByTagName("table");
    var cells = table[0].getElementsByTagName("td"); 
    for (var i = 0; i < cells.length; i++) { 
        if(cells[i].id !==""){
            cells[i].onclick = function(){
                displayDate(this);
            };     
        }
        
    }
}

function nextMonth(){  
    document.getElementById("display-date").innerHTML=''; 
    var nextmonthFirstDate = new Date(month_name[getPresentEvent()+1] + " " + 1 + " " + year).toDateString();
    nextday_no = day_name.indexOf(nextmonthFirstDate.substring(0, 3));   
    nextMonthDays = new Date(year, getPresentEvent()+1, 0).getDate();  

    var calendar = get_calendar(nextday_no, nextMonthDays);
    document.getElementById("calendar-month-year").innerHTML = month_name[getPresentEvent()+1]+" "+year;
    document.getElementById("calendar-dates").parentNode.removeChild(document.getElementById("calendar-dates"));
    var p=document.createElement("div")
    p.setAttribute('id','calendar-dates');
    document.getElementById("calendar-container").appendChild(p);
    document.getElementById("calendar-dates").appendChild(calendar);
    month=getPresentEvent()+1;
    setPresentEvent(month);
    var table = document.getElementsByTagName("table");
    var cells = table[0].getElementsByTagName("td"); 
    for (var i = 0; i < cells.length; i++) { 
        if(cells[i].id !==""){
            cells[i].onclick = function(){
                displayDate(this);
            };     
        }
        
    }
}