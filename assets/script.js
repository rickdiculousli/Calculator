
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


function Node(value, isOp = false){
	this.value =value;
	this.children=[];
	this.isOp =isOp;
	this.addChild = function(node) {
		this.children[this.children.length] = node;
	}
}

function opRecur(node){
	console.log(node);
	if(node.children.length === 0 ) return Number(node.value);

	return operate(
					node.value,
					opRecur(node.children[0]),
					opRecur(node.children[1])
					);
	


}




function doLogic(array){
	// parse in array of Strings: [number, operator[,...]]
	let rootNode = null;
	let currNode = null;
	let tempNode = null;
	array.forEach(element => {
		// if(rootNode === null) {
		// 	rootNode = new Node(element);
		// 	currNode = rootNode;
		// };

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

//DOM ELEMENT VARS
const numsArray =  Array.from(document.querySelectorAll('.digit'));
const opsArray = Array.from(document.querySelectorAll('.op'));
const display = document.querySelector('.display');
const equalsB = document.querySelector('.eq');
const clrB = document.querySelector('.clr')

//LOGIC AND DISPLAY VARS
let displayTxt = '';
let inputStr = '';
let logicArray =[];  // Array of Strings!

//EVENT HANDLING
numsArray.forEach( button => button.addEventListener('click', (e) => {
	console.log("pressed: " + e.target.value);

	inputStr = inputStr + e.target.value;

	displayTxt = displayTxt + e.target.value;
	display.textContent = displayTxt;
}));

opsArray.forEach( button => button.addEventListener('click', (e) => {
	console.log("pressed: " + e.target.value);

	logicArray[logicArray.length] = inputStr;
	logicArray[logicArray.length] = e.target.value;
	inputStr = '';

	displayTxt = displayTxt + e.target.textContent;
	display.textContent = displayTxt;
}));

equalsB.addEventListener('click', (e) => {
	console.log("pressed: " + e.target.value);

	logicArray[logicArray.length] = inputStr;
	inputStr = '';

	display.textContent = doLogic(logicArray);
});


 



