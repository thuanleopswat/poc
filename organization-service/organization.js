'use strict';

const create = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

const update = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
}

const get = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully!',
        input: event,
      },
      null,
      2
    ),
  };
};

const del = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        method: "del",
        message: 'Deleted',
        input: event,
      },
      null,
      2
    ),
  };
}; 

module.exports = {
  create,
  get,
  update,
  del
}
