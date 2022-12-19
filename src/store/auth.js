function checkAPIToken(token) {
    const user = {
        "userId": 0,
        "username": "User 1",
        "teamCode": "T1"
    }
    if(token === null) return null;
    // TODO: Verify token in the API
    const responseCode = 200;
    if(responseCode === 200) return user;
    return null;
}

module.exports = {
    checkAPIToken
}