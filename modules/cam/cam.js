Module.register("cam", {
   getScripts:function(){
	return[
		this.file("cam.css"),
		this.file("tracking-min.js"),
		this.file("face-min.js")
	      ];
   },
   start:function(){
	var self = this;
	Log.info("Starting ",self.name);
	self.initDone = false;
	var tracker = new tracking.ObjectTracker('face');
	tracker.setInitialScale(1);
	tracker.setStepSize(2);
	tracker.setEdgesDensity(0.1);
	tracker.on('track',function(event){
		if (event.data.length>0)
			self.sendSocketNotification("GOT_FACE",{});
		else
			 self.sendSocketNotification("NO_FACE",{});
	});
	var hiddenCanvas = document.createElement("canvas");
	hiddenCanvas.width = 320;
	hiddenCanvas.height = 240;
	var canvasContext = hiddenCanvas.getContext("2d");

	var initVideo = function(){
		var video=document.getElementById("video");
		if (self.initDone)
			return;
		if (!video){
			setTimeout(initVideo,100);
			return;
		}
		navigator.mediaDevices.getUserMedia({video: {
			mandatory:{
				minWidth: 640,
				minHeight:480
				},
				optional: [
						{minFrameRate:60}
					  ]
		} })
		   .then(function(stream){
			video.src=window.URL.createObjectURL(stream);
			video.play();
			setInterval(function(){
							canvasContext.drawImage(video,0,0,320,240);
							tracking.track(hiddenCanvas,tracker);
				        	},5000);
		   });
		self.initDone = true;
		};
	initVideo();
   },
   getDom: function(){
	var el = document.createElement("div");
	el.innerHTML = '<div class="fullscreen_video"><video id="video" autoplay></video></div>';
	return el;
   }
});
			
