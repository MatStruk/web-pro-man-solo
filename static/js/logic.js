let logic = {
    ajax: function(method, route, sendValue, functionality) {
    if (sendValue == undefined) {
            sendValue = ''
        }
        var httpRequest = new XMLHttpRequest()
        httpRequest.onreadystatechange = function (data) {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                data = JSON.parse(httpRequest.response)
                if (eval != '') {
                    eval(functionality)
                }
            }
        }
        httpRequest.open(method, route, true);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        httpRequest.send(sendValue)
    }
}

/*
let logic = {
    ajax: function(method, route, sendValue, onReadyState, callback, dynamicCounter, functionality) {
    if (sendValue == undefined) {
            sendValue = ''
        }
        var httpRequest = new XMLHttpRequest()
        httpRequest.onreadystatechange = function (data) {
            if (httpRequest.readyState == 4 && httpRequest.status == 200) {
                data = JSON.parse(httpRequest.response)
                if (onReadyState == 'return') {
                    callback(data, dynamicCounter)
                }
                if (eval != '') {
                    eval(functionality)
                }
            }
        }
        httpRequest.open(method, route, true);
        httpRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        httpRequest.send(sendValue)
    }
}
*/