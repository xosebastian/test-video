import express from "express";
import editly from "editly";
import videoshow from "videoshow";
const fs = require("fs");
const path = require('path');

const app = express();

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json({ limit: "50mb", extended: true }));

app.use('/videos',express.static(path.join(__dirname, 'videos')));

/* app.use(express.static(__dirname + 'videos/'));
 */
app.get("/", (req, res) => {
  var subtitles = "./fixtures/subtitles.srt";
  var audio = "./fixtures/song.mp3";
  var logo = "./fixtures/logo.png";
  var logoParams = {
    start: 1,
    end: 20,
    xAxis: 20,
    yAxis: 20,
  };

  var images = [
    {
      path: "./fixtures/step_1.jpeg",
      caption: "Holaaaaa",
    }
  ];

  var videoOptions = {
    loop: 5,
    captionDelay: 350,
    transition: true,
    useSubRipSubtitles: false, // Use ASS/SSA subtitles instead
/*     subtitleStyles: {
      Fontname: "Verdana",
      Fontsize: "26",
      PrimaryColour: "118614",
      SecondaryColour: "118614",
      TertiaryColour: "118614",
      BackColour: "-2147483640",
      Bold: "2",
      Italic: "0",
      BorderStyle: "2",
      Outline: "2",
      Shadow: "3",
      Alignment: "1",
      MarginL: "40",
      MarginR: "60",
      MarginV: "40",
    }, */
  };


  videoshow(images)
  .save('./videos/video.mp4')
  .on('start', function (command) {
    console.log('ffmpeg process started:', command)
  })
  .on('error', function (err) {
    console.error('Error:', err)
  })
  .on('end', function (output) {
    
    console.log('Video created in:', output)
  })

/*   videoshow(images, videoOptions)
    //.subtitles(subtitles)
    .audio(audio)
    //.logo(logo, logoParams)
    .save("video3.mp4")
    .on("start", function (command) {
      console.log("ffmpeg process started:", command);
    })
    .on("error", function (err, stdout, stderr) {
      console.error("Error:", err);
      console.error("ffmpeg stderr:", stderr);
    })
    .on("end", function (output) {
      console.error("Video created in:", output);
    }); */

/*   const editSpec = {
    outPath: "./test.mp4",
    width: 800,
    height: 600,
    audioFilePath: "./sound/sample1.mp3",
    loopAudio: true,
    defaults: {
      transition: { name: "fade" },
    },
    clips: [
      {
        duration: 5,
        transition: { name: "dreamyzoom" },
        layers: [
          {
            type: "image",
            path: "./fixtures/step_1.jpeg",
            zoomDirection: "out",
          },
          {
            type: "subtitle",
            text: "Cada Consultora y Consultor de Belleza Natura es una persona apasionada por el poder transformador de la cosmética y las relaciones.",
          },
          {
            type: "image-overlay",
            path: "./fixtures/logo.png",
            zoomDirection: "in",
            position: { x: 0.95, y: 0.03, originX: "right" },
            visibleFrom: 0.7,
            visibleUntil: 1.5,
            width: 0.2,
          },
          {
            type: "image-overlay",
            path: "./fixtures/step-2.jpg",
            zoomDirection: "in",
            position: { x: 0.15, y: 0.03, originX: "right" },
            visibleFrom: 0.7,
            visibleUntil: 1.5,
            width: 0.1,
          },
          {
            type: "image-overlay",
            path: "./fixtures/step-3.jpg",
            zoomDirection: "in",
            position: { x: 0.26, y: 0.03, originX: "right" },
            visibleFrom: 0.7,
            visibleUntil: 1.5,
            width: 0.1,
          },
          {
            type: "image-overlay",
            path: "./fixtures/step-4.jpg",
            zoomDirection: "in",
            position: { x: 0.37, y: 0.03, originX: "right" },
            visibleFrom: 0.7,
            visibleUntil: 1.5,
            width: 0.1,
          },
          {
            type: "image-overlay",
            path: "./fixtures/step-5.jpg",
            zoomDirection: "in",
            position: { x: 0.48, y: 0.03, originX: "right" },
            visibleFrom: 0.7,
            visibleUntil: 1.5,
            width: 0.1,
          },
        ],
      },
      {
        duration: 5,
        transition: { name: "crosszoom" },
        // transition: { name: "directionalWarp" },
        layers: [
          {
            type: "image",
            path: "./fixtures/step-2.jpg",
            duration: 2.5,
            zoomDirection: "in",
          },
          {
            type: "image-overlay",
            path: "./fixtures/logo.png",
            zoomDirection: "in",
            position: { x: 0.95, y: 0.03, originX: "right" },
            visibleFrom: 0.7,
            visibleUntil: 1.5,
            width: 0.2,
          },
          {
            type: "subtitle",
            text: "Para [Nombre] ese poder transformador está en...",
          },
        ],
      },
      {
        duration: 5,
        transition: { name: "simplezoom" },
        layers: [
          {
            type: "image",
            path: "./fixtures/step-3.jpg",
            duration: 2.5,
            zoomDirection: "in",
          },
          {
            type: "image-overlay",
            path: "./fixtures/logo.png",
            zoomDirection: "in",
            position: { x: 0.95, y: 0.03, originX: "right" },
            visibleFrom: 0.7,
            visibleUntil: 1.5,
            width: 0.2,
          },
          {
            type: "subtitle",
            text: '"Conocer nuevas personas a través de la consultoría"',
          },
        ],
      },
      {
        duration: 5,
        transition: { name: "simplezoom" },
        layers: [
          {
            type: "image",
            path: "./fixtures/step-4.jpg",
            duration: 2.5,
            zoomDirection: "in",
          },
          {
            type: "image-overlay",
            path: "./fixtures/logo.png",
            zoomDirection: "in",
            position: { x: 0.95, y: 0.03, originX: "right" },
            visibleFrom: 0.7,
            visibleUntil: 1.5,
            width: 0.2,
          },
          {
            type: "subtitle",
            text: 'y en "poder compartir más tiempo con mis sobrinos".',
          },
        ],
      },
      {
        duration: 7,
        transition: { name: "simplezoom" },
        layers: [
          {
            type: "image",
            path: "./fixtures/step-5.jpg",
            duration: 2.5,
            zoomDirection: "in",
          },
         {
            type: "image-overlay",
            path: "./fixtures/logo.png",
            zoomDirection: "in",
            position: { x: 0.95, y: 0.03, originX: "right" },
            visibleFrom: 0.7,
            visibleUntil: 1.5,
            width: 0.2,
          }, 
          {
            type: "subtitle",
            text: "2 de Septiembre Día de la Consultora y Consultor de Belleza Natura. \nDía de quien se preocupa por crear un mundo con más bienestar y belleza para todos.",
          },
        ],
      },


    ],
  }; */

  // See editSpec documentation
/*   editly(editSpec).then((test) => {
    console.log(test);
  }); */

  res.status(200).json({ message: "Hola!" });
});



app.get("/video", function (req, res) {
  // Ensure there is a range given for the video
  const range = req.headers.range;
  if (!range) {
    res.status(400).send("Requires Range header");
  }

  // get video stats (about 61MB)
  const videoPath = "./videos/video.mp4";
  const videoSize = fs.statSync("./videos/video.mp4").size;

  // Parse Range
  // Example: "bytes=32324-"
  const CHUNK_SIZE = 10 ** 6; // 1MB
  const start = Number(range.replace(/\D/g, ""));
  const end = Math.min(start + CHUNK_SIZE, videoSize - 1);

  // Create headers
  const contentLength = end - start + 1;
  const headers = {
    "Content-Range": `bytes ${start}-${end}/${videoSize}`,
    "Accept-Ranges": "bytes",
    "Content-Length": contentLength,
    "Content-Type": "video/mp4",
  };

  // HTTP Status 206 for Partial Content
  res.writeHead(206, headers);

  // create video read stream for this particular chunk
  const videoStream = fs.createReadStream(videoPath, { start, end });

  // Stream the video chunk to the client
  videoStream.pipe(res);
});



app.listen(6060, () => {
  console.log("\x1b[34m", `Application listening at port ${6060}`, "\x1b[0m");
});
