img="";
status="";
objects=[];
function setup(){
    canvas=createCanvas(600,400);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="status: detecting objects";

}
function preload(){
     img=loadImage('dog_cat.jpg');
}
function draw(){
   image(img,0,0,600,400);

   if(status!=""){
       for(i=0; i<objects.length; i++){
           document.getElementById("status").innerHTML="status: object detected";
           fill("#FF1493");
           percentage=floor(objects[i].confidence*100);
           text(objects[i].label+" "+ percentage +"%", objects[i].x,objects[i].y);
           noFill();
           stroke("#00FF00");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
   }
   
}
function modelLoaded(){
    console.log("model is loaded");
    status=true;
    objectDetector.detect(img,gotResult);
}
function gotResult(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}