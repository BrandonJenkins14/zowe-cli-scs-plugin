const fs = require("fs");
const path = require("path");

// Check if local prebuilds folder exists
const localDir = path.join(__dirname, "..", "prebuilds");
if (!fs.existsSync(localDir)) {
    process.exit(0);
}

// Delete local prebuilds folder if empty
if (fs.readdirSync(localDir).length === 0) {
    fs.rmdirSync(localDir);
}

// Function copied from prebuild-install
function npmCache() {
    const env = process.env;
    const home = require('os').homedir;
    return env.npm_config_cache ||
        (env.APPDATA ? path.join(env.APPDATA, 'npm-cache') : path.join(home(), '.npm'));
}

// Delete .tar.gz files that we added to NPM cache during preinstall
const cacheDir = path.join(npmCache(), "_prebuilds");
if (fs.existsSync(cacheDir)) {
    fs.readdirSync(cacheDir).forEach((filename) => {
        if (filename.match(/.*-keytar-.*-node-.*\.tar\.gz/)) {
            fs.unlinkSync(path.join(cacheDir, filename));
        }
    });
}
