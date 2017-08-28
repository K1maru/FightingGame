'use strict';
//SET the range of randomized EnemyStats here:
var enemyNames = ["Ryu", "Chen", "Jackie", "Admiral General Aladin", "Benny the Retard", "Robert the Cannon", "Daniel the Snake", "EK the Tornado", "Andureasu"];
var maximumHealthPossible = 40;
var maximumStrenghtPossible = 6;
var maximumDefPossible = 5;
var maximumLuckPossible = 5;

//Helpers for the Enemy AI
var lightAttackCount = 0;
var desperateAttackCount = 0;
var defenseCount = 0;

//Might be usefull in the future
var roundCount = 0;
var fightCount = 1;

//Need to store this somewhere
var enemy;
var keepOnFighting = false;

//need to move the MoveProperty into the Fighter Constructor
var yourMove;
var enemyMove;

function randomNumber() {
    return Math.random();
}

//this function only serves the purpose for the index of arraylengts to never be randomized to "-1"
function randomizerForArrays(arrayLength) {
    var i = Math.ceil(Math.random() * arrayLength - 1);
    return i;
}


var Fighter = function(name, hp, str, def, luck) {
    this.name = name,
    this.hp = hp,
    this.str = str,
    this.def = def,
    this.luck = luck
}

Fighter.prototype.scream = function () {
    window.alert('ble');
}

function whatIsYourName() {
    var name = window.prompt("What is the name of your Fighter?");
    
    if (!name) {
        do {
            name = window.prompt("Please name your Fighter.");
        } while (!name);
    }
    return name;
}

function enemyNameRandomizer() {
    return enemyNames[randomizerForArrays(enemyNames.length)];
}

function enemyHealthRandomizer() {
    var enemyHP = Math.round(Math.random() * maximumHealthPossible);
    while (enemyHP < (maximumHealthPossible / 2)) {
        enemyHP = Math.round(Math.random() * maximumHealthPossible) + 10;
    }
    return enemyHP + 10;
}

function enemyStrenghtRandomizer() {
    var enemyStrenght = Math.ceil(randomNumber() * maximumStrenghtPossible);
    if (enemyStrenght === 0){
        enemyStrenght = 1;
        return enemyStrenght;
    }
    else {
        return enemyStrenght;    
    }
}

function enemyLuckRandomizer() {
    var enemyLuck = Math.round(randomNumber() * maximumLuckPossible);
    return enemyLuck;
}

function enemyDefenseRandomizer() {
    var enemyDefense = Math.round(randomNumber() * maximumDefPossible);
    return enemyDefense;
}

function criticalHitRate(name, probability) {
    var critrate = randomNumber() * 100 + probability * randomNumber();
    if (critrate > 95) {
        window.alert("A critical hit from " + name + "! (x1.5 DMG)");
        return 2;
    } else {
        return 1;
    }
}

function callForEnemyAI() {
    
    if(defenseCount > lightAttackCount && defenseCount > desperateAttackCount) {
        enemyMove = "Light Attack"
        return enemyMove;
    }
    else if(lightAttackCount > defenseCount && lightAttackCount > desperateAttackCount) {
        enemyMove = "Desperate Attack";
        return enemyMove;
    }
    else if(desperateAttackCount > defenseCount && desperateAttackCount > lightAttackCount) {
        enemyMove = "Defend";
        return enemyMove;
    }
}

function enemyMoveRandomizer() {
    
    if(!callForEnemyAI()){
        var switchBetweenEnemyMoves = Math.round(randomNumber() * 2);
        switch (switchBetweenEnemyMoves) {
        case 0:
                enemyMove = "Light Attack"
                return enemyMove;
        case 1:
                enemyMove = "Desperate Attack";
            return enemyMove;
        case 2:
            enemyMove = "Defend";
            return enemyMove;
        }
    }
    else{
        return enemyMove; 
    }   
}

window.alert("You'll take part in a fighting tournament!");

var you = new Fighter(whatIsYourName(), 50, 5, 3, 2);

you.scream();

