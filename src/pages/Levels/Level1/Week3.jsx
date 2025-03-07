// // **Numbers (1-10)**  
// //    - Counting objects, fingers, and toes.  
// //    - Song: "Five Little Ducks."
// import React, { useState } from 'react';
// import styles from './NumbersGame.module.css'; // Import CSS Module

// const NumbersGame = () => {
//   // State for counting objects
//   const [objectCount, setObjectCount] = useState(0);

//   // State for "Five Little Ducks" song
//   const [ducks, setDucks] = useState(5);

//   // Handle counting objects
//   const handleCountObjects = () => {
//     if (objectCount < 10) {
//       setObjectCount((prev) => prev + 1);
//     }
//   };

//   // Handle "Five Little Ducks" song
//   const handleDucksSong = () => {
//     if (ducks > 0) {
//       setDucks((prev) => prev - 1);
//     }
//   };

//   // Reset the ducks song
//   const resetDucks = () => {
//     setDucks(5);
//   };

//   return (
//     <div className={styles.app}>
//       <h1>Learn Numbers (1-10)!</h1>

//       {/* Counting Objects */}
//       <div className={styles.countingSection}>
//         <h2>Counting Objects</h2>
//         <p>Click the objects to count:</p>
//         <div className={styles.objectsContainer}>
//           {Array.from({ length: objectCount }, (_, index) => (
//             <div key={index} className={styles.object}></div>
//           ))}
//         </div>
//         <button
//           className={styles.button}
//           onClick={handleCountObjects}
//           disabled={objectCount === 10}
//         >
//           Count ({objectCount}/10)
//         </button>
//       </div>

//       {/* Counting Fingers and Toes */}
//       <div className={styles.countingSection}>
//         <h2>Counting Fingers and Toes</h2>
//         <p>You have 10 fingers and 10 toes!</p>
//         <div className={styles.fingersToesContainer}>
//           <div className={styles.fingers}></div>
//           <div className={styles.toes}></div>
//         </div>
//       </div>

//       {/* "Five Little Ducks" Song */}
//       <div className={styles.songSection}>
//         <h2>Five Little Ducks</h2>
//         <p>{ducks} little ducks went out one day...</p>
//         <button
//           className={styles.button}
//           onClick={handleDucksSong}
//           disabled={ducks === 0}
//         >
//           One duck went away
//         </button>
//         <button className={styles.button} onClick={resetDucks}>
//           Reset Song
//         </button>
//       </div>
//     </div>
//   );
// };

// export default NumbersGame;