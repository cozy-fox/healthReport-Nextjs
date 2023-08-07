import fs from 'fs';

export default function handler(req, res) {
    if (req.method === 'GET') {
        const files = fs.readdirSync('public/files');
        let max = 0;
        let result='';
        for (const file of files) {
            const number = parseInt(file.slice(14, 16)) + file.slice(12, 14) * 100 + file.slice(3, 5) * 10000 + file.slice(5, 7) * 1000000 + file.slice(7, 11) * 100000000;
            if (number > max) {
                result=file;
                max = number;
            }
        }
        return res.status(200).json({result});
    } else {
        // Handle any other HTTP method
    }
}