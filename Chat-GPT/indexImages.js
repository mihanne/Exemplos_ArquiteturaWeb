const { Configuration, OpenAIApi } = require("openai");
const http = require('http');
const fs = require('fs');
require('dotenv').config()
const configuration = new Configuration({
    organization: "org-5caiVo8hUGKimOknJVw1pTq8",
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

 
    async function runImage () {
        const response = await openai.createImage({
            prompt: "a white siamese cat",
            n: 1,
            size: "256x256",
            });
            image_url = response.data.data[0].url;
            console.log("urldata="+ image_url);
}
runImage()
.then(
    response=>{
        const file = fs.createWriteStream("test.png");
        const request = http.get(response.data.data[0].url, function (response) {
        response.pipe(file);
        file.on("finish", () => {
            file.close();
            console.log("Download Done!");
        });
    });
});