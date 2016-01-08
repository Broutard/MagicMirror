<?php

$recipe = $_GET['recipe'];

echo get_recipe($recipe);

function get_recipe($recipe) {

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

        // get recipe
        if(preg_match('#<div class="m_content_recette_cadre">.*<div id="recipePrevNext2"></div>\s*</div>#isU', $pageRecipe, $match)) {
            $recipe = $match[0];
            $recipe = preg_replace('#<script .*</script>#isU', '', $recipe);
            return $recipe;
        }
    }
}