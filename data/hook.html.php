<?php
sleep(1);
header('text/html');
?>

<h1><samp>hook</samp>ing</h1>
<p>By default, I'm centered to my target. But I also have hooking options, one for target / one for tip. <samp>t</samp> stands for top, </p>
<pre style="text-align:left;"><code>
$('#foo').tip({
    <strong>hook</strong>: {
        target: 'bc',
        tip: 'tc'
    }
});
</code></pre>

<p class="clue">Close me to continue...</p>