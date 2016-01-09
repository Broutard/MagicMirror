<!DOCTYPE html>
<?php $gitHash = trim(`git rev-parse HEAD`) ?>
<html>
<head>
	<title>Magic Mirror</title>
    <?php
    $css = [
        'css/main.css',
        'css/font-awesome.css',
        'css/weather-icons.css',
        'css/recipe.css'
    ];
    foreach($css as $v) {
        echo '<link rel="stylesheet" type="text/css" href="'.$v.'?nocache='.$gitHash.'">'.PHP_EOL;
    }
    ?>
	<script type="text/javascript">
		var gitHash = '<?php echo $gitHash ?>';
	</script>
	<meta name="google" value="notranslate" />
	<meta http-equiv="Content-type" content="text/html; charset=utf-8" />
</head>
<body>
    <div id="speech"><i class="fa fa-microphone"></i></div>
    <div id="layer"></div>

	<div class="top left"><div class="date small dimmed"></div><div class="time"></div><div class="calendar xxsmall"></div></div>
	<div class="top right"><div class="windsun small dimmed"></div><div class="temp"></div><div class="forecast small dimmed"></div></div>
	<div class="center-ver center-hor"><!-- <div class="dishwasher light">Vaatwasser is klaar!</div> --></div>
	<div class="lower-third center-hor"><div class="compliment light"></div></div>
	<div class="bottom center-hor"><div class="news medium"></div></div>

</div>
<?php
$scripts = [
    'js/jquery.js',
    'js/jquery.feedToJSON.js',
    'js/ical_parser.js',
    'js/moment-with-locales.min.js',
    'js/annyang.min.js',

    'js/config.js',
    'js/rrule.js',

    'js/version/version.js',
    'js/calendar/calendar.js',
    'js/compliments/compliments.js',
    'js/weather/weather.js',
    'js/time/time.js',
    'js/news/news.js',
    'js/speech/speech.js',

    'js/main.js'
];
foreach($scripts as $v) {
    echo '<script src="'.$v.'?nocache='.$gitHash.'"></script>'.PHP_EOL;
}
?>
</body>
</html>
