		(function() 
			{
			  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
										  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
			  window.requestAnimationFrame = requestAnimationFrame;
			})();
	
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
		window.URL = window.URL || window.webkitURL;
		var streamVideo = document.getElementById('monitor');
	
		var c = document.getElementById("canvas");
		var ctx = c.getContext('2d');
		
		function gotStream(stream)
			{
				if (window.URL) 
					{
						streamVideo.src = window.URL.createObjectURL(stream);
					} 
				else 
					{
						streamVideo.src = stream; 
					}
		
				streamVideo.onerror = function(e) 
					{
						stream.stop();
					};
		
				stream.onended = noStream;
		
				streamVideo.onloadedmetadata = function(e) 
					{
						
					};
			}
		
		function init(el) 
			{
				if (!navigator.getUserMedia) 
					{
						document.getElementById("errorMessage").innerHTML = "Navegador do usuário não permite acesso à webcam.";
						return;
					}
				navigator.getUserMedia({video: true}, gotStream, noStream);
				document.getElementById('status').innerHTML = "Capturando video";
			}
			
		function noStream(e) 
			{
				var msg = "Usuário não possui webcam.";
				
				if (e.code == 1) 
					{
						msg = "Usuário não permitiu acesso à webcam.";
					}
				document.getElementById("errorMessage").textContent = msg;
			}
	

			
		var last_time = +new Date;
		var video = new Whammy.Video(15);

		 function montaVideo(time) 
			{
				
				ctx.drawImage(streamVideo, 0, 0, c.width, c.height);
				return ctx;
			}
		
	function gravaVideo()
		{
			var context = montaVideo(last_time += 1000);
			video.add(context);
			
		//	document.getElementById('status').innerHTML = "Gravando Video";
			requestAnimationFrame(gravaVideo);
		}		
	
	function compilaVideo()
		{
			document.getElementById('status').innerHTML = "Compilando Video";
			requestAnimationFrame(finalizeVideo);
		}
	
	function finalizeVideo()
		{
			
			var start_time = +new Date;
			var output = video.compile();
			var end_time = +new Date;
			var url = webkitURL.createObjectURL(output);
		
			document.getElementById('videosalvo').src = url; 
			document.getElementById('download').style.display = '';
			document.getElementById('download').href = url;
			document.getElementById('status').innerHTML = "Compiled Video in " + (end_time - start_time) + "ms, file size: " + Math.ceil(output.size / 1024) + "KB";
		}
		