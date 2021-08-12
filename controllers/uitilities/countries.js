const Countries = require("../../utils/data")
const AppError = require("../../Error/appError");
const { values } = require("../../utils/data");

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
          const AllCountries =  []
          
            for (value of Countries) {
              AllCountries.push(value)
            }
            await sendData(AllCountries, res, 200)

        }catch(err){
          next(new AppError(err.message, 404))
        }
}

// @Route GET countries
// @desc get states based on the countries in the database
//  @access public access
exports.getCountryStates = async (req, res, next) => {
    try{
      let selectedCountry = req.params.slug

      // confirm if the country the user selects is available
      let availableCountries = []
      Countries.map(item => { availableCountries.push(item.country)})
      if(!availableCountries.includes(selectedCountry)) return next(new AppError('We are not available in the country you selected. Please choose one of the available countries', 400));

      const selectedStates = Countries.filter(item => item.country === selectedCountry)

      // check if any state in the selected country is available
        if( selectedStates.length === 0) return next(new AppError('Country has no state populated yet', 400));

        //  sends the states to the user
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
      // accept the state 
      // let selectedCity = req.params.slug
      let country = req.params.country
      let desiredState = req.params.slug
      let availableState = []

      const selectedStates = Countries.filter(item => item.country === country)


      const availableStates = Countries.states.filter(item => item.state === desiredState)
      
      // console.log(availableStates)
      // sends thr cities to the user
      // sendData(availableStates, res, 200)

    }catch(err){
      next(new AppError(err.message, 404))
    }
};
