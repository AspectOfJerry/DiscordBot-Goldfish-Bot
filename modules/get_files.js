const fs = require('fs')

const GetFiles = (dir, file_suffix) => {
    const files = fs.readdirSync(dir, {
        withFileTypes: true
    })

    let command_files = []

    for(const file of files) {
        if(file.name.endsWith(".subcommand.js")) {
            console.log(`${file.name} => subcommand`);
            continue;
        } else if(file.name.endsWith(".todo")) {
            console.log(`${file.name} => todo`);
            continue;
        }
        if(file.isDirectory()) {
            command_files = [
                ...command_files,
                ...GetFiles(`${dir}/${file.name}`, file_suffix)
            ]
        } else if(file.name.endsWith(file_suffix)) {
            command_files.push(`${dir}/${file.name}`)
        }
    }
    return command_files
}

module.exports = GetFiles;