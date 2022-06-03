const ErrorHandler = require("../utils/errorhandler")
const catchAsyncErrors = require('./catchAsyncErrors')
const jwt = require('jsonwebtoken')
const User = require('../models/userModel')

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies
  console.log(token)
  if (!token) {
    return next(new ErrorHandler('Please login to access this resource', 401))
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET)

  await User.findById(decodedData.id)

  next();
})

exports.authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if(roles.includes(req.user.role)){
            
        }
    }
}