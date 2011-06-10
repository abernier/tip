<?php
sleep(1);
header('text/html');
?>

<h1>Dynamic <samp>content</samp></h1>
<p>A function can also be set as <samp>content</samp> in order for example fetching content from server, eg:</p>
<pre style="text-align:left;"><code>
$('#foo').tip({
    content: <strong>function</strong> (response) {
        $.get('data/ajax.html', response);
        return 'loading...';
    }
});
</code></pre>

<p class="clue">Close me to continue...</p>