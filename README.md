# backbone-injector [![Build Status](https://travis-ci.org/biggerboat/backbone-injector.png)](https://travis-ci.org/biggerboat/backbone-injector)

Automatic dependency injection within all ```Backbone.View``` instances. This is build on top of [Backbone](https://github.com/jashkenas/backbone) and [injector.js](https://github.com/biggerboat/injector.js)

## Install
You could just download ```backbone-injector.js``` or ```backbone-injector.min.js``` from the project root.

We advise you to download it using [Bower](http://http://bower.io/) instead:  
```bower install backbone-injector```
This command will automatically download all dependencies. So in this case it takes care of downloading 
[injector.js](https://github.com/biggerboat/injector.js), jQuery, Backbone and Underscore for you.

## Usage
To use the dependency injection, you need to pass an instance of the injector as the ```injector``` argument while instantiating a view.
This plugin will take care of the boilerplate and automatically injects the view before the ```initialize``` method is called.

See for example the following code stemming from a Jasmine test:
```JavaScript
var model = new Backbone.Model();
var injectorInstance = new injector.Injector();
injectorInstance.map('model').toValue(model);

var ViewClass = Backbone.View.extend({
	model: 'inject'
});

var view = new ViewClass({injector:injectorInstance});

expect(view.model).toEqual(model);
```

Under the hood the ```Backbone.View``` is adjusted prototype and make sure the dependency injection takes place before the ```initialize``` method is called.
Thus it is safe to rely on the view to be injected once you start using it.

We also inject the injector inside each view. This is for convenience, so you can easily pass it on to other view instances.
```JavaScript
var injectorInstance = new injector.Injector();
var view = new ViewClass({injector:injectorInstance});

expect(view.injector).toEqual(injectorInstance);
```

## Support
Feel free to create a [new issue](https://github.com/biggerboat/backbone-injector/issues/new) for all your questions, issues or feature requests.
