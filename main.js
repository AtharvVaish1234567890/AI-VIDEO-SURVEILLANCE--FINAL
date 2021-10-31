video=""
stat=false
objects=[];
var r, g, b;

function preload()
{
    video= createVideo("video.mp4");
    video.hide();
}

function setup()
{
    Canvas= createCanvas(350, 350);
    Canvas.center();
}

function draw()
{
    image(video, 0, 0, 350, 350);

    if(stat !="")
    {
        oD.detect(video, gotResults);
        for(var i=0 ; i<objects.length ; i++)
        {
            document.getElementById("status").innerHTML= "Status : Objects Detected";
            document.getElementById("number_of_obj").innerHTML= "Number of Objects Detected : " + objects.length;

            r= Math.random(0, 255);
            g= Math.random(0, 255);
            b= Math.random(0, 255);

            fill(r, g, b);
            stroke(r, g, b)

            percentage= floor(objects[i].confidence * 100);
            text( objects[i].label + "    " + percentage + " % ", objects[i].x +20, objects[i].y +20);
            noFill()
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function start()
{
    oD= ml5.objectDetector( "cocossd", modelLoaded);
    document.getElementById("status").innerHTML= "Status : Detecting Objects";
}

function modelLoaded()
{
    console.log("Model is Initialized");
    stat=true
    video.loop();
    video.speed(1);
    video.volume(1);
}

function gotResults(error, results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects= results;
    }
}