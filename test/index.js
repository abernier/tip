jQuery(document).ready(function ($) {
    test(".tip()", function () {
        var instance = $('#foo').tip(),
            $tip = instance.tip('widget'),
            $body = $('.bd', $tip),
            $closeButton = $('.close-button', $tip);

        ok($('.tip').length === 1, "One tip was injected in the DOM")
        
        deepEqual($('.tip').get(), $tip.get(), "And this is our $tip");
        
        ok($tip.is(':visible'), 'tip is opened');
        
        ok($closeButton.is(':visible'), "tip has a close button");
        
        equal($body.html(), instance.attr('title'), "tip's body is set to the [title] attribute");
        
        ok($tip.find('.stem').is(':visible'), "tip's stem is not displayed");
        
        // Detect hooking?
        
        var newContent = 'custom content';
        instance.tip({content: newContent});
        equal($body.html(), newContent, "Content was updated");
        
        
        
        $closeButton.trigger('click');
        ok(!$tip.is(':visible'), 'After clicked on the close-button, tip is closed');
        
        instance.tip('destroy');
        ok($('.tip').length === 0, "Our tip was removed from DOM")
    });
});