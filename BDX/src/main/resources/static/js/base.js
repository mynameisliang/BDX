ScreenWidth=window.screen.availWidth-7;

//TODO 浏览器大小
// 变化监听
function get(url,success,req){
    ajax(url,"GET",{},success,req);
}
function post(url,data,success,req){
    ajax(url,"POST",data,success,req);
}
//Ajax方法 timeout防止请求超时
function ajax(url,type, data, success,req) {
    $.ajax({
        url:url,
        type:type,
        data:data,
        timeout:7000,
        dataType:'json',
        success:function (result) {
            success(result)
        },
        error:function (xhr,status,thrown) {
            switch (status){
                case "abort":
                    alert("请求终止");break;
                case "parsererror":
                    alert("数据解析错误");break;
                case "notmodified":
                    alert("内容未更改");break;
                case "timeout":
                    alert("请求超时");break;
                default:alert("请求出错");
            }
            console.log(req+" 出错："+status+" >"+thrown+"\n[readyState:"+xhr.readyState+",Status:"+xhr.status+",StatusText:"+xhr.statusText+
                ",ResponseText:"+xhr.responseText+"]")
        }
    })
}
