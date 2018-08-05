const mongoose = require('mongoose');

// Sources sub-document
var DashAnalyticsSchema = mongoose.Schema({
  humanId:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },


const DashAnalytics = module.exports = mongoose.model('DashAnalytics', DashAnalyticsSchema);
