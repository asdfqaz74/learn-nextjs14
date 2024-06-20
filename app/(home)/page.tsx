

import Movie from "../../components/movie";
import styles from '../../styles/home.module.css'

export const metadata = {
  title: "Home",
}

// async function testAPI() {
//   try {
//     const response = await fetch("http://localhost:3000/api/fetch-and-insert", {
//       method: "GET",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error('Error fetching API:', error);
//     return [];
//   }
// }

async function getMovies() {
  // await new Promise((resolve) => setTimeout(resolve, 1000))
  const response = await fetch('http://localhost:3000/api/movies', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  const movies = await response.json();
  console.log(movies);
  return movies;
}

export default async function HomePage() {
  // const apiTestResult = await testAPI();
  // console.log(apiTestResult);
  const movies = await getMovies();
  return <div className={styles.container}>
    {movies.map(movie => (
    <Movie key={movie.id} id={movie.id} poster_path={movie.poster_path} title={movie.title}/>
  ) )} </div>
}
