var population;
var lifespan = 200;
var count = 0;
//var lifeP;
var target;


function setup() {      
    createCanvas(600, 400);
    population = new Population();
   // lifeP = createP();
   target = createVector(width/2, 50);
}

function draw() {
    background(0);
    population.run();
    console.log("Ovdee sam");
    //lifeP.html(count);
    count++;
    ellipse(target.x, target.y, 16, 16);

    if(count == lifespan) {
       population.evaluate();
       console.log("Evo me u draw");
      // population.selection();
      // population = new Population();
        count = 0;
    }
}

function Rocket(dnk) {

    this.dna = createVector();

    if(dnk) {
        this.dna = dnk;
    }

    else {
        this.dna = new DNA();
    }

    this.pos = createVector(width/2, height);
    this.acc = createVector(0, -1);
    this.vel = createVector();
    
    this.fitness;
    count = 0;

    this.applyForce = function(force) {
        this.acc.add(force);
    }

    this.calcFitness = function() {

        var d = dist(this.pos.x, this.pos.y, target.x, target.y)

        this.fitness = map(d, width, width, 0);
    }

    this.update = function() {

        this.applyForce(this.dna.genes[count]);


        this.vel.add(this.acc);
        this.pos.add(this.vel);
        this.acc.mult(0);
    }

    this.show = function() {

        push();
        noStroke();
        fill(255, 150);
        translate(this.pos.x, this.pos.y);
        rotate(this.vel.heading); 
        rectMode(CENTER);
        rect(0, 0, 5, 25);
        pop();
    }
  }

    function Population() {

        this.rockets = [];
        this.popsize = 10;
        this.matingpool = [];

        for(var i=0;i<this.popsize;i++) {
            this.rockets[i] = new Rocket();
        }

        this.evaluate = function() {

            var maxfitness = -1;

            for(var i = 0;i <this.popsize;i++) {
                this.rockets[i].calcFitness();
                if(this.rockets[i].fitness > maxfitness) {
                    maxfitness = this.rockets[i].fitness;
                }
            }

            console.log("Ovo je najveci fitness :" + maxfitness);

            for(var i = 0;i <this.popsize;i++) {
                
                this.rockets[i].fitness /= maxfitness; 
            }

            this.matingpool = [];

            for(var i = 0;i <this.popsize;i++) {
                var n = this.rockets[i].fitness * 100;
                for(var j = 0; j<n;j++) {
                    this.matingpool.push(this.rockets[i]);
                } 
            }

            console.log("Mating pool size " + this.matingpool.lenght);
        }

        this.selection = function() {

            var newRockets = [];
            for(var i=0;i<this.rockets.lenght;i++) {
                var parentA = this.matingpool[floor(random(this.matingpool.lenght))].dna;
                var parentB = this.matingpool[floor(random(this.matingpool.lenght))].dna;
                var child = parentA.crossover(parentB);

                newRockets[i] = new Rocket(child);
            }
            this.rockets = newRockets;
            for(var i = 0;i < this.rockets.lenght;i++) {
                console.log("Ee" + this.rockets[i].calcFitness())
            }
        }

        this.run = function() {

            for(var i=0;i<this.popsize;i++) {
                console.log(this.rockets[i]);
                this.rockets[i].update();
                this.rockets[i].show();
                console.log(this.rockets[i]);
            }
        }
    }


function DNA(genes) {

    if(genes) {
        this.genes = genes;
    }
    else {

        this.genes = [];
        for(var i = 0;i<lifespan;i++) {
            this.genes[i] = p5.Vector.random2D();
            this.genes[i].setMag(0.1);
        }

    }

    this.crossover = function(partner) {

        var newDna = [];
        var mid = floor(random(this.genes.lenght));
        for(var i = 0; i<this.genes.lenght;i++) {
            if(i > mid) {
                newDna[i] = this.genes[i];
            }
            else {
                newDna[i] = this.partner[i];
            }
        }
        return new DNA(newDna);
    }


}