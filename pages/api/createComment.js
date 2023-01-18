import SanityClientConstructor from "@sanity/client";
export const config = {
  
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  token: process.env.SANITY_API_TOKEN,
   apiVersion: "2021-08-11",
  /**
   * Set useCdn to `false` if your application require the freshest possible
   * data always (potentially slightly slower and a bit more expensive).
   * Authenticated request (like preview) will always bypass the CDN
   **/
  useCdn: process.env.NODE_ENV === "production",
};

const client = SanityClientConstructor(config)

export default async function createComment(req, res) {
const { _id , name , email, comment } = JSON.parse(req.body) ;

try {
  await client.create({
    _type: 'comment' , 
    post: {
      _type: "reference",
      _ref : _id ,
      
    },
    
    name ,
    email ,
    comment

  });
} catch (err) {
  return res.status(500).json({message: "Could not submit comment" , err});
}

console.log("comment submitted");
return res.status(200).json({message: "Comment submitted"})
}
