/* React environment configuration (frontend only) */
// Do not store any sensitive data/secret values/API keys here - it is available in the browser to anyone.

const prod = {
    env: 'production',
    api_host: 'https://boiling-taiga-05000.herokuapp.com/ShowRoomAPI' // an empty string to signify a relative path. can also put a deployment URL.
};
const dev = {
    env: 'development',
    api_host: 'http://localhost:5000/ShowRoomAPI', // web server localhost port
};

// export the appropriate environment
export default process.env.NODE_ENV === 'production' ? prod : dev;