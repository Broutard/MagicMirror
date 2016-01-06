var speech = {
    lang: config.speech.lang || 'en-US',
    masterCommand: config.speech.masterCommand || false,
    masterCommandDelay: config.speech.masterCommandDelay || 10000,
    commands: config.speech.commands || null,
    intervalStartId: null
};


speech.listenSubCommands = function (commands) {
    var commandsNames = $.map(commands, function(value, key) {
        return key;
    });
    var stopListenning = function() {
        console.log('stopListenning');
        $('#speech').hide();
        annyang.removeCommands(commandsNames);
    }

    $('#speech').show();
    annyang.addCommands(commands);

    // stop listenning is a sub-command match
    annyang.addCallback('resultMatch', function(txt,cmd) {
        if(cmd!=speech.masterCommand) {
            stopListenning();
        }
    });

    // stop listenning after masterCommandDelay
    setTimeout(function () {
        stopListenning();
    }, this.masterCommandDelay)
}


speech.init = function () {

    if(annyang && speech.commands !== null) {
        annyang.debug(); // console debug
        annyang.setLanguage(speech.lang);

        if(speech.masterCommand !== false) {
            annyang.addCommands({
                [speech.masterCommand]: function() {
                    speech.listenSubCommands(speech.commands);
                }
            });
        } else {
            annyang.addCommands(speech.commands);
        }

        annyang.start();

        this.intervalStartId = setInterval(function () {
            if(!annyang.isListening()) {
                annyang.start();
            }
        }.bind(this), 30000)
    }
}
