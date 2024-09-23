// export default function EditableImage({link,setLink}){
//     async function handleFileChange(ev){
    
//         const files= ev.target.files;
//         if(files?.length===1){
//             const data =new FormData;
//             data.set('files',files[0])
//          const response=   await    fetch('/api/upload',{
//                 method:'POST',
//                 body:data,
//               //   headers:{'Content-Type':'multipart/form-data'}
//             })
//             const link = await response.json()
//             }
//         }
//  return(

//  )    
// }