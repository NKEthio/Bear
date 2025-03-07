// // **Animals**  
// //    - Farm animals, pets, and animal sounds.  
// //    - Activity: Animal charades.  
// import React, { useState } from 'react';
// import styles from './AnimalsGame.module.css'; // Import CSS Module

// const AnimalsGame = () => {
//   // List of animals, their names, and sounds
//   const animals = [
//     { id: 1, name: 'Cow', sound: 'Moo', type: 'Farm Animal' },
//     { id: 2, name: 'Dog', sound: 'Woof', type: 'Pet' },
//     { id: 3, name: 'Cat', sound: 'Meow', type: 'Pet' },
//     { id: 4, name: 'Sheep', sound: 'Baa', type: 'Farm Animal' },
//     { id: 5, name: 'Duck', sound: 'Quack', type: 'Farm Animal' },
//     { id: 6, name: 'Pig', sound: 'Oink', type: 'Farm Animal' },
//   ];

//   // State for the current animal in the charades game
//   const [currentAnimal, setCurrentAnimal] = useState(animals[0]);
//   const [showName, setShowName] = useState(false);
//   const [showSound, setShowSound] = useState(false);

//   // Handle next animal in charades
//   const handleNextAnimal = () => {
//     const randomIndex = Math.floor(Math.random() * animals.length);
//     setCurrentAnimal(animals[randomIndex]);
//     setShowName(false);
//     setShowSound(false);
//   };

//   return (
//     <div className={styles.app}>
//       <h1>Learn About Animals!</h1>

//       {/* Animal Flashcards */}
//       <div className={styles.flashcardsSection}>
//         <h2>Animal Flashcards</h2>
//         <div className={styles.flashcardsContainer}>
//           {animals.map((animal) => (
//             <div key={animal.id} className={styles.flashcard}>
//               <h3>{animal.name}</h3>
//               <p>{animal.type}</p>
//               <button
//                 className={styles.button}
//                 onClick={() => alert(`The ${animal.name} says ${animal.sound}!`)}
//               >
//                 Hear Sound
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Animal Charades Game */}
//       <div className={styles.charadesSection}>
//         <h2>Animal Charades</h2>
//         <p>Act out or guess the animal:</p>
//         <div className={styles.charadesCard}>
//           <p>Type: {currentAnimal.type}</p>
//           {showName && <p>Name: {currentAnimal.name}</p>}
//           {showSound && <p>Sound: {currentAnimal.sound}</p>}
//           <div className={styles.buttonGroup}>
//             <button
//               className={styles.button}
//               onClick={() => setShowName(true)}
//               disabled={showName}
//             >
//               Reveal Name
//             </button>
//             <button
//               className={styles.button}
//               onClick={() => setShowSound(true)}
//               disabled={showSound}
//             >
//               Reveal Sound
//             </button>
//             <button className={styles.button} onClick={handleNextAnimal}>
//               Next Animal
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AnimalsGame;