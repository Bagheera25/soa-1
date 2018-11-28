const mongoose = require('mongoose');
const user = 'admin';
const password = 'admin2018';

mongoose.connect(`mongodb://${user}:${password}@ds119734.mlab.com:19734/soa`);