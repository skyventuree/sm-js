const { Simfile } = require('./src/stepmania');

var sm = new Simfile('./test/steps.sm');

sm.getDifficulty().then(title => {
    console.log(title);
})
