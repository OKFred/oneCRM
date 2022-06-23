//从插件接收信息并交给对应事件处理
window.addEventListener('message', function (e) {
    let obj = e.data
    if (obj.info == undefined) return //屏蔽来自其他页面的消息
    if (obj.info.ack) {
        //console.log('收到插件&后台的回复', obj)
        window.handler(obj)
    }
})

window.handler = function handler(obj) {
    console.log('交给我来处理吧', obj)
}

window.bgConnect = function bgConnect(obj) {
    window.postMessage(JSON.parse(JSON.stringify(obj)), '/')
} //向后台发送消息

console.log('I am listening...')