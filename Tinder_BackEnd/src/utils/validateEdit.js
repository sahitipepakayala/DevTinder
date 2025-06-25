function validateEdit(req, res, next) {
    const data = req.body;
    const updateAllowed = ["skills", "gender", "age", "about", "firstName", "lastName", "image"];
    const invalidFields = Object.keys(data).filter(k => !updateAllowed.includes(k));
  
    if (invalidFields.length > 0) {
      return res.status(400).json({
        message: "Update contains invalid fields",
        invalidFields: invalidFields,
      });
    }
  
    next();
  }

 module.exports= {validateEdit};