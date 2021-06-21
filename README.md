<img src="https://blog.maxpay.com/wp-content/uploads/2017/10/new-youtube-logo-840x402.jpg" align="middle">

<h1 align="middle">Youtube Clone</h1>

This is a simple youtube clone, implemented by using **Youtube API** and **Vue.js**.

## Missing Features

- Desktop Views:
  - [ ] Search
  - [ ] Video
  - [ ] Channel
  - [ ] Playlist
- Unit tests.

## Project setup

1. **Clone the repository**

```sh
$ git clone https://github.com/AlaaOthman98/youtube-clone.git
```

2. **Navigate to repository directory**

```sh
$ cd youtube-clone
```

3. **Install dependencies**

```sh
$ npm install
```

4. **Get Youtube Api Key**

For this application to work properly, you need to get an api key from Youtube Data API v3.

#### 1. Steps to create and use api key:

- Go to [Google Developer Console](https://console.developers.google.com/).
- Login with your Gmail account.
- Create a new project and name it _eg. youtube-api_.
- Choose the newly created project.
- Go to library and search for Youtube Data API v3.
- Choose **ENABLE** to be eligible for creating api key.
- Go to credentials and create api key then copy it.

  <center><a target="_blank" href="https://www.youtube.com/watch?v=N18czV5tj5o">Here is a video explaining the previous steps.</a></center>

#### 2. Insert api key into the project

- After navigation to the project root folder, create `.env.local` file.
- Insert this line in the file:
  ```
  VUE_APP_YOUTUBE_API_KEY=${YOUR_API_KEY}
  ```

### Running Project

1. **Compiles and hot-reloads for development**

```sh
$ npm run serve
```

2. **Compiles and minifies for production**

```sh
$ npm run build
```

3. **Run unit tests**

```sh
npm run test:unit
```

# Screenshots

## **Mobile Screens**

<table>
  <tr>
    <td>
      <h2>Search Results View</h2>
      <img src="https://raw.githubusercontent.com/AlaaOthman98/youtube-clone/main/.github/images/search-results.png" />
    </td>
    <td>
      <h2>Pagination</h2>
      <img src="https://raw.githubusercontent.com/AlaaOthman98/youtube-clone/main/.github/images/pagination.png"/>
    </td>
  </tr>

  <tr>
    <td>
      <h2>Video Details View</h2>
      <img src="https://raw.githubusercontent.com/AlaaOthman98/youtube-clone/main/.github/images/video-details.png" />
    </td>
    <td>
      <h2>Channel Details View</h2>
      <img src="https://raw.githubusercontent.com/AlaaOthman98/youtube-clone/main/.github/images/channel-details.png"/>
    </td>
  </tr>

  <tr>
    <td>
      <h2>Loading Status in App</h2>
      <img src="https://raw.githubusercontent.com/AlaaOthman98/youtube-clone/main/.github/images/loading-status.png" />
    </td>
    <td>
      <h2>404 Page</h2>
      <img src="https://raw.githubusercontent.com/AlaaOthman98/youtube-clone/main/.github/images/not-found.png" />
    </td>
  </tr>
</table>
