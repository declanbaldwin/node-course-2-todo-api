Backend: NodeJS
I have used NodeJS as it is relatively quick to get a server up and running and connect it to a database.

Database: MongoDB
I have useda local mongodb as a database to store all the information provided in the data.json file. The documents are inserted do use mongodb's own unique ID aswell as the numeric ID's provided.

Front-End:
I have implemented EJS to generate the HTML markup with vanilla JavaScript.

Testing: 
Mocha/Expect/Supertest
You can run the test by using the command 'npm test'

Known Issues:
I have only managed to implement a solution using a local mongodb database. I would have liked to host the application on heroku using an mlab database add on.

I have stored the files the uploads folder instead of the database as MongoDB cannot store files over 16MB without further complexity (GridFS), only the filepath is stored in the database. 

Scalablity:
In order to scale this solution I would need to change the storage system from storing the files in the uploads folder to a more robust method, e.g. cloud storage or storing the files in the mongodb database.

Uploading large files or relatively small files in large numbers very quickly would cause the application to run out of memory.

Considerations:
In the specification there was no requirement for allowing the User to reverse the upload. I have also implemeted a 'Reset' button at the top of the page to allow the user to remove all the files from the 'uploads' folder and reset the Status.

I would have also liked to implement a type of User Authentication to prevent anyone from uploading files.

I would also like to limit the type of file the user could upload and have a file size limit, which if exceeded, would show an error.

