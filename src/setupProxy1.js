const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/api", "/uploads"], //자신이 설정한 업로드 API이름을 입력한다
        createProxyMiddleware({
            target: "http://diasm.mooo.com:3000", // target host API 서버 입력
            changeOrigin: true,
        })
    );
};
