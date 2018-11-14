
var n = prompt('Please enter number for matrix');
var defaultColoredBoxes = prompt('Please enter number to be colored box');
var timeInterval = prompt('Please enter time interval to be auto colored');
var wrapper = document.querySelector('ul');
wrapper.style.width = n*100 + 'px';

var n_numberArray = [
    
];

for(i = 0; i < n; i++){
    n_numberArray.push(Array.from(Array(n*1).map((x,i)=> x)).fill(1))
}

var totalBoxes = n*n;

var unColoredBoxes = totalBoxes - defaultColoredBoxes;


var counter = 1;
for(i = 0; i < n; i++){
    for( j = 0; j < n; j++){
        if(counter <= defaultColoredBoxes){
            cls = "item active";
        }else{
            cls = "item";
            n_numberArray[i][j] = 0;
        }
        var node = document.createElement("LI");  
        var textnode = document.createTextNode("");
        node.appendChild(textnode); 
        node.setAttribute('id',""+i+j) ;
        node.setAttribute('class',cls) ;
        node.setAttribute('data-val',n_numberArray[i][j]) ;     
        document.getElementById("myList").appendChild(node);
        
        counter++;
    }
}

function updateBoxColor(){
    for(i = 0; i < n; i++){
        for( j = 0; j < n; j++){
            if(n_numberArray[i][j] === 0){
                n_numberArray[i][j] = 1;
                var element = document.getElementById(`${i}${j}`);
                element.classList.add("active");
                element.setAttribute('data-val',1);
                unColoredBoxes--;
                console.log('coloredBoxes '+unColoredBoxes)
                console.log('totalBoxes '+totalBoxes)
                return;
            }
            
        }
    }
}

var ul = document.querySelector('items-group');

function checkGameStatus(){
   
    if(unColoredBoxes == totalBoxes){
        clearInterval(Interval);
        alert('yea , you won the game');
    }
    else if(unColoredBoxes == 0){
        alert('You lost the game');
        clearInterval(Interval);
    }
    else{
        updateBoxColor();
    }
}
var Interval = window.setInterval(checkGameStatus,timeInterval*1000);


   
document.getElementById("myList").onclick = function(event) {
    var target = getEventTarget(event);
    var elementId = target.getAttribute('id');
    var dVal = target.getAttribute('data-val');
    if(dVal == 1){
        arrPostion = elementId.toString().split("");
        var element = document.getElementById(target.getAttribute('id'));
        element.classList.remove("active");
        n_numberArray [arrPostion[0]][arrPostion[1]] = 0
        console.log(n_numberArray [arrPostion[0]][arrPostion[1]])
        unColoredBoxes++;
        if(unColoredBoxes == totalBoxes){
            clearInterval(Interval);
            alert('yea , you won the game');
        }
        else if(unColoredBoxes == 0){
            alert('You lost the game');
            clearInterval(Interval);
        }
    }
   
    
    
};

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

