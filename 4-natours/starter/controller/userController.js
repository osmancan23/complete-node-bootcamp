exports.getUsers = (req, res) => {
  res.status(200).json({
    status: 'success',
    count: tours.length,
    data: tours,
  });
};

exports.createUser = (req, res) => {
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

exports.getUser = (req, res) => {
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

exports.updateUser = (req, res) => {
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

exports.deleteUser = (req, res) => {
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
