# Restaurant_List
此專案可以讓使用者添加自己的餐廳收藏，可以在主畫面點擊餐廳圖示或底下的按鈕來瀏覽更詳細的餐廳資訊。
同時也具有修改及刪除餐廳資料的功能。

###### 本專案為練習 Node.js 的 Express 框架及樣板(handlebars)

## 功能
- 使用者可以瀏覽全部餐廳
- 使用者可以根據喜好來調整餐廳排序方式
- 使用者可以點擊**餐廳照片**或**Detail按鈕**來觀看餐廳的詳細內容
- 使用者可以用**餐廳名稱**或**類別**來搜尋列表中的餐廳
- 搜尋列表下列出可供點擊的類別，可以快速跳轉至該搜尋內容
- 若找不到結果，會顯示請使用者重新嘗試的畫面，並推薦評分排名較高餐廳
- 使用者可以自行**新增**一家餐廳
- 使用者可以**修改**一家餐廳的資訊
- 使用者可以**刪除**一家餐廳


## 畫面瀏覽
![image](https://github.com/Flipapa/restaurant_list/blob/main/2-3%20S4%20A8.png)

## 環境
- Node.js v10.15.0
- express v4.17.1
- express-handlebars v5.3.2
- mongoose v5.13.2
- mongodb v4.2.14

### 安裝
1. 開啟終端機(Terminal)將此專案Clone至本機電腦
```
git clone https://github.com/Flipapa/restaurant_list.git
```
2. 進入存放此專案的資料夾
```
cd restaurant_list
```
3. 安裝 npm 套件
```
npm install
```
4. 加入種子資料
```
npm run seed
```
5. 啟動網頁伺服器
```
npm run dev
```
當 Terminal 出現以下文字表示成功連結本地伺服器
```
Express is listening on localhost:3000
```
6. 在任一瀏覽器中輸入 http://localhost:3000 開始使用本專案