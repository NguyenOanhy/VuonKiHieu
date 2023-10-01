const express = require('express');
const app = express();
const { spawn } = require('child_process');
const path = require('path');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


const pythonScriptChatbot = path.join(__dirname, 'chatbot.py');
const pythonScriptDetection = path.join(__dirname, 'deploy_model.py');


// Hàm chạy script Python và trả về kết quả thông qua Promise
const runPythonScript = (pythonScript, args) => {
  return new Promise((resolve, reject) => {
    const pythonProcess = spawn('python', [pythonScript, ...args]);
    let result = '';

    // Lắng nghe sự kiện stdout từ child process để nhận kết quả
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
    });

    // Lắng nghe sự kiện stderr từ child process để xử lý lỗi nếu có
    pythonProcess.stderr.on('data', (data) => {
      reject(data.toString());
    });

    // Lắng nghe sự kiện khi child process kết thúc
    pythonProcess.on('close', (code) => {
      if (code !== 0) {
        reject(`Child process exited with code ${code}`);
      } else {
        resolve(JSON.parse(result));
      }
    });
  });
};

// Khởi động server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});


app.post('/api/chatbot', async (req, res) => {
  try {
    const { text } = req.body;
    const summary = await runPythonScript(pythonScriptChatbot, [text]);
    res.json(summary);
  } catch (error) {
    console.log(error)
    res.status(500).json(error);
  }
}
)

app.post('/api/detection', upload.array('videoFrames'), async (req, res) => {
  try {
    // Pass the received video frames to the deploy_model.py script
    const args = ['--videoFrames'];

    // Add the frame data as base64 strings to the argument list
    req.files.forEach((file) => {
      args.push(file.buffer.toString('base64'));
    });

    const response = await runPythonScript(pythonScriptDetection, args);
    res.json({ processedFrames: response });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});