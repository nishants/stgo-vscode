jest.mock('../utils');
jest.mock('../config');

import * as utils from "../utils";
import * as config from "../config";

// @ts-ignore
utils.getJsonOverHttp = () => new Promise((resolve) => {
    resolve([{branchName: 'dabba'}])
});

// @ts-ignore
config.getData = (file) => ({'branch-list-mock.json': new Promise((resolve) => {
        resolve([{branchName: 'dabba'}])
    })}[file]) ;
