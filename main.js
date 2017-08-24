'use strict';
//SET the range of randomized EnemyStats here:
var enemyNames = ["Ryu", "Chen", "Jackie", "Admiral General Aladin", "Benny the Retard"];
var maximumHealthPossible = 50;
var maximumStrenghtPossible = 5;
var maximumDefPossible = 5;
var maximumLuckPossible = 5;

var roundCount = 0;

var yourMove = "Light Attack";
var enemyMove;

function randomNumber() {
    return Math.random();
}

//this function only serves the purpose for the index of arraylengts to never be randomized to "-1"
function randomizerForArrays(arrayLength) {
    var i = Math.ceil(Math.random() * arrayLength - 1);
    return i;
}


function Fighter(name, hp, str, def, luck) {
    this.name = name,
    this.hp = hp,
    this.str = str,
    this.def = def,
    this.luck = luck
}

function whatIsYourName() {
    var name = window.prompt("What is the Name of your Warrior?");
    
    if (!name) {
        do {
            name = window.prompt("Please name your Warrior.");
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
        enemyHP = Math.round(Math.random() * maximumHealthPossible);
    }
    return enemyHP;
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

function criticalHitRate(probability) {
    var critrate = randomNumber() * 100 + probability * randomNumber();
    if (critrate > 95) {
        window.alert("Crit!");
        return 2;
    } else {
        return 1;
    }
}

function enemyMoveRandomizer() {
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

var you = new Fighter("Wadim", 50, 5, 1, 1);
var enemy = new Fighter(enemyNameRandomizer(), 
                        enemyHealthRandomizer(), 
                        enemyStrenghtRandomizer(), 
                        enemyDefenseRandomizer(), 
                        enemyLuckRandomizer());

function attackDamageCalculation(name, attackform, str, luck) {
    var attackDamage;
    switch (attackform) {
    case "Light Attack":
        attackDamage = Math.round(((str + str * randomNumber()) * criticalHitRate(luck)));
        return attackDamage;
    case "Desperate Attack":
        attackDamage = Math.round(((str + str * randomNumber()) * 1.5 * criticalHitRate(luck)));
        return attackDamage;
    case "Defend":
        attackDamage = 0;
        return attackDamage;
    }
}


//WIP and not used at the moment(Need Buttons for that and have to study CSS & HTML first I guess...)
function yourMoveChoice() {
    if (roundCount === 0) {
        yourMove = window.prompt("What is your first Move? Light Attack, Desperate Attack or Defend?");
    } else if (roundCount > 0) {
        yourMove = window.prompt("What will you do next? Light Attack, Desperate Attack or Defend?");
    }
     
    switch (yourMove) {
    case "Light Attack":
        roundCount++;
        return yourMove;
    case "Desperate Attack":
        roundCount++;
        return yourMove;
    case "Defend":
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
            window.alert(you.name + " strikes with a " + yourMove + "(" + yourAttack/2 + "DMG) while " + enemy.name + " defends himself and weakens the Damage");
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
            window.alert(you.name + " strikes with a " + yourMove + "(" + yourAttack + "DMG) and so did " + enemy.name + " (" + enemyAttack + "DMG!)");
        } else if (enemyMove === "Defend") {
            you.hp = you.hp - yourAttack;
            window.alert(you.name + " rushes forward with a " + yourMove + ". But " + enemy.name + " was able to Counter while he defends and threw " + you.name + "s Damage back at him(" + yourAttack + "DMG)!");
        }
    }
    else if (yourMove === "Defend") {
        if (enemyMove === "Light Attack") {
            you.hp = Math.round(you.hp - enemyAttack * 0.5);
            window.alert(you.name + " defends himself and could weaken " + enemy.name + "s " + enemyMove + "(" + enemyAttack/2 + "DMG) and so did " + enemy.name + "(" + enemyAttack + "DMG)!");
        } else if (enemyMove === "Desperate Attack") {
            enemy.hp = enemy.hp - enemyAttack;
            window.alert(you.name + " takes a defensive stance and counters " + enemy.name + "s " + enemyMove + " (" + enemyAttack + "DMG!) back to him");
        } else if (enemyMove === "Defend") {
            window.alert(you.name + " and " + enemy.name + " stared each other in the eyes while catching a breath and thinking about their next moves");
        }
    }
        
    
    if (you.hp <= 0) {
        you.hp = 0;
    }
    if (enemy.hp <= 0) {
        enemy.hp = 0;
    }
    window.alert("You have " + you.hp + "HP left. " + enemy.name + " has " + enemy.hp + "HP left.");
}

function fightSequence() {
    do {
        damagePhase();
    } while (you.hp > 0 && enemy.hp > 0);
    if (enemy.hp <= 0 && you.hp <= 0) { 
        window.alert("DOUBLE KO!"); 
    } else if (you.hp <= 0) { 
        window.alert("You lose!"); 
    } else if (enemy.hp <= 0) { 
        window.alert("You win!"); 
    }
}

fightSequence();
