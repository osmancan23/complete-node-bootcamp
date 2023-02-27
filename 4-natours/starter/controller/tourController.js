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

exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find(req.body);

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
