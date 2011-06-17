/*
* Custom jQuery UI prototype
*/
(function ($) {
$.widget('abernier.widget', {
    _createWidget: function (options, element) {
        this.bindings = $();
        $.Widget.prototype._createWidget.apply(this, arguments);
    },
    _getCreateOptions: function () {
        //
        // Grab the options from element's classes before applying default options
        //

        return {};
    },
    destroy: function () {
        this.bindings.unbind("." + this.widgetName);
        $.Widget.prototype.destroy.apply(this, arguments);
    },
    _bind: function (element, handlers) {
        // no element argument, shuffle and use this.element
        if (!handlers) {
            handlers = element;
            element = this.element;
        } else {
            // accept selectors, DOM elements
            element = $(element);
            this.bindings = this.bindings.add(element);
        }
        var instance = this;
        $.each(handlers, function(event, handler) {
            element.bind(event + "." + instance.widgetName, function () {
                // allow widgets to customize the disabled handling
                // - disabled as an array instead of boolean
                // - disabled class as method for disabling individual parts
                if (instance.options.disabled === true || $(this).hasClass("ui-state-disabled")) {
                    return;
                }
                return (typeof handler === "string" ? instance[handler] : handler).apply(instance, arguments);
            });
        });
    }
});
}(jQuery));