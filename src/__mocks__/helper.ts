jest.mock("../utils");
jest.mock("../config");

import * as utils from "../utils";
import * as config from "../config";

let getUrlsReponse: any;
let mockFileData: any;

// @ts-ignore
utils.getJsonOverHttp = (request) =>
  new Promise((resolve, reject) => {
    const response = getUrlsReponse[request.url];
    if (response) {
      return resolve(response);
    }
    reject(`Unexpected HTTP GET ${request.url}`);
  });

// @ts-ignore
config.getData = (file) =>
  new Promise((resolve, reject) => {
    const data = mockFileData[file];
    if (data) {
      return resolve(data);
    }
    reject(`Unexpected mock file requets ${file}`);
  });

export const resetMocks = () => {
  getUrlsReponse = {};
  mockFileData = {};
};

export const setJsonOverHttp = (url: string, response: any) => {
  getUrlsReponse[url] = response;
};

export const setMockFile = (fileName: string, config: any) => {
  mockFileData[fileName] = config;
};

resetMocks();
