class ApiFeatures {
  constructor (query, queryStr) {
    this.query = query
    this.queryStr = queryStr
    console.log(queryStr)
  }
  search () {
    // console.log(typeof this.query); // Object
    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword, // Regular expression
            $options: 'i' // Case Insensitive
          }
        }
      : {}

    // console.log(keyword)

    this.query = this.query.find({ ...keyword })
    // console.log("THIS ", this);
    return this
  }

  filter () {
    const queryCopy = { ...this.queryStr }
    //   Removing some fields for category
    const removeFields = ['keyword', 'page', 'limit']
    removeFields.forEach(key => delete queryCopy[key])
    // Filter For Price and Rating
    let queryStr = JSON.stringify(queryCopy)

    // console.log('Query Str before ', queryStr)
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, key => `$${key}`)
    // console.log('Query Str after ', queryStr)

    this.query = this.query.find(JSON.parse(queryStr))
    return this
  }

  pagination (resultPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.limit(resultPerPage).skip(skip);

    return this;
  }
}

module.exports = ApiFeatures
