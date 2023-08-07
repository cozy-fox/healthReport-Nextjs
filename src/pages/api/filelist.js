import fs from 'fs';

export default function handler(req, res) {
  if (req.method === 'GET') {
    const files = fs.readdirSync('public/files');
    // console.log(files);
    return res.status(200).json({ files })
  } else {
    // Handle any other HTTP method
  }
}
