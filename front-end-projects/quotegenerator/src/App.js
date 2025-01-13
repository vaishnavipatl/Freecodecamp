import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [quotes, setQuotes] = useState([]);
  const [currentQuote, setCurrentQuote] = useState(null);
  const[bagroundColor , setBackgroundColor]=useState("#1DA1F2");

  // Fetch quotes on component mount
  useEffect(() => {
    fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
      .then(response => response.json())
      .then(data => {
        setQuotes(data.quotes);
        setCurrentQuote(data.quotes[Math.floor(Math.random() * data.quotes.length)]); // Set a random quote initially
      })
      .catch(error => {
        console.error('Error fetching quotes:', error);
      });
  },[]);

  

  // Function to fetch a new random quote
  const getNewQuote = () => {
    if (quotes.length > 0) {
      const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
      setCurrentQuote(randomQuote);
      const colors = [
        "#FF5733", // Red-Orange
        "#FF8D1A", // Orange
        "#FFC300", // Yellow
        "#DAF7A6", // Light Green
        "#33FF57", // Green
        "#1F8A70", // Teal
        "#33B5FF", // Light Blue
        "#1F4F7A", // Navy Blue
        "#8A2BE2", // Blue-Violet
        "#D500F9", // Purple
        "#FF1493", // Deep Pink
        "#FF69B4", // Hot Pink
        "#F4A300", // Orange-Yellow
        "#FFC0CB", // Pink
        "#6A5ACD", // Slate Blue
        "#20B2AA", // Light Sea Green
        "#FF4500", // Orange-Red
        "#00FA9A", // Medium Spring Green
        "#F0E68C", // Khaki
        "#B0E0E6", // Powder Blue
      ];
      
      let randomcolors = colors[Math.floor(Math.random()*colors.length)]
      setBackgroundColor(randomcolors)
    }
  };

  return (

    <div className="App" > 
   
      <div id="quote-box">
        <div className='text-author'>
        {currentQuote && (
          <> 
            <p id="text" style={{'--background-color' : bagroundColor}}>{`"${currentQuote.quote}"`}</p>
            <p id="author" style={{'--background-color' : bagroundColor}}>- {currentQuote.author}</p>
          </> 
        )}
        </div>
        < div className='button-container'>
               
               <a
                  id="tweet-quote"
                  href={`https://twitter.com/intent/tweet?text="${currentQuote?.quote}" - ${currentQuote?.author}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button style={{'--background-color' : bagroundColor}}><i className="fab fa-twitter"></i></button>
                   
                </a>

                <button id="new-quote" onClick={getNewQuote}  style={{'--background-color' : bagroundColor}}>New Quote</button>
        </div>
      </div>
    </div>
  
  );
}

export default App;
