const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(
        ["/api"], //자신이 설정한 업로드 API이름을 입력한다
        createProxyMiddleware({
            //   target: env.BASE_URL,
            target: "https://thaitour.shop",
            changeOrigin: true,
        })
    );
};
