Module.register("cam", {
   getScripts:function(){
	return[
		this.file("cam.css")
	      ];
   },
   start:function(){
	var self = this;
	Log.info("Starting ",self.name);
	self.initDone = false;
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
			
