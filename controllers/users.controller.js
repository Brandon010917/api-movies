// Utils
const { catchAsync } = require("../utils/catchAsync");

exports.getAllUsers = catchAsync(async (req, res, next) => {});

exports.createNewUser = catchAsync(async (req, res, next) => {
  console.log("Funciona");
});

exports.getUserById = catchAsync(async (req, res, next) => {});

exports.updateUser = catchAsync(async (req, res, next) => {});

exports.deleteUser = catchAsync(async (req, res, next) => {});
