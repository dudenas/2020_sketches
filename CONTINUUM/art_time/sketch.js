// ———————————————————————————————————————————————————variables
let clrs = [250, 5, [85, 0, 255]]
let _running
let _date, _hour, _minute, _second
let _currentTime
let _currentStage = 0
const miegas = 'pasiilsek_kartais_reikia'
const pertrauka = '_break'
const smoking = 'smoking_break'
const pietus = 'pi_etus'
const coffee = 'it\'s_coffee_time'
const pusryciai = 'puse_ryto'
let sounds = []
let rocky = false

// NO SLEEP
let noSleep = new NoSleep();

document.addEventListener('click', function enableNoSleep() {
	document.removeEventListener('click', enableNoSleep, false);
	noSleep.enable();
	console.log('noSleep')
}, false);

// TIMING
let _stages = [
	// WRITING

	getCurrentTime(09, 00, 0),
	getCurrentTime(09, 50, 0),

	// PUSRYCIAI 1

	getCurrentTime(10, 30, 0),
	getCurrentTime(10, 55, 0),

	getCurrentTime(11, 00, 0),
	getCurrentTime(11, 25, 0),

	// COFFEE 5

	getCurrentTime(11, 40, 0),
	getCurrentTime(12, 05, 0),

	getCurrentTime(12, 10, 0),
	getCurrentTime(12, 35, 0),

	// SMOKING 9

	getCurrentTime(12, 40, 0),
	getCurrentTime(13, 05, 0),

	getCurrentTime(13, 10, 0),
	getCurrentTime(13, 35, 0),

	// SMOKING 13

	getCurrentTime(14, 30, 0),
	getCurrentTime(14, 55, 0),

	getCurrentTime(15, 00, 0),
	getCurrentTime(15, 25, 0),

	// PIETU PERTRAUKA 17

	getCurrentTime(15, 30, 0),
	getCurrentTime(15, 55, 0),

	getCurrentTime(16, 00, 0),
	getCurrentTime(16, 25, 0),

	// COFFEE 21

	getCurrentTime(16, 40, 0),
	getCurrentTime(17, 05, 0),

	getCurrentTime(17, 10, 0),
	getCurrentTime(17, 35, 0),
	// 25 FINNISH
]

// STAGE
let stage

// FUNCTION TO GET THE TIME
function getCurrentTime(h, m, s) {
	return h * 60 * 60 + m * 60 + s
}

// PRELOAD SOUNDS
function preload() {
	// Load the sound file.
	sounds[0] = loadSound('assets/work.mp3');
	sounds[1] = loadSound('assets/break.mp3');
	sounds[2] = loadSound('assets/coffee.mp3');
	sounds[3] = loadSound('assets/eat.mp3');
	sounds[4] = loadSound('assets/start.mp3');
	sounds[5] = loadSound('assets/smoking.mp3');
}

// ————————————————————————————————————————————————code
function setup() {
	createCanvas(windowWidth, windowHeight).parent('#grfc');

	// style
	noStroke()
	textSize(width / 10)

	// sound
	// We have included both an MP3 and an OGG version.
	soundFormats('mp3', 'ogg');
}

// SHOWING TIME
function showTime() {
	_date = new Date()
	_hour = nf(_date.getHours(), 2, 0);
	_minute = nf(_date.getMinutes(), 2, 0);
	_second = nf(_date.getSeconds(), 2, 0);
	const mili = nf(_date.getMilliseconds() / 100, 1, 0) * 10 / 10;
	return `${_hour}_${_minute}_${_second}_${mili}`
}

// LOGIC
function changeStage() {
	_currentTime = getCurrentTime(parseFloat(_hour), parseFloat(_minute), parseFloat(_second))
	if (_currentTime > _stages[0] && _currentTime < _stages[_stages.length - 1]) {
		if (_currentTime >= _stages[_currentStage] && _currentTime <= _stages[_currentStage + 1]) {
			if (_currentStage % 2 == 0) {
				_running = true
			} else {
				_running = false
			}
		} else {
			_currentStage++
			// PLAY SOUND
			sounds.forEach(elm => elm.stop())
			if (_currentStage == 1 || _currentStage == 17) {
				sounds[3].play()
			} else if (_currentStage == 5 || _currentStage == 21) {
				sounds[2].play()
			} else if (_currentStage == 9 || _currentStage == 13) {
				sounds[5].play()
			} else if (_currentStage % 2 == 0) {
				sounds[0].play()
			} else {
				sounds[1].play()
			}
		}
	} else {
		_running = undefined
		_currentStage = 0
	}

}

// DRAW
function draw() {
	// play rocky before the day
	if (!rocky && _currentTime < _stages[0] && _currentTime > getCurrentTime(8, 50, 0)) {
		sounds[4].loop()
		rocky = true
	} else {
		sounds[4].stop()
	}

	// running texts
	if (_running != undefined) {
		if (_running) {
			background(clrs[0])
			fill(clrs[1])
		} else {
			background(clrs[1])
			fill(clrs[0])
			textSize(width / 10)
			text(_stages[_currentStage + 1] - _currentTime, width / 2 - textWidth(_stages[_currentStage + 1] - _currentTime) / 2, height / 4 * 3);
			textSize(width / 20)
			if (_currentStage == 15) {
				text(pietus, width / 2 - textWidth(pietus) / 2, height / 4);
			} else if (_currentStage == 7 || _currentStage == 23) {
				text(coffee, width / 2 - textWidth(coffee) / 2, height / 4);
			} else if (_currentStage == 3) {
				text(pusryciai, width / 2 - textWidth(pusryciai) / 2, height / 4);
			} else if (_currentStage == 11 || _currentStage == 19) {
				text(smoking, width / 2 - textWidth(smoking) / 2, height / 4);
			} else {
				text(pertrauka, width / 2 - textWidth(pertrauka) / 2, height / 4);
			}
		}
	} else {
		background(clrs[2])
		fill(clrs[0])
		textSize(width / 20)
		text(miegas, width / 2 - textWidth(miegas) / 2, height / 4);
	}

	// time
	const txt = showTime()
	textSize(width / 10)
	text(txt, width / 2 - textWidth(txt) / 2, height / 2);

	// check running
	changeStage()
}

// ————————————————————————————————————————————————————————————————————————————————————————————————————————————
// RESIZE
var $el = $("#grfc");
var elHeight = $el.outerHeight();
var elWidth = $el.outerWidth();

$(window).resize(() => {
	starterData = {
		size: {
			width: window.innerWidth,
			height: window.innerHeight
		}
	}
	doResize(null, starterData)
});



function doResize(event, ui) {
	var scale;
	let h = ui.size.height
	let w = ui.size.width
	if (h > w) {
		// when window height is more than window width MOBILE
		scale = h / elHeight
	} else {
		if (w / elWidth > h / elHeight) {
			scale = w / elWidth
		} else {
			scale = h / elHeight
		}
	}

	$el.css({
		transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
	});
}

// initial data
var starterData = {
	size: {
		width: window.innerWidth,
		height: window.innerHeight
	}
}

doResize(null, starterData);