<?php

$url = "colors.xml";

$xml = simplexml_load_file($url) or die("could not connect");

$fileContents = "<ul>\n";
$styles = "";

foreach($xml->color as $color){

	$word 			 = trim($color->word);
	$hex 			 = trim($color->hex);
	$wordType 		 = trim($color->typeOfSpeech);
	$defined 		 = trim($color->defined);
	$sourceName		 = trim($color->sourceName);
	$sourceURL		 = trim($color->sourceURL);
	$safeClass		 = ereg_replace("[^A-Za-z0-9]", "", $word);

	$fileContents 	.= "\t\t<li id='" . $safeClass . "' class='color'>\n";
	$fileContents 	.= "\t\t\t<div class='hex-wrapper'>\n";
	$fileContents 	.= "\t\t\t\t<div class='hex-spacer'>\n";
	$fileContents 	.= "\t\t\t\t\t<h3>#" . $hex . "</h3>\n";
	$fileContents 	.= "\t\t\t\t</div>\n";
	$fileContents 	.= "\t\t\t\t<dl>\n";
	$fileContents 	.= "\t\t\t\t\t<dt>" . $word . "</dt>\n";
	$fileContents 	.= "\t\t\t\t\t<dd>\n";
	$fileContents 	.= "\t\t\t\t\t\t<h4>" . $wordType . "</h4>\n";
	$fileContents 	.= "\t\t\t\t\t\t<p>" . $defined . "</p>\n";
	$fileContents 	.= "\t\t\t\t\t</dd>\n";
	$fileContents 	.= "\t\t\t\t</dl>\n";
	$fileContents 	.= "\t\t\t</div>\n";
	$fileContents 	.= "\t\t</li>\n";

	$styles			.= "#" . $safeClass . " {\n";
	$styles			.= "border-top: 1px solid lighten(#" . $hex . ", 10%);\n";
	$styles			.= "border-bottom: 1px solid darken(#" . $hex . ", 10%);\n";
	$styles			.= "background: #" . $hex . ";\n";

	$styles			.= "h3 {\n";
	$styles			.= "color: #" . $hex . ";\n";
	$styles			.= "}\n";

	$styles			.= ".hex-spacer {\n";
	$styles			.= "border-right: 1px solid #" . $hex . ";\n";
	// $styles			.= "border-right: 1px solid #f0f;\n";
	$styles			.= "}\n";

	$styles			.= "}\n";

	// $styles			.= "#" . $safeClass . " .hex-spacer {\n";
	// $styles			.= "border-right: 1px solid #" . $hex . ";\n";
	// $styles			.= "}\n";

}

$fileContents .= "</ul>\n";

$myFile = "content.php";
$fh = fopen($myFile, 'w') or die("can't open file");
fwrite($fh, $fileContents);
fclose($fh);


$myFile = "../styles/scss/addins/_color-classes.scss";
$fh = fopen($myFile, 'w') or die("can't open file");
fwrite($fh, $styles);
fclose($fh);
