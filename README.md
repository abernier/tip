# Installation

`make` will generate:

1. `dist/jquery.ui.tip[.min].js`
2. `dist/jquery.ui.tip.css`

# Usage

    $el.tip([<options>])
    
    <options>: A list of options for a tip's widget instance.
    
        {
            [content: <content>]
            [,closeButton: <closeButton>]
            [,target: <target>]
            [,hook: <hook>]
            [,stem: <stem>]
            [,openOn: <openOn>]
            [,closeOn: <closeOn>]
            [,addClass: <addClass>]
        }
    
        Default: {}
    
            <content>: The content for the tip.
    
                '<html content>' | Deferred
    
                Default: $el.attr('title')
    
            <closeButton>: Whether to display a control to close the tip.
    
                true | false
    
                Default: true
    
            <target>: The element the tip is in relation to.
    
                'selector' | jQuery | node
    
                Default: $el
    
            <hook>: Hooking allows you to place your tip anywhere in relation to your target elements. The concept is simple, you define two corners that you want to 'hook' to eachother. One on the target element, the other one on the tooltip.
    
                {
                    [target: <target>]
                    [,tip: <tip>]
                }
    
                    <target>: <position>
                    <tip>: <position>
    
                        <position>: 'cc' | 'tl' | 'tc' | 'tr' | 'lt' | 'lc' | 'lb' | 'br' | 'bc' | 'bl' | 'lb'| 'lc' | 'lt'
    
                Default:    {
                                target: 'cc',
                                tip: 'cc'
                            }
    
            <stem>: A way to show where the tip come from.
    
                true | false
    
                Default: false
    
            <openOn>: 
    
                '<eventA> <eventB> ...' | ['<eventA>', '<eventB>', ...]
    
                Default: ''
    
            <closeOn>: 
    
                '<eventA> <eventB> ...' | ['<eventA>', '<eventB>', ...]
    
                Default: ''
    
            <addClass>:
                
                'customA customB ...'
    
                Default: ''
