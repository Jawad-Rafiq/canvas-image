const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [] ;

//Mouse

let mouse ={
    x : null,
    y : null,
    radius : 100
}
window.addEventListener('mousemove',function(event){
    mouse.x=event.x + canvas.clientLeft/2;
    mouse.y = event.y + canvas.clientTop/2;

});

function drawImage(){
    let imageWidth = png.width;
    let imageHeight = png.height;
    const data = ctx.getImageData(0,0,imageWidth,imageHeight);
    ctx.clearRect(0,0,canvas.width,canvas.height);

    class Particle{
        constructor(x,y,color,size){
            this.x = x+canvas.width/2 - png.width*2,
            this.y = y+canvas.height/2 - png.height*2,
            this.color=color,
            this.size=2
            this.baseX=x+canvas.width/2 - png.width*2,
            this.baseY=y+canvas.height/2 - png.height*2,
            this.density = (Math.random()*10)+2;
        }
        draw(){
            ctx.beginPath();
            ctx.arc(this.x,this.y,this.size,0,Math.PI*2);
            ctx.closePath();
            ctx.fill();
        }
        update(){
            ctx.fillStyle = this.color;
            //Collision detection
            let dx = mouse.x - this.x;
            let dy = mouse.y - this.y;
            let distance = Math.sqrt(dx*dx+dy*dy);
            let forceDirectionX = dx/distance;
            let forceDirectionY = dy/distance;

            //max distance, past that the force will be 0
            const maxDistance  = 100;
            let force = (maxDistance - distance)/maxDistance;
            if(force < 0) force = 0;
            let directionX = (forceDirectionX * force * this.density*0.6);
            let directionY = (forceDirectionY * force * this.density*0.6);

            if(distance <mouse.radius + this.size){
                this.x -= directionX;
                this.y -= directionY;
            }
            else{
                if(this.x !== this.baseX){
                    let dx = this.x  - this.baseX;
                    this.x -= dx/20;
                }
                if(this.y !== this.baseY){
                    let dy = this.y - this.baseY;
                    this.y -= dy/20;
                }
            }
            this.draw();
        }
    }
    function init(){
        particleArray = [];
        for(let y=0, y2 = data.height; y<y2;y++){
            for(let x=0,x2 = data.width;x<x2;x++){
                if(data.data[(y*4*data.width)+(x*4)+3]>128){
                    let positionX = x;
                    let positionY = y;
                    let color = "rgb("+data.data[(y*4*data.width)+(x*4)] + "," + data.data[(y*4*data.width)+(x*4)+1] +","+data.data[(y*4*data.width)+(x*4)+2] +")";
                    particleArray.push(new Particle(positionX*4,positionY*4,color));
                }
            }
        }
    }
    function animate(){
        requestAnimationFrame(animate);
        ctx.fillStyle= "rgba(0,0,0,.05)";
        ctx.fillRect(0,0,innerWidth,innerHeight);
        for(let i = 0 ; i< particleArray.length;i++){
            particleArray[i].update();
        }
    }
    init();
    animate();

    window.addEventListener('resize',function(){
        canvas.width=innerWidth;
        canvas.height=innerHeight;
        init();
    });

}

const png = new Image();
    png.src = "data:image/png;base64,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"

window.addEventListener('load',(event)=>{
    console.log("page has been loaded");
    ctx.drawImage(png,0,0);
    drawImage();
});
