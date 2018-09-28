process.env.NODE_ENV = 'development';
const path = require('path');
const childProcess = require('child_process');
const webpack = require('webpack');
const server=require('../build/server.conf');
const devRender = require('../build/dev.render');
const WebpackDevServer = require('webpack-dev-server');
const formatWebpackMessages = require('react-dev-utils/formatWebpackMessages');

devRender.entry.index.unshift(`webpack-dev-server/client?http://${server.host}:${server.port}/`);
const compiler = webpack(devRender);
compiler.plugin('invalid', function() {
    console.log('Compiling...');
});

compiler.plugin('done', function(stats) {
    let messages = formatWebpackMessages(stats.toJson({}, true));
    if (!messages.errors.length && !messages.warnings.length) {
        console.log('Compiled successfully!');
    }
    if (messages.errors.length) {
        console.log('Failed to compile.');
        return;
    }
    if (messages.warnings.length) {
        console.log('Compiled with warnings.');
        console.log('You may use special comments to disable some warnings.');
    }
});

const devServer = new WebpackDevServer(compiler, {
  contentBase: path.resolve(__dirname, '../dist'),
});

devServer.listen(server.port, server.host, () => {
    console.log('pross--start');
    childProcess.spawn('npm', ['run', 'electron'], { shell: true, env: process.env, stdio: 'inherit' })
    .on('close', code => process.exit(code))
    .on('error', spawnError => console.error(spawnError));
});