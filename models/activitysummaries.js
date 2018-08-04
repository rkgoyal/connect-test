const mongoose = require('mongoose');

// Activity summary sub doc schema
var ActivitySummarySchema = mongoose.Schema({
  id:{
    type: String,
    required: true
  },
  userId:{
    type: String,
    required: false
  },
  date:{
    type: Date,
    required: false
  },
  source:{
    type: String,
    required: false
  },
  duration:{
    type: Number,
    required: false
  },
  distance:{
    type: Number,
    required: false
  },
  steps:{
    type: Number,
    required: false
  },
  vigorous:{
    type: Number,
    required: false
  },
  moderate:{
    type: Number,
    required: false
  },
  light:{
    type: Number,
    required: false
  },
  sedentary:{
    type: Number,
    required: false
  },
  calories:{
    type: Number,
    required: false
  },
  sourceData:{
    floors:{
      type: Number,
      required: false
    },
    tracker:{
      calories:{
        type: Number,
        required: false
      },
      distance:{
        type: Number,
        required: false
      },
      elevation:{
        type: Number,
        required: false
      },
      floors:{
        type: Number,
        required: false
      },
      steps:{
        type: Number,
        required: false
      }
    }
  },
  createdAt:{
    type: Date,
    required: false
  },
  updatedAt:{
    type: Date,
    required: false
  }
});

const ActivitySummary = module.exports = mongoose.model('ActivitySummary', ActivitySummarySchema);

// Activity summaries schema
var ActivitySummariesSchema = mongoose.Schema({
  humanId:{
    type: String,
    required: true
  },
  activitySummaries: [ActivitySummarySchema]
});

const ActivitySummaries = module.exports = mongoose.model('ActivitySummaries', ActivitySummariesSchema);
