const express = require('express');
const fs = require('fs');
const app = express();

app.use(express.json());

const port = 3000;

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Welcome to our api',
  });
});

// GET ALL TOURS
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    count: tours.length,
    data: tours,
  });
});

// CREATE A TOUR
app.post('/api/v1/tours', (req, res) => {
  const newId = tours[tours.length - 1].id + 1;

  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          newTour,
        },
      });
    }
  );
});

// GET ONE TOUR
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1;

  const tour = tours.find((e) => e.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id !',
    });
  }

  res.status(200).json({
    status: 'success',
    data: tour,
  });
});

//PATCH ONE TOUR

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id !',
    });
  }

  res.status(200).json({
    status: 'success',
    data: 'Updated Tour',
  });
});

// DELETE ONE TOUR

app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id !',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

app.listen(port, () => {
  console.log('Api is listening port is: ' + port);
});
