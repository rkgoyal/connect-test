const mongoose = require('mongoose');

// Sources associates with user Schema
const SourcesSchema = mongoose.Schema({
  humanId:{
    type: String,
    required: true
  },
  sources: [{
    id:{
      type: String,
      required: true
    },
    source:{
      type: String,
      required: true
    },
    supportedDataTypes:{
      type: [String],
      required: false
    },
    devices:{
      type: [String],
      required: false,
    },
    connectedSince:{
      type: Date,
      required: false,
    },
    externalId:{
      type: String,
      required: false,
    },
    timeZone:{
      type: String,
      required: false,
    },
    historySync:{
        status:{
          type: String,
          required: false
        },
        oldestDate:{
          type: Date,
          required: false
        },
    },
    syncStatus:{
        status:{
          type: String,
          required: false
        },
        synchedAt:{
          type: Date,
          required: false
        },
        newestDate:{
          type: Date,
          required: false
        },
    }
  }]
});




  const Sources = module.exports = mongoose.model('Sources', SourcesSchema);