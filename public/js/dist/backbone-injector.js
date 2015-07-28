(function(root, factory) {

    // Start with AMD.
    if (typeof define === 'function' && define.amd) {
        define(['underscore', 'backbone'], function(_, Backbone) {
        factory( _, Backbone);
    });

    // Next for Node.js or CommonJS.
    } else if (typeof exports !== 'undefined' && typeof require === 'function') {
        var _ = require('underscore'),
        Backbone = require('backbone');
        factory(_, Backbone);

    // Finally, as a browser global.
    } else {
        factory(root._, root.Backbone);
    }
}(this, function factory(_, Backbone) {

    var _super = Backbone.View;

    function InjectableView(options) {
        if(options.injector !== undefined) {
            options.injector.injectInto(this);
        }
        _super.call(this, options);
    }

    InjectableView.prototype = _super.prototype;
    InjectableView.prototype.injector = "inject";
    InjectableView.extend = _super.prototype.constructor.extend;

    Backbone.View = InjectableView;
}));
