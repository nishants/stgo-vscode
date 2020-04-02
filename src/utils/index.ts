// @ts-nocheck
const http = require("http");

export const getJsonOverHttp = ({url}) => new Promise((resolve, reject) => {
    http.get(url, response => {
        response.setEncoding("utf8");
        let body = "";
        response.on("data", data => {
            body += data;
        });
        response.on("end", () => {
            body = JSON.parse(body);
            resolve(body);
        });
        response.on("error", reject);
    });
})