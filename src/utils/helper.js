import { serverConfig } from "../../apiConfig";

export const createLCDData = (inputString) => {
    return inputString.substring(0, 26);
};

export const updateEsp32Status = (value) => {
    serverConfig
        .post(createLCDData(value))
        .then((res) => {
            return 200;
        })
        .catch((err) => {
            return 500;
        });
};
