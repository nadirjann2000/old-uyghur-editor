# 古回鹘文编辑器部署手册

## 系统要求

- Node.js 16.x 或更高版本
- npm 7.x 或更高版本
- 现代浏览器（Chrome、Firefox、Safari 等）

## 部署步骤

### 1. 环境准备

1. 安装 Node.js 和 npm
   ```bash
   # 在 Ubuntu/Debian 系统上
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs

   # 验证安装
   node --version
   npm --version
   ```

2. 克隆项目代码
   ```bash
   git clone [项目仓库地址]
   cd old-uyghur-editor
   ```

### 2. 安装依赖

```bash
npm install
```

### 3. 构建项目

```bash
npm run build
```

构建完成后，会在 `build` 目录下生成可部署的静态文件。

### 4. 配置 Web 服务器

#### 使用 Nginx（推荐）

1. 安装 Nginx
   ```bash
   sudo apt-get update
   sudo apt-get install nginx
   ```

2. 配置 Nginx
   ```bash
   sudo nano /etc/nginx/sites-available/old-uyghur-editor
   ```

   添加以下配置：
   ```nginx
   server {
       listen 80;
       server_name your-domain.com;  # 替换为你的域名

       root /path/to/old-uyghur-editor/build;  # 替换为实际的构建目录路径
       index index.html;

       location / {
           try_files $uri $uri/ /index.html;
       }

       # 启用 gzip 压缩
       gzip on;
       gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
   }
   ```

3. 启用站点配置
   ```bash
   sudo ln -s /etc/nginx/sites-available/old-uyghur-editor /etc/nginx/sites-enabled/
   sudo nginx -t  # 测试配置
   sudo systemctl restart nginx
   ```

#### 使用 Apache

1. 安装 Apache
   ```bash
   sudo apt-get update
   sudo apt-get install apache2
   ```

2. 配置 Apache
   ```bash
   sudo nano /etc/apache2/sites-available/old-uyghur-editor.conf
   ```

   添加以下配置：
   ```apache
   <VirtualHost *:80>
       ServerName your-domain.com
       DocumentRoot /path/to/old-uyghur-editor/build

       <Directory /path/to/old-uyghur-editor/build>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>

       ErrorLog ${APACHE_LOG_DIR}/error.log
       CustomLog ${APACHE_LOG_DIR}/access.log combined
   </VirtualHost>
   ```

3. 启用站点配置
   ```bash
   sudo a2ensite old-uyghur-editor.conf
   sudo a2enmod rewrite
   sudo systemctl restart apache2
   ```

### 5. 配置 HTTPS（推荐）

1. 安装 Certbot
   ```bash
   sudo apt-get install certbot python3-certbot-nginx  # 如果使用 Nginx
   # 或
   sudo apt-get install certbot python3-certbot-apache  # 如果使用 Apache
   ```

2. 获取 SSL 证书
   ```bash
   # Nginx
   sudo certbot --nginx -d your-domain.com
   # 或 Apache
   sudo certbot --apache -d your-domain.com
   ```

### 6. 维护和更新

1. 更新代码
   ```bash
   git pull
   npm install
   npm run build
   ```

2. 重启 Web 服务器
   ```bash
   # Nginx
   sudo systemctl restart nginx
   # 或 Apache
   sudo systemctl restart apache2
   ```

## 故障排除

1. 如果遇到权限问题：
   ```bash
   sudo chown -R www-data:www-data /path/to/old-uyghur-editor/build
   ```

2. 如果遇到 404 错误：
   - 检查 Nginx/Apache 配置中的路径是否正确
   - 确保构建文件已正确生成
   - 检查文件权限

3. 如果遇到 SSL 证书问题：
   ```bash
   sudo certbot renew --dry-run
   ```

## 安全建议

1. 定期更新系统和依赖包
2. 配置防火墙
3. 启用 HTTPS
4. 设置适当的文件权限
5. 定期备份数据

## 监控

建议设置以下监控：

1. 服务器资源监控（CPU、内存、磁盘使用率）
2. 应用可用性监控
3. 错误日志监控
4. SSL 证书过期监控

## 联系支持

如遇到部署问题，请联系技术支持团队。 