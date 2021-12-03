'use strict';

exports.up = function (r, connection) {
  return r.tableCreate('notes').run(connection);
};

exports.down = function (r, connection) {
  return r.tableDrop('notes').run(connection);
};
