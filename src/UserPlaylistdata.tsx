import React from 'react'
import { Buffer } from "buffer";

function UserPlaylistdata() {

     const client_id = '6cf31dc4cc594dc7a564034bf678a638';
     const client_secret = '95d66f5c84754fd08720135552c293ea';


     async function getToken() {
          const response = await fetch('https://accounts.spotify.com/api/token', {
               method: 'POST',
               body: new URLSearchParams({
                    'grant_type': 'client_credentials',
               }),
               headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64')),
               },
          });

          return await response.json();
     }

     async function getTrackInfo(access_token: string) {
          const response = await fetch("https://api.spotify.com/v1/tracks/4cOdK2wGLETKBW3PvgPWqT", {
               method: 'GET',
               headers: {'Authorization': 'Bearer ' + access_token},
          });

          return await response.json();
     }

     getToken().then(response => {
          getTrackInfo(response.access_token).then(profile => {
               console.log(profile)
          })
     });
}


export default UserPlaylistdata;