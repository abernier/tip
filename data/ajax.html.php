<?php
sleep(4);
header('text/html');
?>

<h1>Dynamic <samp>content</samp></h1>
<p>A <a href="http://api.jquery.com/category/deferred-object/">Deffered object</a> can also be set as <samp>content</samp> in order for example fetching content from server, eg:</p>
<pre style="text-align:left;"><code>
$('#foo').tip({
    content: <strong>$.get</strong>('data/ajax.html')
});
</code></pre>

<p class="clue">Close me to continue...</p>