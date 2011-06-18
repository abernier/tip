# Build

`make` will generate:

1. `dist/jquery.ui.tip[.min].js`
2. `dist/jquery.ui.tip.css`

# Load

1. The stylesheet:

 `<link rel="stylesheet" href="jquery.ui.tip.css" />`

2. The widget:

 `<script src="jquery.ui.tip.js"></script>`

 which has the following dependencies: [jquery](https://ajax.googleapis.com/ajax/libs/jquery/1.6.1/jquery.min.js), [jquery-ui](https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.13/jquery-ui.min.js), [jquery-tmpl](http://ajax.aspnetcdn.com/ajax/jquery.templates/beta1/jquery.tmpl.min.js)

# Use

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
