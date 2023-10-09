'use strict';

function parseField(field) {
  return field
    .split(/\[|\]/)
    .filter((s) => s);
}

function getField(req, field) {
  let val = req.body;
  field.forEach((prop) => {
    val = val[prop];
  });
  return val;
}

exports.required = (field) => {
  field = parseField(field);
  return (req, res, next) => {
    if (getField(req, field)) {
      next();
    } else {
      res.error(`${field.join(' ')} is required`);
      res.redirect('back');
    }
  }
};

exports.lengthAbove = (field, len) => {
  field = parseField(field);
  return (req, res, next) => {
    if (getField(req, field).length > len) {
      next();
    } else {
      res.error(`${field.join(' ')} must have more than ${len} characters`);
      res.redirect('back');
    }
  }
};

exports.pageNo = () => {
  return (req, res, next) => {
    const pageNo = req.params.page;
    if (!isNaN(parseInt(pageNo, 10))) {
      next();
    } else {
      routes.notfound(req, res, next);
    }
  }
};