window.alert("Your Fighter is named " + you.name + 
             ". \nYour starting stats are:\nHP: " + you.hp +
             "\nSTR: " + you.str + 
             "\nDEF: " + you.def + 
             "\nLUK: " + you.luck);

function callForAChallenger() {
    enemy = new Fighter(enemyNameRandomizer(), 
                        enemyHealthRandomizer(), 
                        enemyStrenghtRandomizer(), 
                        enemyDefenseRandomizer(), 
                        enemyLuckRandomizer());
}

function attackDamageCalculation(name, attackform, str, luck) {
    var attackDamage;
    switch (attackform) {
    case "Light Attack":
        attackDamage = Math.round(((str + str * randomNumber()) * criticalHitRate(name,luck)));
        return attackDamage;
    case "Desperate Attack":
        attackDamage = Math.round(((str + str * randomNumber()) * 1.5 * criticalHitRate(name,luck)));
        return attackDamage;
    case "Defend":
        attackDamage = 0;
        return attackDamage;
    }
}


function yourMoveChoice() {
    if (roundCount === 0) {
        yourMove = window.prompt("What is your first Move? \n1: Light Attack \n2: Desperate Attack \n3: Defend");
    } else if (roundCount > 0) {
        yourMove = window.prompt("What will you do next? \n1: Light Attack \n2: Desperate Attack \n3: Defend");
    }
    
    if(yourMove === "1" || yourMove === "light Attack"){
        yourMove = "Light Attack";
    } 
    else if (yourMove === "2" || yourMove === "desperate attack"){
        yourMove = "Desperate Attack";
    }
    else if (yourMove === "3" || yourMove === "defend"){
        yourMove = "Defend";
    }
    
    switch (yourMove) {
    case "Light Attack":
        lightAttackCount +=1;
        roundCount +=1;
        return yourMove;
    case "Desperate Attack":
        desperateAttackCount +=1;
        roundCount++;
        return yourMove;
    case "Defend":
        defenseCount +=1;
        roundCount++;
        return yourMove;
    }
    return yourMove;
}

function damagePhase() {
    var yourAttack = attackDamageCalculation(you.name, yourMoveChoice(), you.str, you.luck) - enemy.def,
        enemyAttack = attackDamageCalculation(enemy.name, enemyMoveRandomizer(), enemy.str, enemy.luck) - you.def;
    
    if (yourAttack < 0) {
        yourAttack = 0;
    }
    if (enemyAttack < 0) {
        enemyAttack = 0;
    }
    
    if (yourMove === "Light Attack") {
        if (enemyMove === "Light Attack") {
            enemy.hp = enemy.hp - yourAttack;
            you.hp = you.hp - enemyAttack;
            window.alert(you.name + " strikes with a " + yourMove + "(" + yourAttack + "DMG) and so did " + enemy.name + "(" + enemyAttack + "DMG)!");
        } else if (enemyMove === "Desperate Attack") {
            enemy.hp = enemy.hp - yourAttack;
            you.hp = you.hp - enemyAttack;
            window.alert(you.name + " strikes with a " + yourMove + "(" + yourAttack + "DMG) while " + enemy.name + " retaliated with a "+ enemyMove + "(" + enemyAttack + "DMG!)");
            
        } else if (enemyMove === "Defend") {
            enemy.hp = enemy.hp - Math.round(yourAttack * 0.5);
            window.alert(you.name + " strikes with a " + yourMove + "(" + Math.round(yourAttack * 0.5) + "DMG) while " + enemy.name + " defends himself and weakens the Damage.");
        }
    }
    else if (yourMove === "Desperate Attack") {
        if (enemyMove === "Light Attack") {
            enemy.hp = enemy.hp - yourAttack;
            you.hp = you.hp - enemyAttack;
            window.alert(you.name + " strikes with a " + yourMove + "(" + yourAttack + "DMG) while " + enemy.name + " answered with a "+ enemyMove + "(" + enemyAttack + "DMG)!");
        } else if (enemyMove === "Desperate Attack") {
            enemy.hp = enemy.hp - yourAttack;
            you.hp = you.hp - enemyAttack;
            window.alert(you.name + " strikes with a " + yourMove + "(" + yourAttack + "DMG) and so did " + enemy.name + " (" + enemyAttack + "DMG)!");
        } else if (enemyMove === "Defend") {
            you.hp = you.hp - yourAttack;
            window.alert(you.name + " rushes forward with a " + yourMove + ". But " + enemy.name + " was able to Counter while he defends and threw " + you.name + "s Damage back at him(" + yourAttack + "DMG)!");
        }
    }
    else if (yourMove === "Defend") {
        if (enemyMove === "Light Attack") {
            you.hp = Math.round(you.hp - enemyAttack * 0.5);
            window.alert(you.name + " defends himself and could weaken " + enemy.name + "s " + enemyMove + "(" + Math.round(enemyAttack * 0.5) + "DMG)!");
        } else if (enemyMove === "Desperate Attack") {
            enemy.hp = enemy.hp - enemyAttack;
            window.alert(you.name + " takes a defensive stance and counters " + enemy.name + "s " + enemyMove + " (" + enemyAttack + "DMG!) back to him!");
        } else if (enemyMove === "Defend") {
            window.alert(you.name + " and " + enemy.name + " stared each other in the eyes while catching a breath and thinking about their next moves.");
        }
    }
    else {
        you.hp = you.hp - 10;
        window.alert("It was a bad from " + you.name + "idea trying to invent a new Move " + yourMove + " in the middle of the fight. " + you.name + " recieved a hard hit (10DMG) while doing so!")
    } 
        
    
    if (you.hp <= 0) {
        you.hp = 0;
    }
    if (enemy.hp <= 0) {
        enemy.hp = 0;
    }
    window.alert("You have " + you.hp + "HP left. " + enemy.name + " has " + enemy.hp + "HP left.");
}

