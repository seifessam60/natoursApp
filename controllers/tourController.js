<<<<<<< HEAD
const Tour = require('../models/tourModel');
const APIFeatures = require('../utils/apiFeatures');

exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = 'price,-ratingsAverage';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
};
exports.getAllTours = async (req, res) => {
  try {
    const features = new APIFeatures(Tour.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();

    const tours = await features.query;

=======
const Tour = require('../models/tourModel.js');
exports.aliasTopTours = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage,price';
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty';
  next();
}

exports.getAllTours = async (req, res) => {
  console.log(req.query);
  try {
    const queryObj = { ...req.query };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);
    let query = Tour.find(JSON.parse(queryStr));

    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt');
    }

    if (req.query.fields) {
      const fields = req.query.fields.split(',').join(' ');
      query = query.select(fields);
    } else {
      query = query.select('-__v');
    }

    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) throw new Error('This page does not exist');
    }
 
    const tours = await query;
>>>>>>> 7c472ef91854f1656565e13e1d7e1e605e1cdcb7
    res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
        tours
      }
    });
<<<<<<< HEAD
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'No tours found'
=======
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error.message
>>>>>>> 7c472ef91854f1656565e13e1d7e1e605e1cdcb7
    });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
<<<<<<< HEAD
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'No tour found'
=======
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
>>>>>>> 7c472ef91854f1656565e13e1d7e1e605e1cdcb7
    });
  }
};

exports.createTour = async (req, res) => {
<<<<<<< HEAD
  try {
    // console.log(req.body);
    const newTour = await Tour.create(req.body);
    // const newId = tours[tours.length - 1].id + 1;
=======
  // console.log(req.body);

  try {
    const newTour = await Tour.create(req.body);

>>>>>>> 7c472ef91854f1656565e13e1d7e1e605e1cdcb7
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour
      }
    });
<<<<<<< HEAD
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
=======
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
>>>>>>> 7c472ef91854f1656565e13e1d7e1e605e1cdcb7
    });
  }
};

exports.updateTour = async (req, res) => {
<<<<<<< HEAD
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
=======
  const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  try {
>>>>>>> 7c472ef91854f1656565e13e1d7e1e605e1cdcb7
    res.status(200).json({
      status: 'success',
      data: {
        tour
      }
    });
<<<<<<< HEAD
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid data sent'
=======
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error
>>>>>>> 7c472ef91854f1656565e13e1d7e1e605e1cdcb7
    });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null
    });
<<<<<<< HEAD
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'No tour found'
    });
  }
};

exports.getTourStats = async (req, res) => {
  try {
    const stats = await Tour.aggregate([
      {
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' },
          numRatings: { $sum: '$ratingsQuantity' },
          numTours: { $sum: 1 },
          avgRating: { $avg: '$ratingsAverage' },
          avgPrice: { $avg: '$price' },
          minPrice: { $min: '$price' },
          maxPrice: { $max: '$price' }
        }
      },
      {
        $sort: { avgPrice: 1 }
      }
      // {
      //   $match: { _id: { $ne: 'EASY' } }
      // }
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        stats
      }
    });
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: 'No tour found'
    });
  }
};

exports.getMonthlyPlan = async (req, res) => {
  try {
    const year = +req.params.year;
    const plan = await Tour.aggregate([
      {
        $unwind: '$startDates'
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { $month: '$startDates' },
          numTourStarts: { $sum: 1 },
          tours: { $push: '$name' }
        }
      },
      {
        $addFields: { month: '_id' }
      },
      {
        $project: { _id: false }
      },
      {
        $sort: { numTourStarts: -1 }
      }
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        plan
      }
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: 'No tour found'
=======
  } catch (error) {
    res.status(404).json({
      status: 'fail',
      message: error
>>>>>>> 7c472ef91854f1656565e13e1d7e1e605e1cdcb7
    });
  }
};
