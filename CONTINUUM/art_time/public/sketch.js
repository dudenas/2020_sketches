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
let finnished = false

// NO SLEEP
let noSleep = new NoSleep();

document.addEventListener('click', function enableNoSleep() {
	document.removeEventListener('click', enableNoSleep, false);
	noSleep.enable();
	console.log('noSleep')
}, false);

// JSON TIME
let _schedule = [{
		start: [09, 00],
		end: [09, 50]
	},
	// PUSRYCIAI
	{
		start: [10, 30],
		end: [10, 55]
	}, {
		start: [11, 00],
		end: [11, 25]
	}, {
		start: [11, 40],
		end: [12, 05]
	}, {
		start: [12, 10],
		end: [12, 35]
	}, {
		start: [12, 40],
		end: [13, 05]
	}, {
		start: [13, 10],
		end: [13, 35]
	}, {
		start: [13, 40],
		end: [14, 05]
	}, {
		start: [14, 10],
		end: [14, 35]
	},
	// PIETUS
	{
		start: [15, 30],
		end: [15, 55]
	}, {
		start: [16, 00],
		end: [16, 25]
	}, {
		start: [16, 40],
		end: [17, 05]
	}, {
		start: [17, 10],
		end: [17, 35]
	}
]
// TIMING
let _stages = [
	// WRITING

	getCurrentTime(_schedule[0]["start"][0], _schedule[0]["start"][1], 0),
	getCurrentTime(_schedule[0]["end"][0], _schedule[0]["end"][1], 0),

	// PUSRYCIAI 1

	getCurrentTime(_schedule[1]["start"][0], _schedule[1]["start"][1], 0),
	getCurrentTime(_schedule[1]["end"][0], _schedule[1]["end"][1], 0),

	getCurrentTime(_schedule[2]["start"][0], _schedule[2]["start"][1], 0),
	getCurrentTime(_schedule[2]["end"][0], _schedule[2]["end"][1], 0),

	// COFFEE 5

	getCurrentTime(_schedule[3]["start"][0], _schedule[3]["start"][1], 0),
	getCurrentTime(_schedule[3]["end"][0], _schedule[3]["end"][1], 0),

	getCurrentTime(_schedule[4]["start"][0], _schedule[4]["start"][1], 0),
	getCurrentTime(_schedule[4]["end"][0], _schedule[4]["end"][1], 0),

	// SMOKING 9

	getCurrentTime(_schedule[5]["start"][0], _schedule[5]["start"][1], 0),
	getCurrentTime(_schedule[5]["end"][0], _schedule[5]["end"][1], 0),

	getCurrentTime(_schedule[6]["start"][0], _schedule[6]["start"][1], 0),
	getCurrentTime(_schedule[6]["end"][0], _schedule[6]["end"][1], 0),

	// SMOKING 13

	getCurrentTime(_schedule[7]["start"][0], _schedule[7]["start"][1], 0),
	getCurrentTime(_schedule[7]["end"][0], _schedule[7]["end"][1], 0),

	getCurrentTime(_schedule[8]["start"][0], _schedule[8]["start"][1], 0),
	getCurrentTime(_schedule[8]["end"][0], _schedule[8]["end"][1], 0),

	// PIETU PERTRAUKA 17

	getCurrentTime(_schedule[9]["start"][0], _schedule[9]["start"][1], 0),
	getCurrentTime(_schedule[9]["end"][0], _schedule[9]["end"][1], 0),

	getCurrentTime(_schedule[10]["start"][0], _schedule[10]["start"][1], 0),
	getCurrentTime(_schedule[10]["end"][0], _schedule[10]["end"][1], 0),

	// COFFEE 21

	getCurrentTime(_schedule[11]["start"][0], _schedule[11]["start"][1], 0),
	getCurrentTime(_schedule[11]["end"][0], _schedule[11]["end"][1], 0),

	getCurrentTime(_schedule[12]["start"][0], _schedule[12]["start"][1], 0),
	getCurrentTime(_schedule[12]["end"][0], _schedule[12]["end"][1], 0),
	// 25 FINNISH
]

// STAGE
let stage

// custom stages
let _stageMorning = 1
let _stageDinner = 17
let _stageSmoking = [9, 13]
let _stageCoffee = [5, 21]

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
	sounds[6] = loadSound('assets/finnished.mp3');
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
			if (_currentStage == _stageMorning || _currentStage == _stageDinner) {
				sounds[3].play()
			} else if (_currentStage == _stageCoffee[0] || _currentStage == _stageCoffee[1]) {
				sounds[2].play()
			} else if (_currentStage == _stageSmoking[0] || _currentStage == _stageSmoking[1]) {
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
	if (!rocky && _running == undefined && _currentTime > getCurrentTime(8, 55, 0)) {
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
			if (_currentStage == _stageDinner) {
				text(pietus, width / 2 - textWidth(pietus) / 2, height / 4);
			} else if (_currentStage == _stageCoffee[0] || _currentStage == _stageCoffee[1]) {
				text(coffee, width / 2 - textWidth(coffee) / 2, height / 4);
			} else if (_currentStage == _stageMorning) {
				text(pusryciai, width / 2 - textWidth(pusryciai) / 2, height / 4);
			} else if (_currentStage == _stageSmoking[0] || _currentStage == _stageSmoking[1]) {
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

		// show schedule
		showSchedule()

		// play finnished song
		if (_currentTime > _stages[_stages.length - 1] && !finnished) {
			sounds[6].play()
			finnished = true
		}
	}


	// time
	const txt = showTime()
	textSize(width / 10)
	text(txt, width / 2 - textWidth(txt) / 2, height / 2);

	// check running
	changeStage()
}

function showSchedule() {
	for (let i = 0; i < _schedule.length; i++) {
		const txt_a = `${nf(_schedule[i]["start"][0],2,0)}_${nf(_schedule[i]["start"][1],2,0)}`
		const txt_b = `${nf(_schedule[i]["end"][0],2,0)}_${nf(_schedule[i]["end"][1],2,0)}`
		const padd = (height / 40) * i
		textSize(height / 40)
		text(txt_a, width / 2 - textWidth(txt_a) / 2 - width / 10, height / 1.8 + padd)
		if (i == 1 || i == 9) {
			textSize(height / 60)
			text("EAT", width / 2 - textWidth("EAT") / 2, height / 1.8 + padd - height / 80)
		}
		textSize(height / 40)
		text("—", width / 2 - textWidth("—") / 2, height / 1.8 + padd)
		text(txt_b, width / 2 - textWidth(txt_b) / 2 + width / 10, height / 1.8 + padd)
	}
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