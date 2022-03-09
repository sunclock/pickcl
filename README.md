# Pickcl - audio player app

Simple audio player app with React Native and TypeScript

[Blog post link on the lessons i learned during development](https://velog.io/@sunclock/%EC%9D%8C%EC%95%85-%EC%9E%AC%EC%83%9D-%EC%95%B1-%EA%B0%9C%EB%B0%9C-%EB%92%B7%EC%9D%B4%EC%95%BC%EA%B8%B0)

## pickcl 1.0.1의 테스터가 되어보세요!

[pickcl 1.0.1 테스터 안내 링크](https://descriptive-frost-43a.notion.site/pickcl-1-0-1-Android-Test-cf68e7dca2ef46048576682b1cf0775c)

## Table of Contents

- [Screenshots](#Screenshots)
- [Features](#features)
- [Technologies](#technologies)
- [Status](#status)
- [Setup](#setup)

## Screenshots

<img alt="파일을 추가하는 방법" src="https://user-images.githubusercontent.com/69966899/157003118-abe3e0b6-1fc4-4d1d-9aac-4139d81962e9.gif" width="250" height="100%" /> <img alt="북마크 추가하는 방법" src="https://user-images.githubusercontent.com/69966899/157005500-94444189-730a-4eab-b1d1-557c77080f6a.gif" width="250" height="100%" /> <img alt="북마크 재생하는 방법" src="https://user-images.githubusercontent.com/69966899/157002364-c30793d3-8123-4ccd-b495-b30c1a1fd022.gif" width="250" height="100%" />

## Features

- **No Internet Connection** - read audio files from local storage and keep it safe in local storage's boundary.
- **Bookmark** - Bookmark your favorite part with memo and play them again by clicking on memo!
- **List** - List bookmarks and tracks and easily access them.
- **30 minutes and more** - This App focus on enhancing experience of streaming long audio files (longer than 30 minutes).
- **Dark Mode Support** - From Mar 9 2022, Pickcl supports dark mode!

### To do:

- Easily share your favorite bookmarks with your friends
- Make multiple playlist with custom design
- Support image upload for artwork, voice actors, playlist

## Technologies

Project is created with the help of:

- "react-native": "0.67.3"
- "react-native-track-player": "^2.1.2"

## Status

This project is being developed for further enhancements.
but it works fine and supports features mentioned above; playing audio files from local storage, list and bookmark them.

## Setup

To run this project, install it locally using npm:

```
cd pickcl/
npm install
npx react-native run-android
```
