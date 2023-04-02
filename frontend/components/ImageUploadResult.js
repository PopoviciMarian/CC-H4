import React from 'react';

const ImageUploadResult = ({ data }) => {
    return (
      <div>
        <h2>API Response</h2>
        <h3>Translations:</h3>
        <ul>
          {data.translations.map((translation) => (
            <li key={translation.lang}>
              <strong>{translation.lang}:</strong> {translation.message}
            </li>
          ))}
        </ul>
        <h3>Feeling:</h3>
        <p>Magnitude: {data.feeling.magnitude}</p>
        <p>Score: {data.feeling.score}</p>
      </div>
    );
  };
  
  export default ImageUploadResult;