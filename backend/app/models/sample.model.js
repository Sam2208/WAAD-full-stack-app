const sql = require("./db.js");

// constructor
const Sample = function(sample) {
  this.title = sample.title;
  this.description = sample.description;
  this.published = sample.published;
};

Sample.create = (newSample, result) => {
  sql.query("INSERT INTO samples SET ?", newSample, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created sample: ", { id: res.insertId, ...newSample });
    result(null, { id: res.insertId, ...newSample });
  });
};

Sample.findById = (id, result) => {
  sql.query(`SELECT * FROM samples WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found sample: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Sample with the id
    result({ kind: "not_found" }, null);
  });
};

Sample.getAll = (title, result) => {
  let query = "SELECT * FROM samples";

  if (title) {
    query += ` WHERE title LIKE '%${title}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("samples: ", res);
    result(null, res);
  });
};

Sample.getAllPublished = result => {
  sql.query("SELECT * FROM samples WHERE published=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("samples: ", res);
    result(null, res);
  });
};

Sample.updateById = (id, sample, result) => {
  sql.query(
    "UPDATE samples SET title = ?, description = ?, published = ? WHERE id = ?",
    [sample.title, sample.description, sample.published, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Sample with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated sample: ", { id: id, ...sample });
      result(null, { id: id, ...sample });
    }
  );
};

Sample.remove = (id, result) => {
  sql.query("DELETE FROM samples WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Sample with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted sample with id: ", id);
    result(null, res);
  });
};

Sample.removeAll = result => {
  sql.query("DELETE FROM samples", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} samples`);
    result(null, res);
  });
};

module.exports = Sample;
