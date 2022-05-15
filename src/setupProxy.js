const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/api", "/uploads"], //자신이 설정한 업로드 API이름을 입력한다
        createProxyMiddleware({
            target: "http://52.221.217.61", // target host API 서버 입력
            changeOrigin: true,
        })
    );
    // players (부모 라우터) 자식은 불필요
    // app.use(
    //     ["/test"],
    //     createProxyMiddleware({
    //         target: "https://s3.ap-northeast-2.amazonaws.com/lewigolski-bk.shop", // target host API 서버 입력
    //         changeOrigin: true,
    //     })
    // );
};

//https://s3.ap-northeast-2.amazonaws.com/lewigolski-bk.shop

// https://d356e4e9-1c8b-4ab7-9a98-69f30037436d.mock.pstmn.io

// 세명님 서버
