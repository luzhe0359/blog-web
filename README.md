# Quasar Admin (blog_admin)

lz_blog_admin

## Install the dependencies
```bash
yarn
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```


### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).

### Define state code
###### 传输层：接口正常或异常，用http状态码
|  CODE   | STATE  |
|  ----  | ----  |
| 200  | 请求成功 |
| 500  | 求情失败 |
###### 业务层：业务正常或异常，用自定义状态码
|  CODE   | STATE  |
|  ----  | ----  |
| 2000  | 请求成功 |
| 2002  | 用户名/密码错误 |
| 2001  | 账号已存在 |
| 4001  | token无效 |
| 4003  | token过期 |
| 4004  | 请求资源不存在 |
| 5000  | 服务器不在范围 |
