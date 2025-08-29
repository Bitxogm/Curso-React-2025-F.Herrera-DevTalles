import type { Gif } from "../interfaces/gif.interface";

interface GifProps {
  gifs: Gif[];
}

const GifList = ({gifs}: GifProps)  => {
  return (

          <div className="gifs-container">
            {
              gifs.map((gif) => (
                <div key={gif.id} className="gif-card">
                  <img src={gif.url} alt={gif.title}></img>
                  <h3>{gif.title}</h3>
                  <p>{gif.width}x{gif.height} (1.5mb)</p>
                </div>
              ))
            };
          </div>
    
  )
}

export default GifList;
