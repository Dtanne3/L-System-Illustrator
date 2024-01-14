import {turtle} from "./turtle.js";

//html
const gen = document.getElementById("gen")
const addBtn = document.getElementById("add");
const listContainer = document.getElementById("sListCtnr");
const sOutput = document.getElementById("sOutput");
const canvas = document.getElementById("board");
const ctx = canvas.getContext("2d");
const sysInputs = document.getElementById("inputs");

//default variable values
const PI = Math.PI;
const maxSblInputs = 10;
var curSblInputs = 0;
var specialSymbols = {"+" : 1, "-" : 2, "[" : 3, "]" : 4};
var ignoreList = [];
var startingAngle = 90;
var turningAngles = [90, 90];
var startX = 300, startY = 300;
var str = "";
var lineLength = 10;
const pencil = new turtle(ctx);

//functions
function checkInputs()
{
    var inputLst = sysInputs.getElementsByTagName("input");
    for(var i = 0; i < inputLst.length; i++)
    {
        if(inputLst[i].value = "")
        {
            return false;
        }
    }
    return true;
}

function removeSymbolInput()
{
    this.parentElement.remove();
    curSblInputs -= 1;
}
function addSymbolInput(e)
{
    if(curSblInputs != maxSblInputs)
    {
        curSblInputs += 1;
        const symbol = document.createElement("input");
        symbol.type = "text";
        symbol.size = 3;
        symbol.maxLength = 1;
        symbol.placeholder = "Symbol"
        symbol.id = "symbol"
        symbol.value = symbol.value.toUpperCase();

        const rule = document.createElement("input");
        rule.type = "text";
        rule.size = 5;
        rule.maxLength = 50;
        rule.placeholder = "Rule"
        rule.id = "rule"
        rule.value = rule.value.toUpperCase();

        const isDraw = document.createElement("select");
        isDraw.id = "isDraw";
        isDraw.size = 1;
        const opt1 = document.createElement("option");
        opt1.value = true;
        opt1.text = "Read";
        const opt2 = document.createElement("option");
        opt2.value = false;
        opt2.text = "Ignore";

        const rmvBtn = document.createElement("a");
        rmvBtn.className = "btn delete";
        rmvBtn.innerHTML = "&times";
        rmvBtn.addEventListener('click', removeSymbolInput, false);
       

        const row = document.createElement("div");
        row.className = "ctntRow";

        listContainer.appendChild(row);
        row.appendChild(symbol);
        row.appendChild(rule);
        row.appendChild(isDraw);
        isDraw.appendChild(opt1);
        isDraw.appendChild(opt2);
        row.appendChild(rmvBtn);
    }
}

function generateLString()
{
    var axiom = document.getElementById("axiom").value;
    const itr = document.getElementById("itr").value;
    const listInputs = document.getElementById("sListCtnr").getElementsByClassName("ctntRow");
    var ruleSet = {};
    var storedString = "";

    if(curSblInputs == 0)
    {
        sOutput.value = "";
    }
    else
    {
        //create symbol set
        for(var i = 0; i < listInputs.length; i++)
        {
            var s = listInputs[i].querySelector("#symbol").value;
            var r = listInputs[i].querySelector("#rule").value;
            ruleSet[s] = r;
            if(listInputs[i].querySelector("#isDraw").value == false)
            {
                ignoreList.push(s);
            }
        }
        //generate string
        storedString = axiom;        
        for(var i = 0; i < itr; i+=1)
        {
            storedString = rewrite(storedString,ruleSet);
        }
    }
        //output string
        sOutput.value = storedString;
        return storedString;
}

function rewrite(str, rSet)
{
    var newStr = "";
    for(var i = 0; i < str.length; i++)
    {
        if(rSet[str[i]] != undefined)
        {
            newStr += rSet[str[i]];
        }
        else
        {
            newStr += str[i];
        }
    }
    return newStr;
    
}
function setUp()
{
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear the canvas
    ctx.beginPath();
    str = generateLString();
    //check for empty inputs & set default values
    if(document.getElementById("linelength").value != "")
    {
        lineLength = document.getElementById("linelength").value;
    }
    if(document.getElementById("stAngle").value != "")
    {
        startingAngle = document.getElementById("stAngle").value;
    }
    if(document.getElementById("rtDegree").value != "")
    {
        turningAngles[0] = document.getElementById("rtDegree").value;
    }
    if(document.getElementById("ltDegree").value != "")
    {
        turningAngles[1] = document.getElementById("ltDegree").value;
    }
    if(document.getElementById("xPoint").value != "")
    {
        startX = document.getElementById("xPoint").value;
    }
    if(document.getElementById("yPoint").value != "")
    {
        startY = document.getElementById("yPoint").value;
    }
    
    
    pencil.setLocation(startX, startY);
    pencil.setLineLength(lineLength);
    pencil.setAngle(startingAngle);
}

function drawLSString(e)
{
    setUp()
    //String interpreter
    for(var i = 0; i < str.length; i++)
    {
        if (specialSymbols[str[i]] == undefined && ignoreList.includes(str[i]) != true)
        {
            //draw forward
            pencil.forward();
        }
        else //char is a special symbol
        {
            switch(specialSymbols[str[i]])
            {
                case 1: //rotate right
                    pencil.turn(turningAngles[0] * -1);
                    break;
                case 2: //rotate left
                    pencil.turn(turningAngles[1]);
                    break;
                case 3: //save location
                    pencil.save();
                    break;
                case 4: //reload location
                    pencil.recall();
                    break;
            }
        }
    }
}




//Events
addBtn.addEventListener('click', addSymbolInput);
gen.addEventListener('click', drawLSString);

/*
bug list:
    - illustration of first iteration not showing
    - line not showing if rule has one character
*/