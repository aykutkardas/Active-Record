/* 
	"Active Record" for JavaScript
    Author: Aykut Kardaş
    Github: github.com/aykutkardas
*/

var ActiveRecord = ActiveRecord || {};

ActiveRecord.result = {};
ActiveRecord.result.data = [];
ActiveRecord.result.rawData = [];
ActiveRecord.result.query = {};
ActiveRecord.result.list = [];

ActiveRecord.orderBy = function(prop, order) {
  this.result.query.orderBy = {
    prop: prop,
    order: order || "ASC"
  };
  return this;
};

ActiveRecord.where = function(where) {
  this.result.query.where = where;
  return this;
};

ActiveRecord.limit = function(limit, start) {
  this.result.query.limit = {
    limit: limit,
    start: start || 0
  };
  return this;
};

ActiveRecord.select = function() {
  this.result.query.select = arguments;
  return this;
};

ActiveRecord.result._orderBy = function(prop, order) {
  this.data.sort(function(a, b) {
    if ("ASC" === order) {
      if (a[prop] > b[prop]) {
        return 1;
      } else {
        if (b[prop] > a[prop]) return -1;
        else return 0;
      }
    } else if ("DESC" === order) {
      if (b[prop] > a[prop]) {
        return 1;
      } else {
        if (a[prop] > b[prop]) return -1;
        else return 0;
      }
    }
  });
};

ActiveRecord.result._where = function() {
  var where = this.query.where;
  var data = [].concat(this.data);
  var temp = [];
  var ortemp = [];
  var step = 0;
  var key;

  where = where.length && typeof where === "object" ? where : [where];

  for (var i = 0; i < where.length; i++) {
    for (key in where[i]) {
      if (step > 0) {
        data = [].concat(temp);
        temp = [];
      }

      for (var j = 0; j < data.length; j++) {
        if (data[j][key] === where[i][key] && temp.indexOf(data[j]) === -1) {
          temp.push(data[j]);
          this.list.push(j);
        }
      }

      step++;
    }

    for (var k = 0; k < temp.length; k++) {
      if (ortemp.indexOf(temp[k]) === -1) {
        ortemp.push(temp[k]);
      }
    }

    data = [].concat(this.data);
    temp = [];
    step = 0;
  }

  this.data = ortemp;
};

ActiveRecord.result._limit = function(limit, start) {
  start = start ? start : 0;
  this.data = this.data.slice(start, limit);
};

ActiveRecord.result._select = function(select) {
  var columns = select;
  var temp = [];
  var key;
  for (var i = 0; i < this.data.length; i++) {
    var tempObj = {};
    var step = 0;
    for (var j = 0; j < columns.length; j++) {
      for (key in this.data[i]) {
        if (key == columns[j]) {
          tempObj[key] = this.data[i][key];
          step++;
        }
      }
    }
    if (step > 0) {
      temp.push(tempObj);
    }
  }
  this.data = temp;
};

ActiveRecord.get = function(data) {
  if ("object" === typeof data && data.length) {
    this.result.data = data;
  } else {
    throw "The data is not an object: .get(" + JSON.stringify(data) + ")";
  }

  var Query = this.result.query;

  if (Query.orderBy)
    this.result._orderBy(Query.orderBy.prop, Query.orderBy.order);

  if (Query.where) this.result._where(Query.where);

  if (Query.select) this.result._select(Query.select);

  if (Query.limit) this.result._limit(Query.limit.limit, Query.limit.start);

  return this.result.data;
};
