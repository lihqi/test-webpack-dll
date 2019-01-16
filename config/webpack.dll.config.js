const path = require("path");
const webpack = require("webpack");
const fs = require("fs");
/**
 * 尽量减小搜索范围
 * target: '_dll_[name]' 指定导出变量名字
 */
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
module.exports = {
  entry: {
    vendor: ["react", "react-dom"]
  },
  output: {
    path: resolveApp("build"),
    filename: "[name].dll.js",
    library: "_dll_[name]" // 全局变量名，其他模块会从此变量上获取里面模块
  },
  // manifest是描述文件
  plugins: [
    new webpack.DllPlugin({
      name: "_dll_[name]",
      path: resolveApp("build/manifest.json"),
      context: path.resolve(__dirname, "../")
    })
  ]
};
