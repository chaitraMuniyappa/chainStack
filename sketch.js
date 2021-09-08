const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint= Matter.Constraint;

var engine,world;
var ground;
var circles=[];

function setup(){
    createCanvas(600,600);

    engine = Engine.create();
    world = engine.world;

    ground = new Ground(300, height, width, 50, 0);

    var prev = null;
    
    for(var i=250;i< 400;i+=20){
        var circle = new Circle(i, 100, 20);
        circles.push(circle);
        Matter.Body.setStatic(circles[0].body, true);
        if (prev) {
            var options = {
              bodyA: circle.body,
              bodyB: prev.body,
              length: 40,
              stiffness: 0.4
            }
            var constraint = Constraint.create(options);
            World.add(world, constraint);
        }
        prev = circle;
    }
}
function draw(){
    background("gray");
    Engine.update(engine);

    ground.display();

    for(var i=0;i<circles.length;i++){
        circles[i].display();
    }
    if(keyDown(RIGHT_ARROW)){
        Matter.Body.applyForce(circles[circles.length/2-1].body, {x:0, y:0},{x:0.05, y:0});
    }
}
