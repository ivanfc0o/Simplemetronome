/* @author: Iván Ibarra - ivanfc0o@gmail.com - @ivanfc0o:github */
var metronome = metronome||{};
const context = new (window.AudioContext||window.webkitAudioContext)();
var interval;
/*
 * Low: The beep that is made on every beat but the main beat
 * High: The beep that is made on the first beat of the bar
 * inspired by @joereynolds:github
 */
const frequencies = {
    low: 880.0,
    high: 1760.0
};

metronome.config = {bpm: 30, gain: 0.7, rangeid: "range-metronome", playButton: "play-mt", stopButton: "stop-mt", status: true};
metronome.fns = {
	setbpm: function(bpm){	
			clearInterval(interval);
			metronome.config.bpm = bpm;
			if(metronome.config.status){ this.play(); }
			return bpm; 
	},
	changebpm: function(){
		var _input = document.getElementById(metronome.config.rangeid);
			_input = _input.value;
			this.setbpm(_input);
	},
	play: function(){
		interval = setInterval(function(){
		const oscillator = context.createOscillator();
		const gain = context.createGain();
		gain.gain.value = metronome.config.gain;
		gain.connect(context.destination);
		oscillator.connect(gain);
		oscillator.frequency.value = frequencies.low;
		oscillator.start();
		oscillator.stop(context.currentTime + 0.1);
		}, 60000/metronome.config.bpm);
		metronome.config.status=true;
	},
	stop: function(){
		clearInterval(interval); metronome.config.status=false;
	}
};

metronome.init = function(){
	var _m = metronome.config;
	var _o = {p: document.getElementById(_m.playButton), s: document.getElementById(_m.stopButton), ri: document.getElementById(_m.rangeid)};
	_o.p.onclick = _o.p?metronome.fns.play:false;
	_o.s.onclick = _o.s?metronome.fns.stop:false;
	_o.ri.onchange = _o.ri?function(){metronome.fns.changebpm();}:false;
	metronome.fns.play();
}
window.onload = metronome.init;