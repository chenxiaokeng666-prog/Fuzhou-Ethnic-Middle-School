福州民族中学静态网站项目 README
📌 项目简介
本项目为福州民族中学官方静态展示网站，基于纯前端技术开发，包含学校首页展示、校园介绍、相关资讯等核心页面。项目依托 GitHub Pages 实现免费、稳定的线上部署，无需服务器即可公开访问，页面加载流畅、适配电脑及手机端浏览。
所有网站文件已完整上传至本仓库，开箱即用，支持后续自由更新、迭代优化。
📁 项目结构
本项目为根目录部署结构，核心文件如下：
- index.html：网站首页入口文件，访问域名默认加载此页面
- 静态资源文件夹：包含网站所需图片、样式、脚本等配套资源
- 其他页面文件：支撑网站完整展示的次级页面及配置文件
🚀 线上部署教程（GitHub Pages）
项目代码已全部推送至 GitHub 仓库，仅需手动开启 Pages 服务即可上线，操作步骤极简：
1. 进入 Pages 配置页面
直达配置链接：https://github.com/chenxiaokeng666-prog/Fuzhou-Ethnic-Middle-School/settings/pages
2. 配置部署参数
在页面 Build and deployment 区域，修改以下配置：
- Source 选择：Deploy from a branch
- Branch 选择：main
- 文件夹路径：保持默认 / (root) 根目录
3. 保存并等待构建
点击页面底部 Save 按钮，等待 1-2 分钟，GitHub 自动完成项目构建与部署。
4. 网站访问地址
部署成功后，可通过以下链接正常访问校园网站：
https://chenxiaokeng666-prog.github.io/Fuzhou-Ethnic-Middle-School/
⚙️ Git 推送配置（必看）
由于网络环境限制，本项目推送代码需配置代理，否则会出现超时、推送失败问题。
1. 配置全局代理（后续免重复设置）
终端执行以下命令，绑定本地代理，后续直接 git push 即可自动生效：
git config --global http.proxy http://127.0.0.1:7890
git config --global https.proxy http://127.0.0.1:7890
2. 取消代理配置
无需代理时，执行以下命令关闭全局代理：
git config --global --unset http.proxy
git config --global --unset https.proxy
❓ 常见问题排查
- 访问页面 404：大概率为构建未完成，等待 2-3 分钟后刷新即可；若长期 404，检查 Pages 分支配置是否为 main 根目录
- 图片/资源不显示：多为文件路径大小写不统一、资源路径错误，可核对静态资源引用路径
- 代码推送超时：确认本地代理正常开启，且已配置上述 Git 代理命令
📝 更新说明
后续修改网站内容、更新页面样式、新增板块后，直接通过 Git 提交并推送代码，GitHub Pages 会自动重新构建更新线上页面，无需额外配置。
📌 仓库地址
项目开源仓库：https://github.com/chenxiaokeng666-prog/Fuzhou-Ethnic-Middle-School
