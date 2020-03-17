import fetch from "apis/fetch";
import {GET, POST} from "apis/constants";

export default {
  downloadFile: ({method, url, filename, params}) => {
    return new Promise((resolve, reject) => {
      fetch(method, url, params, {Accept: "application/octet-stream"}, {responseType: "blob"})
        .then(res => {
          let url = window.URL.createObjectURL(res);
          const element = document.createElement("a");
          element.setAttribute("href", url);
          element.setAttribute("download", filename);

          element.style.display = "none";
          document.body.appendChild(element);

          element.click();

          document.body.removeChild(element);
          window.URL.revokeObjectURL(url);
          resolve(res);
        }, err => {
          reject(err);
        });
    });
  },
};
