import uniqueId from "uniqueid"

 export async function POST(req){
   const data= await req.formData()
    if(data.get('files'))
    {
        //console.log('we have a file',data.get('files'))

          const file=data.get('file')
        // const s3Client= new S3Client({
        //   region:'us-east-1',
        //   credentials:{
        //     acessKeyID: ,
        //     secretAcessKey:,
        //   }
        // })
      
      //const ext=file.name.split('.').slice(-1)[0];
      // const newFileName= uniqueId()+'.'+ext
      // const chunks=[]
      // for await (const chunk of file.stream()){
      //   chunks.push(chunk)
      // }

      // const buffer=Buffer.concat(chunks)
      // const bucket='sanchar-food-ordering'
      //console.log({ext})
      // s3Client.send(new PutObjectCommand({
      //   Bucket:'sanchar',
      //   key:''
      // ACL:'public-read'
      // ContentType:file.type,
      // Body: buffer,
      // }))
      // const link ='https://+'bucket'+.s3.amazonaws.com/'+newFileName
      // return Response.json('https://+'bucket'+.s3.amazonaws.com/')
    }
 return Response.json(true)
} 