function updateClock(){
 const now=new Date();
 document.getElementById("time").textContent=now.toLocaleTimeString("de-DE");
 document.getElementById("date").textContent=now.toLocaleDateString("de-DE",{weekday:"long",day:"2-digit",month:"long",year:"numeric"});
}
updateClock();setInterval(updateClock,1000);
const notes=document.getElementById("notes");
notes.value=localStorage.getItem("kai-notes")||"";
notes.addEventListener("input",()=>localStorage.setItem("kai-notes",notes.value));
