# Tạo bot 🤖 discord với discord.js và erela.js

Bạn đã quá chán nản 💢 với việc nghe nhạc trên youtube mà lại bị gián đoạn bởi một đoạn quảng cáo nào đó 😞, hay khi nghe nhạc ️🎶 trên mobile phải luôn mở youtube mà không làm được việc khác trên điện thoại, bạn muốn tắt máy mà vẫn nghe được nhạc📱.

Ngoài việc cài đặt [extension](https://chrome.google.com/webstore/detail/ublock-origin/cjpalhdlnbpafiamejdnhcphjbkeiagm) cho trình duyệt hay lên premium thì việc tạo một con bot 🤖 discord cũng khá là thú vị ák😒 (đặc biệt khi ở mobile thì không dùng extension như desktop được 😞).

Bài viết này sẽ nêu các chức năng cũng như cách cài đặt và sử dụng bot discord bằng thư viện discord.js.

## Acknowledgments

- [Node JS](https://nodejs.org/en/docs/)
- [Discord.js](https://discord.js.org/#/docs/discord.js/main/general/welcome)  
- [Erela.js](https://erelajs-docs.netlify.app/guides/introduction.html)

## Tech Stack

**Code:** Node, nodemon, fetchAPI, discord.js, dotenv, erela.js, js

**Discord:** set up develop bot discord.

## Authors

- [Nguyen Nhat Hao](https://www.github.com/nxhawk)


## Installation | How to use the Bot

> **<kbd>1.</kbd>** Install [node.js v16.14+](https://nodejs.org/en) or higher
> 
> **<kbd>2.</kbd>** Download this repo and unzip it | or `git clone https://github.com/nxhawk/bot-discord.js.git`
> 
> **<kbd>3.</kbd>** Install all of the packages with **`npm install`** | the important packages are   **`npm install discord.js@latest erela.js`**
> 
> **<kbd>4.</kbd>** Need to add the following environment variables to your .env file (see [.env.example](https://github.com/nxhawk/bot-discord.js/blob/master/.env.example) file).
> 
> **<kbd>5.</kbd>** start the bot with **`npm start` / `node .` / `npm run dev`**

#### **NOTE:**
> *If you are having errors/problems with starting delete the `package.json` file and do, before you install the packages `npm init`*

***

## Free Lavalink hosting
 
 ![image](https://user-images.githubusercontent.com/92797788/216119064-b760b017-c34a-4fb9-823f-68dde762b0be.png)

  You can [see more](https://lavalink.darrennathanael.com/SSL/lavalink-with-ssl/) lavalink hosting.
  
## Bot's execution commands

### 1. Message 

> **<kbd>1.</kbd>** `!cat` bot will reply with a cat photo 
> 
> **<kbd>2.</kbd>** `!dog` bot will reply with a dog photo
> 
> **<kbd>3.</kbd>** `!dark` bot will reply to a meme image, but it's a bit dark (-)(-) 
> 
> **<kbd>4.</kbd>** `!quote` returns a sentence of a certain famous person in English
> 
> **<kbd>5.</kbd>** `load [url playlist youtube]` bot will add the songs in this playlist to the queue (correct order). If no song is playing, bot will play the first song in the playlist      
> **<kbd>6.</kbd>** `!top [url]` add song on top quêu
> 
> **<kbd>7.</kbd>** `!infor @<ID>` get information userID
> 
> **<kbd>8.</kbd>** `!help` show help message
> 
> **<kbd>9.</kbd>** `!bot` call bot, If you want to play music call `/clear` before 
> 

### 2. Interaction

> 
> **<kbd>1.</kbd>** `/ping` test interaction, bot will respond `Pong pong pong`
> 
> **<kbd>2.</kbd>** `/order food: drink:` order food and drink, bot only responds to the item you selected
> 
> **<kbd>3.</kbd>** `/play song_name (url):` will find and play the first song it finds with `song_name`(or url) on youtube. If there is a song playing bot will add it to the end of the queue music   
> 
> **<kbd>4.</kbd>** `/search song_name:` will search and return information 10 results found on youtube with keyword `song_name`. After having this information, users can choose a song to play or add to the queue by entering the song's number in the search results.  
> 
> **<kbd>5.</kbd>** `/pause` Pause the currently playing song
> 
> **<kbd>6.</kbd>** `/unpause` Resume playing paused song
> 
> **<kbd>7.</kbd>** `/replay` playback from the beginning of the currently playing song
> 
> **<kbd>8.</kbd>** `/skip` play the next song in the queue song
> 
> **<kbd>9.</kbd>** `/infor` return basic information of the currently playing song
> 
> **<kbd>10.</kbd>** `/list` Returns information about all songs in the song queue
> 
> **<kbd>11.</kbd>** `/mix` shuffle the song currently in the song queue 
> 
> **<kbd>12.</kbd>** `/clear` Clear all queue music 
> 
> **<kbd>13.</kbd>** `/server` get information of server 
> 
> **<kbd>14.</kbd>** `/getvolume` get volume music now 
> 
> **<kbd>15.</kbd>** `/setvolume` set volume music to x% 
>
## Development
 * Người dùng có thể thêm database (mongoseDB, SQL,...) để quản lí việc thêm, xóa bài hát, tạo playlist cho từng cá nhân cụ thể.
 * Deploy bot lên một server nào đó.
 * Thêm các API, chức năng khác như lấy một bài thơ ngẫu nhiên nào đó. Có thể thêm (tạo) server để quản lí việc gọi API.   
 * Tích hợp chatGPT vào cũng khá thú vị🤔

## Test bot



