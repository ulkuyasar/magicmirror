# Module: DeFacto'ya Hoşgeldiniz
The `hellodefacto` module is one of the default modules of the MagicMirror. It is a simple way to display a static text on the mirror.
## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: "hellodefacto",
		position: "bottom_bar",	// This can be any of the regions.
		config: {
			// See 'Configuration options' for more information.
			text: "DeFacto'ya Hoşgeldiniz!"
		}
	}
]
````

## Configuration options

The following properties can be configured:

| Option | Description
| ------ | -----------
| `text` | The text to display. <br><br> **Example:** `'DeFacto'ya Hoşgeldiniz!'` <br> **Default value:** `'DeFacto'ya Hoşgeldiniz!'`
