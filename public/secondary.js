/*jshint esversion: 6 */

const createMsg = (user, msg) => {
    let li = document.createElement('li');
    li.innerText = ((user.username !== "guest") ? user.username : 'guest#' + user.id) + ": " + msg;
    li.style.backgroundColor = user.color;
    return li;
};