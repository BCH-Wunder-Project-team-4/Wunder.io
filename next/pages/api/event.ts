import { NextApiRequest, NextApiResponse } from "next";


import { drupal } from "@/lib/drupal/drupal-client";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Because we want to allow only registered users to submit
  // to the contact webform, let's get the session:
  
  // The locale is passed in this header:
  const languagePrefix = req.headers["accept-language"];

  // if there is no session, return 401:
  

  try {
    if (req.method === "POST") {
      const url = drupal.buildUrl(`/${languagePrefix}/webform_rest/submit`);
      const body = JSON.parse(req.body);
      const webformId = body.name.toLowerCase().split(' ').join('_');
      
      
      
      
      

      // Submit to Drupal.
      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          webform_id: webformId,
          email: body.email,
        }),
        headers: {
          "Content-Type": "application/json",
          // Pass the token to authenticate the request:
          
        },
      });

      if (result.ok) {        
        res.status(200).end();
      } else {  
        const error = await result.json();
        // console.log('response', error);             
        res.status(result.status).end();
        throw new Error();       
      }
      
    }
  } catch (error) {              
    return res.status(400).json(error.message);
  }
}
