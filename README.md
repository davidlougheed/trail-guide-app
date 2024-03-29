<img src="./assets/dtgs_logo.png" alt="David's Trail Guide System Logo" width="200" height="109">

# Trail Guide App

**Author:** David Lougheed

I have built a corresponding content editor 
[front end](https://github.com/davidlougheed/trail-guide-content-web) and 
[back end](https://github.com/davidlougheed/trail-guide-content-server), to make it
easy for users to update content and make it accessible for a CI pipeline to
integrate the content into a binary.

Test data is used with permission from the Queen's University Biological 
Station and is &copy; Queen's University 2016-present.

**Note that the following files are not licensed under the project license,
and may not be used without permission from the above copyright holder:**

  * `data/stations.example.json`
  * `data/modals.json`
  * `data/pages.json`
  * Everything in `data/about` except files with the `.js` extension.
  * Everything in `data/assets` except files with the `.js` extension.

## About

This is a flexible React Native + Expo app for creating a trail guide with 
interactive virtual stations that (optionally) correspond to a real world 
location.

The app functions offline (albeit with GPS connectivity), and thus has to build
in station data and assets rather than loading them from the internet.

It was originally designed with the 
[Elbow Lake Environmental Education Centre](https://elbowlakecentre.ca) in mind,
while simultaneously being a reusable free software solution to making trail 
guide applications.
