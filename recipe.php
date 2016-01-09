<?php
//libxml_use_internal_errors(true);

$recipe = $_GET['recipe'];

echo get_recipe($recipe);

function get_recipe($recipe) {
    global $doc, $xpath;

    $url = 'http://www.marmiton.org/recettes/recherche.aspx?aqt='.urlencode($recipe);

    $pageList = file_get_contents($url);

    // get response list and match recipes titles
    if(preg_match_all('#m_titre_resultat[^\<]*<a .*title="(.+)".* href="(.+)"#isU', $pageList, $matchesList)) {
        // echo"<xmp>";print_r($matchesList[1]);echo"</xmp>";

        // for each recipes titles
        // foreach($matchesList[1] as $recipeTitle) {
        // }

        // take first recipe
        $n = 0;
        $url = 'http://www.marmiton.org'.$matchesList[2][$n];

        $pageRecipe = file_get_contents($url);

        // get recipe (minimize/clean before dom load)
        if(preg_match('#<div class="m_content_recette_main">.*<div id="recipePrevNext2"></div>\s*</div>#isU', $pageRecipe, $match)) {
            $recipe = $match[0];
            $recipe = preg_replace('#<script .*</script>#isU', '', $recipe);

            $doc = loadDOC($pageRecipe);
            $xpath = new DOMXpath($doc);

            $recipeTitle = fetchOne('//h1[@class="m_title"]');
            $recipeMain = fetchOne('//div[@class="m_content_recette_main"]');

            return '<div class="recipe_root">'.$recipeTitle . $recipeMain.'</div>';

        }
    }
}

function loadDOC($html) {
    $doc = new DOMDocument('1.0', 'UTF8');
    $doc->formatOutput=false;
    @$doc->loadHTML($html, LIBXML_COMPACT | LIBXML_NOERROR | LIBXML_NOBLANKS | LIBXML_NOWARNING | LIBXML_ERR_NONE | LIBXML_NOXMLDECL | LIBXML_HTML_NODEFDTD | LIBXML_PARSEHUGE);
    return $doc;
}

function fetchOne($query) {
    global $doc, $xpath;
    if($res = $xpath->query($query)) {
        return $doc->saveHTML($xpath->query($query)->item(0));
    }
    return false;
}