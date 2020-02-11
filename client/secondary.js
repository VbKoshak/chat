/*jshint esversion: 6 */

const createMsg = (user, msg, self) => {
    let li = document.createElement('li');
    li.innerText = ((!self)?((user.username !== "guest") ? user.username + ': ' : 'guest#' + user.id + ': '):'')  + msg;
    li.style.backgroundColor = user.color;
    return li;
};

export default createMsg;