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
    $.widget('abernier.tip', {
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
            
            // Create the widget singleton
            this.$widget = this.widget();
            
            // Cache some remarkable widget's elements
            this.$head          = this.$widget.find('.hd');
            this.$closeButton   = this.$widget.find('.close-button');
            this.$body          = this.$widget.find('.bd');
            this.$stem          = this.$widget.find('.stem');
            
            this.supportedStemClasses = ['tl', 'tc', 'tr', 'rt', 'rc', 'rb', 'br', 'bc', 'bl', 'lb', 'lc', 'lt'];
            this.supportedHookPositions = this.supportedStemClasses.concat('cc');
            
            // Force options' setting even on widget's creation, eg: $foo.tip().tip({bar: 3}) <=> $foo.tip({bar: 3})
            this._setOptions(this.options);
            
            //
            // Register some events for open/close
            //
            
            // Open
            this.element.bind($.map(this.options.openOn.join(' '), $.proxy(function (el, i) {
                return el + '.' + this.widgetEventPrefix;
            }, this)), $.proxy(function (event) {
                this.open(event);
            }, this));
            
            // Close
            events = {};
            if (this.options.closeOn.length < 1) {
                // Auto-close if none 'closeOn' option given (and if there is a close button)
                if (this.options.closeButton) {
                    this.$closeButton.bind('click.tip', $.proxy(function (event) {
                        this.close();
                    }, this));
                }
            } else {
                this.element.bind($.map(this.options.closeOn.join(' '), $.proxy(function (el, i) {
                    return el + '.' + this.widgetEventPrefix;
                }, this)), $.proxy(function (event) {
                    this.close();
                }, this));
            }
            
            // Inject the $widget to the DOM
            this.$widget.appendTo('body').hide();
            
            // Auto-open if none 'openOn' option
            if (this.options.openOn.length < 1) {
                this.open();
            }
            
            //
            // Listen for options changes that associated elements require an immediate update
            //
            
            this.element.bind('tipsetoption', $.proxy(function (event, data) {
                //console.log("option '%s' has just changed from '%s' to '%s'", data.option, data.original, data.current);
                
                // Does not update elements if closed
                if (!this._isOpen()) {
                    return;
                }
                
                switch (data.option) {
                case 'title':
                    this._updateHead();
                    this._reposition();
                    break;
                case 'closeButton':
                    this._updateCloseButton();
                    break;
                case 'content':
                    this._updateBody();
                    this._reposition();
                    break;
                case 'target':
                    this._reposition();
                    break;
                case 'hook':
                    this._updateStem();
                    this._reposition();
                    break;
                case 'stem':
                    this._updateStem();
                    this._reposition();
                    break;
                }
            }, this));
        },
        _init: function () {
            //console.log('_initing...', 'this.options=', this.options);
        },
        widget: function () {
            return this.$widget || $.tmpl('' +
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
        open: function (event) {
            //console.log('opening...', event);
            
            // Does not open is already opened
            if (this._isOpen()) {
                return;
            }
            
            this._trigger("beforeOpen", event);
            
            // Reveal the tip element
            this.$widget.show();
            
            this._updateBody(event);
            
            this._trigger("afterOpen", event);
        },
        enable: function (event) {
            //console.log('enabling...');
            $.Widget.prototype.enable.apply(this, arguments);
        },
        disable: function (event) {
            //console.log('disabling...', event);
            $.Widget.prototype.disable.apply(this, arguments);
        },
        destroy: function () {
            $.Widget.prototype.destroy.apply(this, arguments);
            this.$widget.remove();
        },
        _isOpen: function () {
            return this.$widget.is(':visible');
        },
        _updateBody: function (event) {
            //console.log('_updatingBody...');
            
            var that = this,
                bodyBackup = this.$body.clone(true, true);
            
            this.$body.empty();
            this._reposition(event);
            
            //console.log(content);
            $.when(this.options.content).then(
                // Success
                function (content) {
                    that.$body.html(content);
                    that._reposition(event);
                },
                // Failure
                function () {
                    that.$body.html(bodyBackup);
                    that._reposition(event);
                }
            );
        },
        _reposition: function (event) {
            //console.log('_repositioning...')
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
                at,
                $target;
            
            // Does not reposition if closed
            if (!this._isOpen()) {
                return;
            }
            
            $target = event && $(event && event.target) || this.options.target;
            if (!$target.length) {
                return;
            }
            
            my = longVersion[this.options.hook.tip];
            at = longVersion[this.options.hook.target];
            //console.log('of', this.options.target, 'my:', my, 'at:', at);
            
            this.$widget.position({
                of: $target,
                my: my,
                at: at,
                //offset: $( "#offset" ).val(),
                //using: using,
                collision: 'none none'
            });
        },
        _updateHead: function () {
            var content = this.options.title;
            
            if (content) {
                this.$head.html(content);
            }
        },
        _updateStem: function () {
            this.$widget.removeClass(this.supportedStemClasses.join(' '));
            if (this.options.stem && this.options.hook && this.options.hook.tip) {
                this.$widget.addClass(this.options.hook.tip);
            }
        },
        _updateCloseButton: function () {
            if (this.options.closeButton) {
                this.$closeButton.show();
            } else {
                this.$closeButton.hide();
            }
        },
        close: function (event) {
            //console.log('closing...');
            this._trigger("beforeClose", event);
            
            this.$widget.hide();
            
            this._trigger("afterClose", event);
        },
        _setOption: function (k, v) {
            //console.log('_settingOption...', 'key=', k, 'value=', v);
            var oldValue = this.options[k];
            
            switch (k) {
            case 'title':
                v = v || '';
                break;
            case 'closeButton':
                // Normalize to boolean value
                v = v ? true : false;
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
                v.target = v.target && ($.inArray(v.target, this.supportedHookPositions) > -1) ? v.target : 'cc';
                v.tip =  v.tip && ($.inArray(v.tip, this.supportedHookPositions) > -1) ? v.tip : 'cc';
                break;
            case 'stem':
                // Normalize 'stem' to boolean value
                v = v ? true : false;
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
                this.$widget.addClass(v);
                break;
            }
            //console.log('_settedOption', 'key=', k, 'value=', v);
            $.Widget.prototype._setOption.apply(this, arguments);
            
            //
            // Publish option changes (PubSub pattern)
            //
            this.element.trigger("tipsetoption", {
                option: k,
                original: oldValue,
                current: v
            });
            
            return this;
        }
    });
}(jQuery));