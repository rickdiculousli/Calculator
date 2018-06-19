
// Browser Tests
/*
*console.log(add(1,-3));
*console.log(subtract(3,1));
*console.log(subtract(1,3));
*console.log(subtract(1,-3));
*console.log(multiply(3,7));
*console.log(multiply(3,-7));
*console.log(divide(10,5));
*console.log(divide(10,3));
*console.log(divide(10,-5));
*console.log(divide(-10,5));
*console.log('END');
*/

//OPERATIONS
function add(a, b){
	return a + b;
}

function subtract(a, b) {				
	return a -b;
}

function multiply(a, b){
	return a * b;
}

function divide(dend, dvsr){
	return dend/dvsr;
}

const operate = (f, a, b) => f(a ,b);

// Aritmetic Tree Node implementation.
function Node(value, isOp = false){
	this.value =value;
	this.children=[];
	this.isOp =isOp;
	this.addChild = function(node) {
		this.children[this.children.length] = node;
	}
}

// Recursive solving of all Arithmetic by nodes.
function opRecur(node){
	console.log(node);
	
	if(node.children.length === 0 ) return Number(node.value);

	return operate(
					node.value,
					opRecur(node.children[0]),
					opRecur(node.children[1])
					);
}

// Main calculation function
function doLogic(array){
	// parse in array of Strings: [number, operator[,...]]
	let rootNode = null;
	let currNode = null;
	let tempNode = null;

	// check for divide by 0
	let indexDiv = array.indexOf('/');
	if(indexDiv != -1 && array[indexDiv + 1] === '0') return "DIV BY ZERO!";

	// Make add&sub nodes general (towards root), mul&div nodes specific (towards leaf)
	array.forEach(element => {
		switch(element){
			case '+':
				tempNode = new Node(add, true);
				tempNode.addChild(rootNode);
				rootNode = tempNode;
				currNode = rootNode;
				break;
			case '-':
				tempNode = new Node(subtract, true);
				tempNode.addChild(rootNode);
				rootNode = tempNode;
				currNode = rootNode;
				break;
			case '*':
				currNode.addChild(new Node(currNode.value));
				currNode.value = multiply;
				currNode.isOp = true;
				break;
			case '/':
				currNode.addChild(new Node(currNode.value));
				currNode.value = divide;
				currNode.isOp = true;
				break;
			default:
				tempNode = new Node(element);
				if(rootNode === null){
					rootNode = tempNode;
					currNode = rootNode;
				}else{
					currNode.addChild(tempNode);
					currNode = tempNode;
				}
		}

	});

	return opRecur(rootNode);

}

//DOM ELEMENT VARIABLES
const numsArray =  Array.from(document.querySelectorAll('.digit'));
const opsArray = Array.from(document.querySelectorAll('.op'));
const display = document.querySelector('.display');
const equalsB = document.querySelector('.eq');
const clrB = document.querySelector('.clr')

//LOGIC AND DISPLAY VARIABLES
let displayTxt = '';
let inputStr = '';
let logicArray =[];  // Array of Strings!
let flushScreen = false;
let dotFlag= false;  // has decimal point or not.
//Take in String and output as desired onto screen
function displayScreen(txt, reset = false){
	
	if(reset){
		dotFlag = false;
		flushScreen = true;
		displayTxt = txt.toString();
		
		//reset only deals with clear and result. Result needs trimming.
		if(displayTxt.length > 9 && displayTxt.search(/\./) != -1){
			let roundTo = 8 - displayTxt.search(/\./);
			displayTxt = Number(displayTxt).toFixed(roundTo);
		}

	} else {
		if(flushScreen){
			displayTxt = '';
			flushScreen = false;
		}
		displayTxt = displayTxt + txt;}
	
	display.textContent = displayTxt;
}



//EVENT HANDLING
numsArray.forEach( button => button.addEventListener('click', (e) => {
	console.log("pressed: " + e.target.value);

	// check for decimal point
	if(e.target.id === 'point'){
		if(dotFlag) return;

		dotFlag = true;
	};

	inputStr = inputStr + e.target.value;
	displayScreen(e.target.value);
}));

opsArray.forEach( button => button.addEventListener('click', (e) => {
	console.log("pressed: " + e.target.value);

	dotFlag = false;
	logicArray[logicArray.length] = inputStr;
	logicArray[logicArray.length] = e.target.value;
	inputStr = '';

	displayScreen(e.target.value);
}));

equalsB.addEventListener('click', (e) => {
	console.log("pressed: " + e.target.value);

	// only add to logic array if not empty. Else last input texting fails.
	if (inputStr != '') logicArray[logicArray.length] = inputStr;

	//Restrict processing if last input was operation;
	if(logicArray[logicArray.length -1].search(/[+\-*/]/) === -1){
		inputStr = '';
		displayScreen(doLogic(logicArray), true);

	};
	
});

clrB.addEventListener('click', (e) =>{
	console.log("pressed: " + e.target.value);

	logicArray = [];
	inputStr = '';
	displayScreen('0', true);

});


 



