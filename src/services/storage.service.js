var ImageKit = require("imagekit")
var mongoose = require('mongoose')


var imageKit = new ImageKit({
    publicKey : process.env.ImageKit_publicKey,
    privateKey : process.env.ImageKit_privateKey,
    urlEndpoint : process.env.ImageKit_urlEndpoint
})

function uploadFile(file){

    return new Promise((resolve, reject) => {
       imageKit.upload({
            file: file.buffer,
            fileName: new mongoose.Types.ObjectId().toString(),
            folder: "moodySongs"
        }, (error, result) => {
            if(error){
                reject(error)
            }else{
                resolve(result)
            }
        })
    })

}

module.exports = uploadFile