const { spawn } = require('child_process');
const path = require('path');

module.exports = (directory, zipfile, log) => {
  return new Promise((resolve, reject) => {
    if (!log) log = console;

    try {
      const zipArgs = [zipfile, '-r' ,'-0', path.join(directory, '')];
      log.info('zip args', zipArgs);
      const zipProcess = spawn('zip', zipArgs);
      zipProcess.stdout.on('data', message => {
        // received a message sent from the 7z process
        log.info(message.toString());
      });

      // end the input stream and allow the process to exit
      zipProcess.on('error', (err) => {
        log.error('err contains: ' + err);
        throw err;
      });

      zipProcess.on('close', (code) => {
        log.info('The zip exit code was: ' + code);
        if (code != 0) throw 'zip exited with an error'; // throw and let the handler below log it
        else {
          log.info('zip complete');
          return resolve();
        }
      });
    }
    catch(err) {
      return reject(err);
    }
  });
}