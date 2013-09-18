describe("Injectable View", function() {

	var injectorInstance;

	beforeEach(function() {
		injectorInstance = new injector.Injector();
	});

	it("automatically injects the view instance when the injector is passed as an argument during instantiation", function() {
		var model = new Backbone.Model();
		injectorInstance.map('model').toValue(model);

		var ViewClass = Backbone.View.extend({
			model: 'inject'
		});

		var view = new ViewClass({injector:injectorInstance});

		expect(view.model).toEqual(model);
	});

});