function nextFight() {
    keepOnFighting = window.prompt("Do you wish to fight on?").toLowerCase();
    
    if(keepOnFighting === "yes" || keepOnFighting === "y") {
    keepOnFighting = true;
    levelUpCheck();
    window.alert("Here comes a new Challenger");
    return keepOnFighting;
    }
    else {
    window.alert(you.name + " was to frightened to keep on fighting, so he ran away like a chicken!");
    keepOnFighting = false;
    return keepOnFighting;
    }
}

function fightSequence() {
    do {
        damagePhase();
    } while (you.hp > 0 && enemy.hp > 0);
    if (enemy.hp <= 0 && you.hp <= 0) { 
        window.alert("DOUBLE KO! The tournament is over for " + you.name + " and " + enemy.name + " aswell, in Round " + fightCount + ". Fin.");
        keepOnFighting = false;
    } else if (you.hp <= 0) { 
        window.alert(you.name + " lost VS " + enemy.name + " in Round " + fightCount + ". Fin.");
        keepOnFighting = false;
    } else if (enemy.hp <= 0) { 
        window.alert(you.name + " won VS " + enemy.name + " in Round " + fightCount); 
        nextFight();
    }
}

function levelUpCheck() {
    if(roundCount > fightCount * 2 && keepOnFighting == true){
        window.alert(you.name + " leveled up through his fighting experience!!!");
        you.hp = you.hp + 10;
        you.str = you.str + Math.ceil(randomNumber()*2);
        you.def = you.def + Math.ceil(randomNumber()*2);
        you.luck = you.luck + Math.ceil(randomNumber()*2);
        
        window.alert(you.name + "s new stats are:\nHP: " + you.hp +
             " (10HP recovered)\nSTR: " + you.str + 
             "\nDEF: " + you.def +
             "\nLUK: " + you.luck);
    }
}

function tournament(){
    do{
    callForAChallenger();
    window.alert("Your enemy is named " + enemy.name + 
             ". \nHis stats are:\nHP: " + enemy.hp +
             "\nSTR: " + enemy.str + 
             "\nDEF: " + enemy.def + 
             "\nLUK: " + enemy.luck);
    
    fightSequence();
    fightCount +=1;
    }while(keepOnFighting == true);
    
}

tournament();