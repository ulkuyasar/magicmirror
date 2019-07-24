/* global Module */

/* Magic Mirror
 * Module: hellodefacto
 *
 */

Module.register("hellodefacto",{

	// Default module config.
	defaults: {
		text: "Defacto'ya Hoşgeldiniz!",
		text2: "Yasarın evine Hoşgeldiniz!"
	},

	getTemplate: function () {
		return "hellodefacto.njk";
	},

	getTemplateData: function () {
		return this.config;
	}
});
