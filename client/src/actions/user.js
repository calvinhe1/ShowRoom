// Functions to help with user actions.

// environment configutations
import ENV from './../config.js'
const API_HOST = ENV.api_host

// Send a request to check if a user is logged in through the session cookie
export const checkSession = (app) => {
    const url = `${API_HOST}/users/check-session`;

    if (!ENV.use_frontend_test_user) {
        fetch(url)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.userId) {
                app.setState(json);
            }
        })
        .catch(error => {
            console.log(error);
        });
    } else {
        app.setState(ENV.user);
    }
    
};

// A function to send a POST request with the user to be logged in
export const loginUser = async (loginInfo, setProfile) => {
    // Create our request constructor with all the parameters we need
    const request = new Request(`${API_HOST}/users/login`, {
        method: "post",
        body: JSON.stringify(loginInfo),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    await fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.userId !== undefined) {
                setProfile(json);
            }
        })
        .catch(error => {
            console.log(error);
        });
    return;
};

export const createUser = (loginInfo, setProfile) => {
    const request = new Request(`${API_HOST}/users/create`, {
        method: "post",
        body: JSON.stringify(loginInfo),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    // Send the request with fetch()
    fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json.userId !== undefined) {
                setProfile(json);
            }
        })
        .catch(error => {
            console.log(error);
        });
    return;
}

// A function to send a GET request to logout the current user
export const logoutUser = (setProfile) => {
    const url = `${API_HOST}/users/logout`;

    fetch(url)
        .then(res => {
            setProfile(null);
        })
        .catch(error => {
            console.log(error);
        });
};