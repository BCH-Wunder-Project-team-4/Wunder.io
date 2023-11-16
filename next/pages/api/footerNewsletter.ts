import { NextApiRequest, NextApiResponse } from "next";

import { drupal } from "@/lib/drupal/drupal-client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {

  // The locale is passed in this header:
  const languagePrefix = req.headers["accept-language"];

  try {
    if (req.method === "POST") {
      const url = drupal.buildUrl(`/${languagePrefix}/webform_rest/submit`);
      const body = JSON.parse(req.body);
      console.log("url", url);




      // Submit to Drupal.
      const result = await drupal.fetch(url.toString(), {
        method: "POST",
        body: JSON.stringify({
          webform_id: "newsletter1",
          news: body.news,
          careers: body.careers,
          events: body.events,
          email: body.email,
          terms: body.terms,
        }),
        headers: {
          "Content-Type": "application/json",
          // Pass the token to authenticate the request:

        },
      });

      if (result.ok) {
        res.status(200).end();
      } else {
        res.status(result.status).end();
        throw new Error();
      }
    }
  } catch (error) {
    return res.status(400).json(error.message);
  }
}
