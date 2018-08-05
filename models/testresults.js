const mongoose = require('mongoose');

// Code sub-document
var CodeSchema = mongoose.Schema({
  code:{
    type: String,
    required: false
  },
  codeSystem:{
    type: String,
    required: false
  },
  codeSystemName:{
    type: String,
    required: false
  },
  inferred:{
    type: Boolean,
    required: false
  },
  name:{
    type: String,
    required: false
  },
})

const Code = module.exports = mongoose.model('Code', CodeSchema);


// Component sub-document
var ComponentSchema = mongoose.Schema({
  name:{
    type: String,
    required: false
  },
  value:{
    type: String,
    required: true
  },
  unit:{
    type: String,
    required: true
  },
  low:{
    type: String,
    required: true
  },
  high:{
    type: String,
    required: true
  },
  refRange:{
    type: String,
    required: true
  },
  componentComments:{
    type: String,
    required: true
  },
  codes: [CodeSchema]
})

const Component = module.exports = mongoose.model('Component', ComponentSchema);


// Recipient sub-document
var RecipientSchema = mongoose.Schema({
  objectID:{
    type: String,
    required: false
  },
  name:{
    type: String,
    required: false
  },
  isPCP:{
    type: Boolean,
    required: false
  },
  recipTemplate:{
    type: String,
    required: false
  }
})

const Recipient = module.exports = mongoose.model('Recipient', RecipientSchema);


// Test results models
var TestResultsSchema = mongoose.Schema({
  id:{
    type: String,
    required: false
  },
  source:{
    type: String,
    required: false
  },
  updatedAt:{
    type: Date,
    required: false
  },
  createdAt:{
    type: Date,
    required: false
  },
  components: [ComponentSchema],
  name:{
    type: String,
    required: false
  },
  patient:{
    name: {
      type: String,
      required: false
    }
  },
  orderedBy:{
    type: String,
    required: false
  },
  recipients: [RecipientSchema],
  resultDateTime:{
    type: Date,
    required: false
  },
  status:{
    type: String,
    required: false
  },
  comments:{
    type: String,
    required: false
  },
  narrative:{
    type: String,
    required: false
  },
  impression:{
    type: String,
    required: false
  },
  transcriptions:{
    type: String,
    required: false
  },
  organization: {
    id:{
      type: String,
      required: false
    },
    name:{
      type: String,
      required: false
    },
    href:{
      type: String,
      required: false
    },
  },
  codes: [CodeSchema]
})

const TestResults = module.exports = mongoose.model('TestResults', TestResultsSchema);
