var config = {
    lang: 'fr',
    time: {
        timeFormat: 24
    },
    weather: {
        //change weather params here:
        //units: metric or imperial
        params: {
            q: 'Roissy-en-Brie, FR',
            units: 'metric',
            // if you want a different lang for the weather that what is set above, change it here
            lang: 'fr',
            APPID: '003dadc0e0b6e39d4378e02dba3ce8ca'
        }
    },
    compliments: {
        interval: 30000,
        fadeInterval: 4000,
        morning: [
            'Bonne journée!',
            'Profitez de votre journée!',
            'Avez vous bien dormi?'
        ],
        afternoon: [
            'Salut beauté!',
            'Carpe diem!',
            'Quelle belle journée!'
        ],
        evening: [
            'Il est tard!',
            'Bonne soirée!'
        ]
    },
    calendar: {
        maximumEntries: 10,
        url: "https://calendar.google.com/calendar/ical/uf5c94l57p3bhtsmfkou2hpb9o%40group.calendar.google.com/private-24c7e6fde675fa7bb05ad62d9dd4e616/basic.ics"
    },
    news: {
        feed: 'https://fr.news.yahoo.com/rss/france',
        interval: 10000
    },
    speech: {
        // https://github.com/TalAter/annyang/blob/master/docs/README.md#languages
        lang: 'fr-FR',
        // if you want a master-command before any others commands, you can set it here
        masterCommand: 'jarvis',
        // your commands
        commands: {
            'stop news': function() {
                $('.bottom').hide();
            },
            'refresh': function() {
                location.reload();
            },
            'news korben': function() {
                // TODO: reset news setTimeout
                news.feed = 'http://korben.info/feed';
                news.init();
            },
            'aide': function() {
                speech.help();
            }
        }
    }
}
