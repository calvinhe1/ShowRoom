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
            if (json && json._id) {
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
    return fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json._id !== undefined) {
                setProfile(json);
                return true;
            } else {
                alert('Can\'t find user');
                return false;
            }
        })
        .catch(error => {
            console.log(error);
        });
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
    return fetch(request)
        .then(res => {
            if (res.status === 200) {
                return res.json();
            } else if (res.status === 401) {
                alert('Account already taken, please sign in.');
            }
        })
        .then(json => {
            if (json._id !== undefined) {
                setProfile(json);
            }
        })
        .catch(error => {
            console.log(error);
        });
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

export const getUserInfo = (userId) => {
    const request = new Request(`${API_HOST}/users/${userId}`, {
        method: "get",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    return fetch(request)
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const modifyUser = (userInfo) => {
    const request = new Request(`${API_HOST}/users`, {
        method: "post",
        body: JSON.stringify(userInfo),
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    return fetch(request);
}

export const removeUser = (id) => {
    const request = new Request(`${API_HOST}/users/${id}`, {
        method: "delte",
        headers: {
            Accept: "application/json, text/plain, */*",
            "Content-Type": "application/json"
        }
    });

    return fetch(request);
}