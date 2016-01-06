var speech = {
    lang: config.speech.lang || 'en-US',
    masterCommand: config.speech.masterCommand || '',
    masterCommandDelay: config.speech.masterCommandDelay || 10000,
    commands: config.speech.commands || null,
    intervalStartId: null
};


speech.listenSubCommands = function (commands) {
    if(!this.masterCommandListenning) {
        var commandsNames = $.map(commands, function(value, key) {
            return key;
        });
        var stopListenning = function() {
            $('#speech').hide();
            this.masterCommandListenning = false;
            annyang.removeCommands(commandsNames);
        }.bind(this);

        $('#speech').show();
        this.masterCommandListenning = true;
        annyang.addCommands(commands);

        // stop listenning if a sub-command match
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
}

speech.help = function () {
    var commands = $.map(speech.commands, function(value, key) {
        return key;
    });
    $('#speech-help').html('<b>'+speech.masterCommand+"</b><hr>"+commands.join('<br>')).show(0).delay(5000).hide(0);
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
