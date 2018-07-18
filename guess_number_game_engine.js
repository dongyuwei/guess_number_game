function isUniqueDigitalSequence(input) {
    const length = input.length;
    const set = new Set();
    for(let i = 0; i < length; i++) {
        set.add(input.charAt(i));
    }
    return set.size === 4;
}

function isNumbers(input) {
    const regexp = /^\d+$/g;
    return regexp.test(input);
}

function getRandomIntInRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDigitalSequence() {
    const sequence = [];
    const set = new Set();
    while (sequence.length < 4) {
        const number = getRandomIntInRange(0, 9);
        if(!set.has(number)) {
            set.add(number);
            sequence.push(number);
        }
    }
    return sequence;
}

class GuessNumberGameEngine {
    constructor() {
        this.digitalSequence = generateDigitalSequence();

        this.totalTimes = 0;
        this.history = [];
    }

    feed(input){
        this.input = input.replace(/\s/g, "");
        return this;
    }

    isValidInput() {
        return this.input.length === 4 && isNumbers(this.input) && isUniqueDigitalSequence(this.input);
    }

    play(input) {
        if(this.isValidInput()) {
            const reply = this.reply();
            this.history.push({
                input: this.input.split("").join(" "),
                output: reply
            });
            this.totalTimes = this.totalTimes + 1;
        } else {
            this.history.push({
                input: this.input.split("").join(" "),
                output: "Wrong Input，Input again"
            });
        }

        return this.printGameRecords();
    }

    reply() {
        const input = this.input;
        const set = new Set();
        this.digitalSequence.forEach(number => set.add(number.toString()));
        
        let x = 0, y = 0;
        this.digitalSequence.forEach((number, index) => {
            if(input.charAt(index) === number.toString()){
                x = x + 1;
            } else if(set.has(input.charAt(index))) {
                y = y + 1;
            }
        });

        return `${x}A${y}B`;
    }

    printGameRecords() {
        console.log(`Input\t\t\tOutput`);
        this.history.forEach(item => {
            console.log(`${item.input}\t\t\t${item.output}`);
        });
    }
}

module.exports = {
    GuessNumberGameEngine,
    
    isUniqueDigitalSequence,
    isNumbers,
    getRandomIntInRange,
    generateDigitalSequence
};