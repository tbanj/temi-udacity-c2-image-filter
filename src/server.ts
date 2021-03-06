import express from 'express';
import bodyParser from 'body-parser';
import { filterImageFromURL, deleteLocalFiles } from './util/util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1




  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image


  app.get("/filteredimage", async (req: express.Request, res: express.Response) => {
    try {
      //    1. validate the image_url query
      let { image_url } = req.query;

      if (!image_url) {
        return res.status(422)
          .send({
            success: false,
            message: `image_url is required`
          });
      }

      //    2. call filterImageFromURL(image_url) to filter the image
      const filteredpath: string = await filterImageFromURL(image_url);

      //    3. send the resulting file in the response
      if (filteredpath) {
        /*      res.status(200)
               .send({
                 success: true,
                 message: 'image filtered',
                 data: filteredpath
               }); */
        // const data =

        const data = filteredpath;
        res.sendFile(data,
          //    4. deletes any files on the server on finish of the response
          async () => await deleteLocalFiles([filteredpath]));
        // return res.sendFile(filteredpath)

        return;
      }




      // RETURNS
      //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]


    } catch (error) {
      console.error('Error', error);
      res.status(503)
        .send({
          message: "An error occured while processing data",
        });
    }
  });
  /**************************************************************************** */

  //! END @TODO1

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req: express.Request, res: express.Response) => {
    res.send("try GET /filteredimage?image_url={{}}")
  });


  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();