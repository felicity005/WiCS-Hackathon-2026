// import {useState} from "react";

// function App() {
//   // Youtube API
//   const API_KEY = "AIzaSyDDNb40PwR1mM-dU7JqGMjX5AQerXFeWz4";
//   const [query, setQuery] = useState("");
//   const [videos, setVideos] = useState([]);

//   function searchYouTube() {
//     const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=10&order=relevance&videoDuration=medium&q=${encodeURIComponent(query)}&key=${API_KEY}`;
    
//     fetch(url)
//     .then(response => response.json())
//     .then(data => {
//       setVideos(data.items);
//     })
//     .catch(err => console.error(err));
//   }
//   return (
//     <div>
//       <input
//         type = "text"
//         value = {query}
//         onChange = {e => setQuery(e.target.value)}    // Get user's input
//       />
//       <button onClick={searchYouTube}>Search</button>

//       <div>
//         {videos.map(item => (
//         <div key={item.id.videoId}>
//           <h3>{item.snippet.title}</h3>
//           <iframe
//             width = "500"           // Change width of video
//             height = "300"          // Change height of video
//             src = {`https://www.youtube.com/embed/${item.id.videoId}`}
//             allowFullScreen
//           />
//         </div>
//         ))}
//         </div>
//     </div>
//   );
// }

// export default App;