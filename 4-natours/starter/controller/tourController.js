const fs = require('fs');

const Tour = require('../models/tourModel');

exports.checkId = (req, res, next, val) => {
  if (req.params.id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid id !',
    });
  }

  next();
};

exports.getCheapersTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary';
  next();
};

exports.getTours = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const expectQueries = ['page', 'limit', 'sort', 'fields'];

    expectQueries.forEach((e) => delete queryObj[e]);
    console.log(queryObj);

    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => '$${match}');

    let query = Tour.find(JSON.parse(queryStr));

    // SORTING
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');

      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdDate');
    }

    // FIELDS
    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');

      console.log(fields);

      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    // PAGINATION

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const tourCount = await Tour.countDocuments();

      if (skip >= tourCount) {
        console.log('there is no tours');
        throw new Error('There is no tours');
      }
    }
    const tours = await query;

    res.status(200).json({
      status: 'success',
      count: tours.length,
      data: tours,
    });
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      message: e,
    });
  }
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        newTour,
      },
    });
  } catch (e) {
    res.status(400).json({
      status: 'failed',
      message: 'invalid request',
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);

    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (e) {
    res.status(404).json({
      status: 'failed',
      message: e,
    });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      status: 'success',
      data: tour,
    });
  } catch (e) {
    res.status(401).json({
      staus: 'failed',
      message: 'invalid request',
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
    });
  } catch (e) {
    res.status(401).json({
      staus: 'failed',
      message: 'invalid request',
    });
  }
};
