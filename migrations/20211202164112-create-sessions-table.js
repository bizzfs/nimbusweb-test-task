'use strict';

exports.up = function (r, connection) {
  return r.tableCreate('sessions').run(connection);
};

exports.down = function (r, connection) {
  return r.tableDrop('sessions').run(connection);
};
