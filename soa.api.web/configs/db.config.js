const mongoose = require('mongoose');
const user = 'admin';
const password = 'admin2018';

mongoose.connect(`mongodb://${user}:${password}@ds261040.mlab.com:61040/soa-books`);