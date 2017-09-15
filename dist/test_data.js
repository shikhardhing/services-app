'use strict';

exports.data = {
  authorization: {
    credentials: {
      username: 'shikhar',
      password: 'password'
    },
    validToken: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaWtoYXIiLCJpYXQiOjE1MDU0MTE3NzV9.cr79HUK0b79zqA36j7Z_QFnmAIpfTcYSpk2wJhk9rPg',
    inValidToken: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InNoaWtoYXIiLCJpYXQiOjE1MDU0MTE3NzV9.cr79HUK0b69zqA36j7Z_QFnmAIpfTcYSpk2wJhk9rPg'
  },
  thumbnail: {
    correctImg: 'https://cdn.pixabay.com/photo/2017/09/03/17/26/woman-2711279_960_720.jpg',
    incorrectImg: 'https://www.google.com',
    incorrectUrl: 'https://www.google',
    largeImg: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/A_new_map_of_Great_Britain_according_to_the_newest_and_most_exact_observations_%288342715024%29.jpg',
    brokenImg: 'http://motivate.000webhostapp.com/ancient_pic.jpg'
  },
  json_patch: {
    document: {
      'firstName': 'Albert',
      'contactDetails': { 'phoneNumbers': [] }
    },
    validOperation: [{
      'op': 'replace',
      'path': '/firstName',
      'value': 'Joachim'
    }, {
      'op': 'add',
      'path': '/lastName',
      'value': 'Wester'
    }, {
      'op': 'add',
      'path': '/contactDetails/phoneNumbers/0',
      'value': { 'number': '555-123' }
    }],
    invalidOperation: [{
      'op': 'replace',
      'path': '/secondName',
      'value': 'Joachim'
    }]
  }
};