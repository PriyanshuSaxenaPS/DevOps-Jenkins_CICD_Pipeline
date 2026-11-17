const app = require('./app');
const http = require('http');

const server = http.createServer(app);

server.listen(0, '127.0.0.1', async () => {
    const port = server.address().port;

    try {
        const response = await fetch(
            `http://127.0.0.1:${port}/health`
        );

        const data = await response.json();

        if (response.status !== 200 || data.status !== 'UP') {
            throw new Error('Health check failed');
        }

        console.log('Express tests passed!');
    } catch (error) {
        console.error(error);
        process.exitCode = 1;
    } finally {
        server.close();
    }
});