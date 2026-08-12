const box=document.getElementById("projects");
let projects=JSON.parse(localStorage.getItem("kai-projects")||"[]");

function render(){
  box.innerHTML="";
  if(!projects.length){box.innerHTML='<div class="card"><p style="color:#777">Noch keine Projekte.</p></div>';return}
  projects.forEach((p,i)=>{
    const el=document.createElement("div");el.className="card project";
    el.innerHTML=`<h2>${escapeHtml(p.name)}</h2><div class="meta">${escapeHtml(p.status)} · ${p.progress}%</div>
    <div class="bar"><div class="fill" style="width:${p.progress}%"></div></div>
    <div class="project-actions"><button data-i="${i}">Löschen</button></div>`;
    box.appendChild(el);
  });
  box.querySelectorAll("button").forEach(b=>b.onclick=()=>{projects.splice(+b.dataset.i,1);save()});
}
function save(){localStorage.setItem("kai-projects",JSON.stringify(projects));render()}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
document.getElementById("add").onclick=()=>{
 const name=document.getElementById("name").value.trim();
 if(!name)return;
 projects.push({name,status:document.getElementById("status").value,progress:Math.max(0,Math.min(100,+document.getElementById("progress").value||0))});
 document.getElementById("name").value="";document.getElementById("progress").value="";save();
};
render();