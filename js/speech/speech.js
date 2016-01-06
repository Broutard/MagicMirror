var speech = {
    lang: config.speech.lang || 'en-US',
    commands: config.speech.commands || null,
    intervalId: null
};

/**
 * Changes the compliment visible on the screen
 */
speech.isListening = function () {

}


speech.init = function () {

    if(annyang && speech.commands !== null) {
        annyang.setLanguage(speech.lang);
        annyang.addCommands(speech.commands);
        annyang.debug(); // console debug
        annyang.start();

        this.intervalId = setInterval(function () {
            if(!annyang.isListening()) {
                annyang.start();
            }
        }.bind(this), 30000)
    }
}
