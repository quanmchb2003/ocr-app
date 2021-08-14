const { json } = require('express');
const express = require('express');
const request = require('request');
const axios = require('axios');
const fs = require('fs');
const app = express();
const port = 3000;


app.get('/', (req,res) => {
    
    if(!req.query.url)
    {
        res.send(JSON.stringify({ status: "error", message: "Url invalid", gate: "Mac Quan Inc" }))
            return
    }
    const optionsOne = {
        url: 'https://api8.ocr.space/parse/image',
        method: 'POST',
        form: { "url": req.query.url, "language":"eng", "isOverlayRequired":"true", "FileType":".Auto", "IsCreateSearchablePDF":"false", "isSearchablePdfHideTextLayer":"true", "detectOrientation":"false", "isTable":"false", "scale":"true", "OCREngine":"1", "detectCheckbox":"false", "checkboxTemplate":"0" },
        headers: {
            'accept': 'application/json, text/javascript, */*; q=0.01',
            'accept-language': 'vi,en-US;q=0.9,en;q=0.8,pt;q=0.7,de;q=0.6,mg;q=0.5',
            'apikey': '5a64d478-9c89-43d8-88e3-c65de9999580',
            'content-type': 'multipart/form-data; boundary=----WebKitFormBoundary5u8PBInxqNfJ4VP9',
            'origin': 'https://ocr.space',
            'referer': 'https://ocr.space/',
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'
        }
    }

    request(optionsOne, function (err, response, body) {
        var jsonOne = JSON.parse(response.body)
        if(!jsonOne.ParsedResults[0].ParsedText)
        {
            res.send(JSON.stringify({ status: "error", message: "Can't get text in image", gate: "Mac Quan Inc" }))
        }else{
            res.send(JSON.stringify({ status: "true", message: jsonOne.ParsedResults[0].ParsedText, gate: "Mac Quan Inc" }))
        }
        

    })


})

app.listen(port, function(){
    console.log("Your app running on port " + port);
});