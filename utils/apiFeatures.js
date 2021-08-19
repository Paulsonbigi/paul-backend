class ApiFeatures {
    constructor(model, reqQuery) {
      this.model = model;
      this.reqQuery = reqQuery;
    }
  
    filter() {
      //1. filtering
      let query = { ...this.reqQuery };
      const excluded = ["page", "sort", "limit", "fields"];
      excluded.forEach((el) => delete query[el]);
      query = JSON.stringify(query).replace(
        /\b(gt|gte|lt|lte|in)\b/,
        (match) => `$${match}`
      );
      this.model = this.model.find(JSON.parse(query));
      return this;
    }
  
    sorting(){
      let query = { ...this.reqQuery}
  
      if (req.reqQuery.sort) {
        const sortBy = req.reqQuery.sort.split(",").join(" ");
        this.model = this.model.sort(sortBy);
      } else {
        this.model = this.model.sort("-bedrooms");
      }
      return this
    }
  
    limiting(){
      if (req.reqQuery.fields) {
        const fields = req.query.fields.split(",").join(" ");
        this.model = this.model.select(fields);
      } else {
        this.model = this.model.select("-__v");
      }
      return this
    }
  
    paginate(){
      let limit = req.reqQuery.limit * 1 || 10;
      let page = req.reqQuery.page * 1 || 1;
      let skip = (page - 1) * limit;
      this.model = this.model.skip(skip).limit(limit);
      return this
    }
  }

  module.exports = ApiFeatures