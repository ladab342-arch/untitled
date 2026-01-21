basic.forever(function () {
    enum TrafficState {
        RED,
        GREEN,
        YELLOW,
        NIGHT
    }
let state = TrafficState.RED
function allOff() {
        pins.digitalWritePin(DigitalPin.P0, 0)
        pins.digitalWritePin(DigitalPin.P1, 0)
        pins.digitalWritePin(DigitalPin.P2, 0)
    }
function red() {
        allOff()
        pins.digitalWritePin(DigitalPin.P0, 1)
    }
function yellow() {
        allOff()
        pins.digitalWritePin(DigitalPin.P1, 1)
    }
function green() {
        allOff()
        pins.digitalWritePin(DigitalPin.P2, 1)
    }
input.onButtonPressed(Button.A, function () {
        pedestrianRequest = true
        music.playTone(988, 150)
    })
function isNight(): boolean {
        return input.lightLevel() < 15
    }
function adaptiveGreen(): number {
        let traffic = input.lightLevel()
        return Math.map(traffic, 0, 255, 3000, 8000)
    }
basic.forever(function () {

        // NIGHT MODE
        if (isNight()) {
            state = TrafficState.NIGHT
        }

        if (state == TrafficState.RED) {
            red()
            basic.pause(3000)
            state = TrafficState.GREEN
        }

        else if (state == TrafficState.GREEN) {
            green()
            basic.pause(adaptiveGreen())

            if 
                music.playTone(784, 300)
                pedestrianRequest = false
            }

            state = TrafficState.YELLOW
        }

        else if (state == TrafficState.YELLOW) {
            yellow()
            basic.pause(2000)
            state = TrafficState.RED
        }

        else if (state == TrafficState.NIGHT) {
            yellow()
            basic.pause(500)
            allOff()
            basic.pause(500)

            if (!isNight()) {
                state = TrafficState.RED
            }
        }
    })
})
