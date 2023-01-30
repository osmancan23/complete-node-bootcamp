const express = require('express');
const fs = require('fs');
const app = express();
const morgan = require('morgan');

// 1) MIDLEWARE
app.use(express.json());

app.use(morgan('dev'));

const port = 3000;

const tours = JSON.parse(fs.readFileSync('./dev-data/data/tours-simple.json'));

// 2) ROUTE HANDLER

//TOUR
const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    count: tours.length,
    data: tours,
  });
};

const createTour = (req, res) => {
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
};

const getTour = (req, res) => {
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
};

const updateTour = (req, res) => {
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
};

const deleteTour = (req, res) => {
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
};

//USER

const getUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    count: tours.length,
    data: tours,
  });
};

const createUser = (req, res) => {
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
};

const getUser = (req, res) => {
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
};

const updateUser = (req, res) => {
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
};

const deleteUser = (req, res) => {
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
};
// 3) ROUTES

const tourRoute = express.Router();

tourRoute.route('/').get(getTours).post(createTour);

tourRoute.route('/:id').get(getTour).patch(updateTour).delete(deleteTour);

app.use('/api/v1/tours', tourRoute);

const userRoute = express.Router();

userRoute.route('/').get(getUsers).post(createUser);

userRoute.route('/:id').get(getUser).patch(updateUser).delete(deleteUser);

app.use('/api/v1/users', userRoute);

// 4) START SERVER

app.listen(port, () => {
  console.log('Api is listening port is: ' + port);
});
