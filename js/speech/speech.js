var speech = {
    lang: config.speech.lang || 'en-US',
    masterCommand: config.speech.masterCommand || '',
    masterCommandDelay: config.speech.masterCommandDelay || 10000,
    enableQuickMasterCommand: config.speech.enableQuickMasterCommand || true,
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
    this._updateLayer('<div id="speech-help"><b>'+speech.masterCommand+"</b><hr>"+commands.join('<br>')+'</div>', 5000);
}

speech.recipe = function(recipe) {
    $.ajax({
        type: 'GET',
        url: 'recipe.php',
        data: {recipe: recipe},
        success: function (data) {
            speech._updateLayer(data);
        }
    });
}

speech._updateLayer = function(html, hideAfterDelay) {
    if(hideAfterDelay) {
        $('#layer').html(html).show(0).delay(hideAfterDelay).hide(0);
    } else {
        $('#layer').html(html).show();
    }
}

speech.init = function () {

    if(annyang && speech.commands !== null) {
        annyang.debug(); // console debug
        annyang.setLanguage(speech.lang);

        if(speech.masterCommand !== false) {
            // add master command
            annyang.addCommands({
                [speech.masterCommand]: function() {
                    speech.listenSubCommands(speech.commands);
                }
            });
            // add quick master commands
            if(speech.enableQuickMasterCommand) {
                var qCommands = {};
                $.each(speech.commands, function(name, fn){
                    qCommands[speech.masterCommand+' '+name] = fn;
                });
                annyang.addCommands(qCommands);
            }
        } else {
            annyang.addCommands(speech.commands);
        }

        annyang.start({autoRestart: true});

        /*this.intervalStartId = setInterval(function () {
            if(!annyang.isListening()) {
                annyang.start();
            }
        }.bind(this), 30000)*/
    }
}
