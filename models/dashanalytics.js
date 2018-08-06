const mongoose = require('mongoose');

// Source schema for dashboard analytics
var DashSourceSchema = mongoose.Schema({
  source:{
    type: String,
    required: true
  },
  connectedSince:{
    type: Date,
    required: true
  }
});

const DashSource = module.exports = mongoose.model('DashSource', DashSourceSchema);


// Dahboard analytics schema
var DashAnalyticsSchema = mongoose.Schema({
  humanId:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  sourceAnalytics: {
    numberConnectSources: {
      type: Number
    },
    sourceDetails: [DashSourceSchema]
  }
});

const DashAnalytics = module.exports = mongoose.model('DashAnalytics', DashAnalyticsSchema);
