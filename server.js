const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// Endpoint to get availability
app.get('/api/availability', (req, res) => {
    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data.' });
        }
        res.json(JSON.parse(data));
    });
});

// Endpoint to save availability
app.post('/api/availability', (req, res) => {
    const newEntry = req.body;

    fs.readFile('data.json', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read data.' });
        }

        const availability = JSON.parse(data);
        availability.push(newEntry);

        fs.writeFile('data.json', JSON.stringify(availability, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save data.' });
            }
            res.status(201).json(newEntry);
        });
    });
});

// Initialize data file if it doesn't exist
if (!fs.existsSync('data.json')) {
    fs.writeFileSync('data.json', JSON.stringify([]));
}

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
