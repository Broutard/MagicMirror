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
        lang: 'fr-FR',
        commands: {
            'stop': function() {
              annyang.abort();
            },
            'debug': function() {
                console.log('DEBUG ON');
                annyang.debug();
            },
            'jarvis': function() {

            }
        }
    }
}
