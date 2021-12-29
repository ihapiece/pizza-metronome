let t = 0;
let beat = 0;
let tempo = 140;
let radius = 130;
let ts_nom = 9;
let ts_den = 8;
let metronome = true;
let notes = "1357";

function setup() {
  createCanvas(600, 400);
  sqr = new p5.Oscillator('square');
  sqr.start()
  hht = new p5.Oscillator('sine');
  hht.start()
  notesbox = createInput("1357");
  notesbox.position(5, 5);
  tsnomslider = createSlider(1, 15, 8, 1);
  tsnomslider.position(60, 48);
  tsnomslider.style('width', '140px');
  temposlider = createSlider(20, 360, 120);
  temposlider.position(60, 70);
  temposlider.style('width', '140px');
  tresillo = createButton('tresillo');
  tresillo.position(width-100, 0);
  tresillo.mousePressed(setStuff.bind(null, "147", 8));
  fivefour = createButton('5/4 clave');
  fivefour.position(width-115, 30);
  fivefour.mousePressed(setStuff.bind(null, "1479", 10));
  fivefour = createButton('butter');
  fivefour.position(width-95, 60);
  fivefour.mousePressed(setStuff.bind(null, "147a59", 12));
  pulse = createCheckbox('pulse', true);
  pulse.position(5, 90);
}

function setStuff(a, b) {
  notesbox.value(a);
  tsnomslider.value(b);
}

function bang(o, bangamount) {
  o.amp(bangamount*3, 0);
  o.amp(0, bangamount);
}

function draw() {
  notes = notesbox.value();
  ts_nom = tsnomslider.value();
  tempo = temposlider.value();
  metronome = pulse.checked();
  background(30);
  fill(255);
  text(ts_nom.toString(16) + (ts_nom > 9 ? " ("+ts_nom+")" : ""), 5, 62);
  t += (tempo*deltaTime*(ts_den/4))/(1000*60*ts_nom);
  
  if (t >= 1) t -= 1;
  translate(width/2, height/2);
  fill(255);
  circle(0, 0, radius*2);
  beatprev = beat;
  beat = floor(t*ts_nom)+1;
  fill(255, 204, 0);
  
  radius = lerp(radius, 130, 0.1);
  if (beat != beatprev) {
    if (metronome) bang(hht, 0.2);
    if (notes.includes(beat.toString(16))) {
      bang(sqr, beat==1 ? 0.3 : 0.1);
      if (beat%2==0) {sqr.freq(660);} else {sqr.freq(440);}
      radius = 110;
    }
    
    
  }
  
  if (notes.includes(beat.toString(16))) fill(160, 160, 230);
  
  x = (TWO_PI/ts_nom)*(beat-1);
  arc(0, 0, radius*2-10, radius*2-10, x-HALF_PI, x+(TWO_PI/ts_nom)-HALF_PI);
  line(0, 0, cos(t*TWO_PI-HALF_PI)*radius, sin(t*TWO_PI-HALF_PI)*radius);
}
