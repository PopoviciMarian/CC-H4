import React, { useCallback, useState } from 'react';
import axios from 'axios';
import Head from 'next/head';
import Dropzone from 'react-dropzone';
import ImageUploadResult from '@/components/ImageUploadResult';

const Home = () => {
  const [files, setFiles] = useState([]);
  const [uploadMessage, setUploadMessage] = useState('');
  const [apiResponse, setApiResponse] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    setFiles(acceptedFiles);
    setApiResponse(null);

    const formData = new FormData();
    formData.append('image', acceptedFiles[0]);

    try{
      const response = await axios.post('/image/process', formData);
      setApiResponse(response.data);
      ImageUploadResult(response.data)
    
    } catch (error) {
      console.error(error);
      setUploadMessage('Error uploading image');
    }
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Image Upload</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">Upload an Image</h1>

        <Dropzone onDrop={onDrop}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop an image here, or click to select an image</p>
              </div>
            </section>
          )}
        </Dropzone>

        <div>
          {files.map(file => (
            <img key={file.name} src={URL.createObjectURL(file)} style={{ maxWidth: '100%' }} />
          ))}
        </div>

        {/* Display upload message */}
        {uploadMessage && <p>{uploadMessage}</p>}

        {/* Display API response */}
        {apiResponse && <ImageUploadResult data={"{\r\n    \"success\": true,\r\n    \"message\": \"Image uploaded successfully\",\r\n    \"data\": {\r\n        \"imageId\": \"c84f9052-cca7-4d00-9368-ebe1d6f7f174\",\r\n        \"resultedText\": \"Cat,Eye,Felidae,Carnivore,Small to medium-sized cats,Whiskers,Iris,Terrestrial animal,Snout,Tree\",\r\n        \"translations\": [\r\n            {\r\n                \"lang\": \"ro\",\r\n                \"message\": \"Pisic\u0103, ochi, felidae, carnivor, pisici de talie mic\u0103 p\u00E2n\u0103 la mijlocie, must\u0103\u021Bi, iris, animal terestru, bot, copac\"\r\n            },\r\n            {\r\n                \"lang\": \"de\",\r\n                \"message\": \"Katze, Auge, Felidae, Fleischfresser, Kleine bis mittelgro\u00DFe Katzen, Schnurrhaare, Schwertlilien, Landtiere, Schnauze, Baum\"\r\n            }\r\n        ],\r\n        \"feeling\": {\r\n            \"magnitude\": 0,\r\n            \"score\": 0\r\n        }\r\n    }\r\n}"} />}
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
          text-align: center;
        }

        .title,
        p {
          margin-bottom: 2rem;
        }

        p {
          font-size: 1.5rem;
          text-align: center;
        }

        section {
          border: 2px dashed #aaa;
          padding: 2rem;
          margin-top: 2rem;
          text-align: center;
        }

        img {
          margin-top: 2rem;
        }

        @media (max-width: 600px) {
          .title {
            font-size: 3rem;
          }
        }
      `}</style>
    </div>
  )
}

export default Home
