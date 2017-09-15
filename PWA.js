(function () {
    "use strict"
    if (navigator.serviceWorker != null) {
        navigator.serviceWorker.register('server-worker.js', {scope: "/"})
            .then(function (registration) {
                console.log('Registered events at scope: ', registration.scope);
            })
            .catch(function (error) {
            console.log('ServiceWorker 注册失败:')
        });
    }
})()