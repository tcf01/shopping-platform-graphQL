const { createWriteStream } = require('fs');

const storeUpload = async ({ stream, filename }) => {
    const id = Math.random().toString().split('.')[1]
    const path = `images/${id}-${filename}`

    return new Promise((resolve, reject) =>
        stream
            .pipe(createWriteStream(path))
            .on('finish', () => resolve({ id, path }))
            .on('error', reject),
    )
}

// const recordFile = file =>
//     db
//         .get('uploads')
//         .push(file)
//         .last()
//         .write()

const processUpload = async files => {
    let imageIdAndPath = [];

    await Promise.all(await files.map(async (file) => {
        const { createReadStream, filename } = await file;
        const { path } = await storeUpload({ stream: createReadStream(), filename })
        imageIdAndPath.push({ path });
    }))


    //when you try console.log, it will be an empty array since console.log is sync
    return imageIdAndPath.length > 0 ? imageIdAndPath : [{ path: 'assets/img/default.jpg' }];
}

module.exports = { storeUpload, processUpload }