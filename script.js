var sor, oszlop, jatekter;
var leptet=0;
var matrix=[];

var iranyVektor=[[1,0],[-1,0],  //vizszintes
                 [0,-1],[0,1],  //függőleges
                 [1,-1],[-1,1],    //főátló
                 [1,1],[-1,-1] //mellékátló
                ];

function uresMatrix(){
    for(let i=0; i<sor;i++){
        let uressor=[];
        for(let j=0; j<oszlop;j++){
            uressor.push(0);
        }
        matrix.push(uressor);
    }
}

function reset(){
    var div = document.getElementById("kezelo");
    var but = document.createElement("button");
    but.innerHTML="Újraindít"
    but.type = "button"
    but.setAttribute("onclick","resets()")
    div.appendChild(but);
}
function resets(){
    window.location.reload();
}

function kattint(td) {
    if (td.innerHTML=="") {
        let jatekos;
        if  (leptet%2==0) {
            td.innerHTML="X";
            jatekos="X";
            matrix[td.dataset.sor][td.dataset.oszlop]="X";
        } else {
            td.innerHTML="O";
            jatekos="O";
            matrix[td.dataset.sor][td.dataset.oszlop]="O";
        }
        leptet++;
        for(let i = 0;i<iranyVektor.length;i+=2){
            if(megszamol(i,jatekos,Number(td.dataset.sor),Number(td.dataset.oszlop))+
                megszamol(i+1,jatekos,Number(td.dataset.sor), Number(td.dataset.oszlop))+1 == 5){
                console.log("Nyert az: "+jatekos);
                var h1 = document.getElementById("gyoz");
                h1.innerHTML = jatekos+" nyert";
                
            }
        }
        if(sor*oszlop == leptet){
            console.log("dontetlen")
        }
    }
}

function Matrixszelen(aktsor, aktoszlop){
    return aktsor<0 || aktsor>=sor || aktoszlop<0 || aktoszlop>=oszlop;
}

function jatekosVanE(aktsor,aktoszlop,jatekos){
    return matrix[aktsor][aktoszlop]==jatekos;
}

function megszamol(irany,jatekos,startx,starty){
    let db = 1;
    while(!Matrixszelen(startx+iranyVektor[irany][0]*db,starty+iranyVektor[irany][1]*db) &&
            jatekosVanE(startx+iranyVektor[irany][0]*db,starty+iranyVektor[irany][1]*db,jatekos)){
        db++;
    }
    return db-1;
}

function general(){
    matrix = [];
    sor=Number(document.getElementById("sor").value);
    oszlop=Number(document.getElementById("oszlop").value); 
    if(sor<5 || oszlop < 5){
        general();
    }
    else{
        jatekter=document.getElementById("jatekter");
        jatekter.innerHTML="";
        let table=document.createElement("table");
        uresMatrix();
        for (let i = 0; i < sor; i++) {
            let tr=document.createElement("tr");
            for (let j = 0; j < oszlop; j++) {
                let td=document.createElement("td");
                td.setAttribute("onclick","kattint(this)");
                td.dataset.sor=i;
                td.dataset.oszlop=j;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        jatekter.appendChild(table);        
    }
    reset();
}
