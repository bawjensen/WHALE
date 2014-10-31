var child_process   = require('child_process'),
    sys             = require("sys");

staging_server = {
    start: function() {
        this.process = child_process.spawn(process.argv[0], ['web.js', 7501]);

        this.process.stdout.addListener('data', function (data) {
            process.stdout.write(data);
        });

        this.process.stderr.addListener('data', function (data) {
            sys.print(data);
        });

        this.process.addListener('exit', function (code) {
            console.error('Staging Server: Child process exited: ' + code);
            process.exit(code);
        });
    },

    beforeExit: function() {
        staging_server.process.kill();
    }
}

process.on('SIGINT', staging_server.beforeExit);
process.on('exit', staging_server.beforeExit);
process.on('uncaughtException', staging_server.beforeExit);

staging_server.start();