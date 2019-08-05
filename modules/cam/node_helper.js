var NodeHelper = require("node_helper");
var exec = require("child_process").exec;


module.exports = NodeHelper.create({
	start:function(){
		this.displayState = 'ON';
	},
	socketNotificationReceived: function(notification,payload)
	{
		console.log("face detection", notification);
			switch(this.displayState){
			case 'ON':
                                if (notification='NO_FACE')
                                        this.wait(true);
                                break;
			case 'OFF':
				if (notification='GOT_FACE')
					this.displayOn();
				break;
			case 'WAIT':
                                if (notification='GOT_FACE')
                                        this.wait(false);
                                break;
			}

	},
	wait:function(start){
		var self = this;
		if (start){
			self.displayState= 'WAIT';
			self.waitTimer = setTimeout(function(){
								self.displayOff();
							},60000);
							} else {
								clearTimeout(self.waitTimer);
							}
	},
	displayOff: function(){
		var self=this;
		console.log("Turning display ON...");
		exec("/usr/bin/tvservice -o", function(err,out){
			if (err){
				console.log("Motitor Açılamadı!!!");
				return;
				}
			self.displayState='OFF';
		});
	},
	displayOn:function(){
		 var self=this;
                console.log("Turning display ON...");
                exec("/usr/bin/tvservice -p", function(err,out){
                        if (err){
                                console.log("Motitor Açılamadı!!!");
                                return;
                                }

		exec("/usr/bin/xset dpms force on", function(err,out){
			if (err){
				return;
				}
                        self.displayState='ON';
                });
		});

	}
});
