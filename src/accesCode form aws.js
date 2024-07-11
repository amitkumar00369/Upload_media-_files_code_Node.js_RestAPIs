const {S3Client,GetObjectCommand}=require('@aws-sdk/client-s3')

const { getSignedUrl }=require('@aws-sdk/s3-request-presigner')

const s3Client=new S3Client({
    region:"",
    credentials:{
        accessKeyId:"",
        secretAccessKey:""
    }
})


// const getNewCommand=new GetObjectCommand

async function getObjectUrls(key){
    const command=new GetObjectCommand({
        Bucket:"",
        key:key
    })
    const Url=getSignedUrl(s3Client,command)
    return Url;

}

async function init(){
    console.log('url for file',await getObjectUrls("image_file_name"))
}
init();