// let drops = [];
// const num_drops = 50;

// let wind = 0;
// let wind_off = 0;

// function setup(){

//     for (let i = 0; i < num_drops; i++) {
//         drops.push(new Drop());
//     }
//     stroke(0, 0, 30);
// }

// function draw() {
//     background(255);

//     for (let i = 0; i < num_drops; i++) {
//         drops[i].draw();
//         drops[i].update();
//     }
    
//     wind = noise(wind_off);
//     wind_off += 0.005;
// }

// class Drop {
//     constructor() {
//         this.x = random(width);
//         this.y = random(0, -height);
        
//         this.grav = 0.1;
        
//         this.z = random(1,20);
//         this.len = map(this.z,1,20,5,30);
//         this.vely = map(this.z,1,20,1,20);
//         this.stroke = map(this.z,1,20,1,3);
        
//         this.velx = 0;
//     }
  
//     update() {
//         this.y += this.vely;
//         this.vely += this.grav;
//         this.x += this.velx;
        
//         if (this.y > height) {
//             this.y = random(0, -height); 
//             this.vely = map(this.z, 1, 20, 1, 20);
//         }
        
//         if (this.x > width) this.x = 0;
//         if (this.x < 0) this.x = width;
        
//         let drop_wind = -5;
//         this.velx = wind * drop_wind;
//     }
    
//     draw() {
//         strokeWeight(this.stroke);
//         line(this.x-this.velx*3, this.y, this.x, this.y+this.len);
//     }
// }