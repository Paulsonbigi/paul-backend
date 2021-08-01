const Countries = require("../../model/uitilities/countries")
const AppError = require("../../Error/appError");

const sendData = async (data, res, statusCode) => {

    res.status(statusCode).json({
        success: true,
        data
    })
}

// @Route GET countries
// @desc get countries in the database
//  @access public access
exports.getAllCountries = async (req, res, next) => {
        try{
          
            const AllCountries = await Countries.find()
            sendData(AllCountries, res, 200)

        }catch(err){
          next(new AppError(err.message, 404))
        }
}

// @Route GET countries
// @desc get states based on the countries in the database
//  @access public access
exports.getCountryStates = async (req, res, next) => {
    try{
        let stateId = req.param.id

        const selectedStates = await Countries.findOne({ stateId })
            if( !selectedStates) return next(new AppError('Country has no state populated yet', 400));

            sendData(selectedStates, res, 200)


    }catch(err){
      next(new AppError(err.message, 404))
    }
    
  };

// @Route GET cities
// @desc get cities based on the state in the database
//  @access public access
exports.getStateCities = async (req, res, next) => {
    try{
        let cityId = req.param.id


    }catch(err){
      next(new AppError(err.message, 404))
    }
};
