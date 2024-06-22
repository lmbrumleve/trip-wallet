import React, { useEffect, useState } from 'react'

export default function FlickrPhoto() {
    const[data, setData] = useState({});


    //FETCH PHOTO:
const fetchJsonPhoto = async () => {
    try{
        const response = await fetch("https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b4d7879b676db4c084c8faa15e2abe8d&text=landmark&tags=tanzania&format=json&nojsoncallback=1")
        .then(res=>res.json()).then((result)=>{setData(result);})
     }
     catch(error){
         console.log(error);
     }
      };

useEffect(() => {
        fetchJsonPhoto();
}, []);

console.log(data)

let photoServer = data.photos.photo[0];
let photoId = data.photo;
let photoSecret = data.photo;

console.log(photoServer)

const srcPhoto = `https://live.staticflickr.com/${photoServer}/${photoId}_${photoSecret}_b.jpg`
console.log(srcPhoto)
// useEffect(()=>{
//     setPhoto(`https://live.staticflickr.com/${data.photos.photo[0].server}/${data.photos.photo[0].id}_${data.photos.photo[0].secret}_b.jpg`)
// }, [jsonPhoto])


  return (
    <div>Photo</div>
  )
}
