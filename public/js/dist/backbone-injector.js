(function() {
	//Store the normal Backbone configure method, so we can call it from within the function that overrides it
	var _superConfigure = Backbone.View.prototype._configure;

	_.extend(Backbone.View.prototype, {

		injector: null,

		_configure: function(options) {
			if(_superConfigure!=null) {
				_superConfigure(options);
			}

			if(options.injector!=undefined) {
				options.injector.injectInto(this);
			}
		}

	});
})();
