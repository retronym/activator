define(['webjars!knockout', './router', './navigation'], function(ko, router, navigation) {

	// Model for the whole app view; created in two parts
	// so that this first part is available during construction
	// of the second part.
	var model = {
		plugins: null, // filled in by init to prevent cycles
		router: router,
		tutorial: null, // filled in by init to prevent cycles
		snap: {
			// TODO - replace uses of this with app.name() below
			appName: window.serverAppModel.name ? window.serverAppModel.name : window.serverAppModel.id,
			pageTitle: ko.observable(),
			activeWidget: ko.observable(""),
			// TODO load last value from somewhere until we get a message from the iframe
			signedIn: ko.observable(false),
			app: {
				name: ko.observable(window.serverAppModel.name ? window.serverAppModel.name : window.serverAppModel.id),
				hasAkka: ko.observable(false),
				hasPlay: ko.observable(false),
				hasConsole: ko.observable(false)
			}
		},
		// This is the initialization of the application...
		init: function(plugins, tutorial) {
			var self = this;
			self.widgets = [];
			self.plugins = plugins;
			self.tutorial = tutorial;
			// TODO - initialize plugins in a better way perhaps...
			$.each(self.plugins.list, function(idx,plugin) {
				self.router.registerRoutes(plugin.routes);
				$.each(plugin.widgets, function(idx, widget) {
					self.widgets.push(widget);
				});
			});
			self.router.init();
			ko.applyBindings(self, window.body);
			navigation.init();
		}
	};

	return model;
});
