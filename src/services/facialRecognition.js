const { spawn } = require("child_process");

const facialRecognition = async (imageUrl) => {
  var dataToSend;
  var args = [imageUrl];

  // spawn new child process to call the python script
  const python = spawn("python3", ["./src/services/facerecognition.py", args]);
  await new Promise((resolve, reject) => {
    // collect data from script
    python.stdout.on("data", function (data) {
      console.log("Pipe data from python script ...");
      resolve(data.toString());
    });
  }).then((data) => {
    dataToSend = JSON.parse(data);
  });

  // in close event we are sure that stream from child process is closed
  python.on("close", (code) => {
    console.log(`child process close all stdio with code ${code}`);
  });
  return dataToSend;
};

export default facialRecognition;
