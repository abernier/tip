(function ($) {
    //
    // $.ui.tip
    // 
    // Tip widget
    // 
    // @depends     jquery.js
    // @depends     jquery.ui.core.js
    // @depends     jquery.ui.widget.js
    // @depends     jquery.ui.abernier.widget.js
    // @depends     jquery.tmpl.js
    // @copyright   © 2011 Iscool Entertainment
    // @author      Antoine BERNIER (abernier)
    //
    $.widget('abernier.tip', $.abernier.widget, {
        // default options
        options: {
            disabled: false,
            title: '',
            closeButton: true,
            content: null,
            target: null,
            hook: {
                target: null,
                tip: null
            },
            stem: null,
            openOn: null,
            closeOn: null,
            addClass: ''
        },
        _create: function () {
            //console.log('_creating...', 'this.options=', this.options);
            
            $.Widget.prototype._create.apply(this, arguments);
            
            var events;
            
            //
            // Create the tip's markup
            //
            
            this.$tip = this._tip();
            
            // Cache some remarkable elements
            this.$title         = this.$tip.find('.hd');
            this.$closeButton   = this.$tip.find('.close-button');
            this.$content       = this.$tip.find('.bd');
            this.$stem          = this.$tip.find('.stem');
            
            // Force options' setting even on widget's creation, eg: $foo.tip().tip({bar: 3}) <=> $foo.tip({bar: 3})
            this._setOptions(this.options);
            
            //
            // Register some events
            //
            
            // Open
            events = {};
            $.each(this.options.openOn, function (event, index) {
                events[event] = 'open';
            });
            this._bind(events);
            
            // Close
            events = {};
            if (this.options.closeOn.length < 1) {
                // Auto-close if none 'closeOn' option given (and if there is a close button)
                if (this.options.closeButton) {
                    this._bind(this.$closeButton, {'click': 'close'});
                }
            } else {
                $.each(this.options.closeOn, function (event, index) {
                    events[event] = 'close';
                });
            }
            this._bind(events);
            
            // Inject the $tip to the DOM
            this.$tip.appendTo('body').hide();
            
            // Auto-open if none 'openOn' option
            if (this.options.openOn.length < 1) {
                this.open();
            }
        },
        _init: function () {
            //console.log('_initing...', 'this.options=', this.options);
        },
        open: function (event) {
            //console.log('opening...', event);
            var that = this,
                $target,
                contentBackup;
            
            // Define the target from event (if defined) -- fallback to options
            $target = event && $(event && event.target) || this.options.target;
            if (!$target.length) {
                return;
            }
            
            this._trigger("beforeOpen", event);
            
            contentBackup = this.$content.clone(true, true);
            this.$content.empty();
            // Reveal the tip element
            this.$tip.show();
            this.reposition($target);
            
            //
            // When deferred content is done, show it
            //
            
            $.when(this.options.content).then(
                function (content) {
                    that.$content.html(content);
                    // Position it according to its target
                    that.reposition($target);
                },
                function () {
                    that.$content.html(contentBackup);
                    // Position it according to its target
                    that.reposition($target);
                }
            );
            
            this._trigger("afterOpen", event);
        },
        close: function (event) {
            //console.log('closing...');
            this._trigger("beforeClose", event);
            
            this.$tip.hide();
            
            this._trigger("afterClose", event);
        },
        enable: function (event) {
            //console.log('enabling...');
            $.Widget.prototype.enable.apply(this, arguments);
        },
        disable: function (event) {
            //console.log('disabling...', event);
            $.Widget.prototype.disable.apply(this, arguments);
        },
        reposition: function ($target) {
            //console.log('repositioning...', $target)
            var longVersion = {
                    cc: 'center center',
                    tl: 'left top',
                    tc: 'center top',
                    tr: 'right top',
                    rt: 'right top',
                    rc: 'right center',
                    rb: 'right bottom',
                    br: 'right bottom',
                    bc: 'center bottom',
                    bl: 'left bottom',
                    lb: 'left bottom',
                    lc: 'left center',
                    lt: 'left top'
                },
                my,
                at;
            // Default position
            if (!$target) {
                $target = this.options.target;
            }
            
            my = longVersion[this.options.hook.tip];
            at = longVersion[this.options.hook.target];
            //console.log('my:', my, 'at:', at);
            
            this.$tip.position({
                of: $target,
                my: my,
                at: at,
                //offset: $( "#offset" ).val(),
                //using: using,
                collision: 'none none'
            });
        },
        _setOption: function (k, v) {
            //console.log('_settingOption...', 'key=', k, 'value=', v);
            
            var supportedStemClasses = ['tl', 'tc', 'tr', 'rt', 'rc', 'rb', 'br', 'bc', 'bl', 'lb', 'lc', 'lt'],
                supportedHookPositions = supportedStemClasses.concat('cc');
            
            switch (k) {
            case 'title':
                v = v || '';
                if (v) {
                    this.$title.text(v);
                }
                break;
            case 'closeButton':
                // Normalize to boolean value
                v = v ? true : false;
                // Show/hide consequently
                if (!v) {
                    this.$closeButton.hide();
                } else {
                    this.$closeButton.show();
                }
                break;
            case 'content':
                // Fallback 'content' to [title]
                v = v || this.element.attr('title');
                break;
            case 'target':
                // Fallback 'target' to instance's element
                v = v || this.element;
                break;
            case 'hook':
                // Normalize 'hook' to {target: , tip: }
                v = v || {};
                v.target = v.target && ($.inArray(v.target, supportedHookPositions) > -1) ? v.target : 'cc';
                v.tip =  v.tip && ($.inArray(v.tip, supportedHookPositions) > -1) ? v.tip : 'cc';
                
                // Updating stem (if necessary)
                if (this.options.stem) {
                    this.$tip.removeClass(supportedStemClasses.join(' ')).addClass(v.tip);
                }
                break;
            case 'stem':
                // Normalize 'stem' to boolean value
                v = v ? true : false;
                this.$tip.removeClass(supportedStemClasses.join(' '));
                if (v) {
                    this.$tip.addClass(this.options.hook.tip);
                }
                break;
            case 'openOn':
                // Normalize 'openOn' to an array
                v = v && (!$.isArray(v) ? $.trim(v).split(/\s+/) : v)/* || ['mouseenter']*/|| [];
                break;
            case 'closeOn':
                // Normalize 'closeOn' to an array
                v = v && (!$.isArray(v) ? $.trim(v).split(/\s+/) : v) || [];
                break;
            case 'addClass':
                this.$tip.addClass(v);
                break;
            }
            //console.log('_settedOption', 'key=', k, 'value=', v);
            $.Widget.prototype._setOption.apply(this, arguments);
            
            return this;
        },
        _tip: function () {
            return this.$tip || $.tmpl('' +
                '<div class="tip">' +
                    '<div class="in">' +
                        '<span class="close-button">x</span>' +
                        '<div class="hd"></div>' +
                        '<div class="bd"></div>' +
                        '<div class="ft"></div>' +
                    '</div>' +
                    '<span class="stem"></span>' +
                '</div>');
        },
        destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
            this.$tip.remove();
        }
    });
}(jQuery));