<?php
sleep(1);
header('text/html');
?>

<h1><samp>target</samp></h1>
<p>My default target is the element I'm instanciated over, but you can tweak this with the <samp>target</samp> option, eg:</p>
<pre style="text-align:left;"><code>
$('#foo').tip({
    <strong>target</strong>: $('#bar')
});
</code></pre>

<p class="clue">Close-me to continue...</p>