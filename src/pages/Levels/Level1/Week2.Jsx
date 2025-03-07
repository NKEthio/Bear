// // **Colors and Shapes**  
// //    - Red, blue, circle, square, etc.  
// //    - Activity: Color sorting and shape matching games. 
// import React, { useState } from 'react';
// import styles from './ColorsAndShapes.module.css'; // Import CSS Module

// const ColorsAndShapes = () => {
//   // State for color sorting game
//   const [colors, setColors] = useState(['red', 'blue', 'green', 'yellow']);
//   const [sortedColors, setSortedColors] = useState({ red: [], blue: [], green: [], yellow: [] });

//   // State for shape matching game
//   const [shapes, setShapes] = useState([
//     { id: 1, name: 'circle', matched: false },
//     { id: 2, name: 'square', matched: false },
//     { id: 3, name: 'triangle', matched: false },
//     { id: 4, name: 'star', matched: false },
//   ]);

//   // Handle color sorting
//   const handleColorSort = (color, item) => {
//     setSortedColors((prev) => ({
//       ...prev,
//       [color]: [...prev[color], item],
//     }));
//   };

//   // Handle shape matching
//   const handleShapeMatch = (id) => {
//     setShapes((prev) =>
//       prev.map((shape) =>
//         shape.id === id ? { ...shape, matched: true } : shape
//       )
//     );
//   };

//   return (
//     <div className={styles.app}>
//       <h1>Learn Colors and Shapes!</h1>

//       {/* Color Sorting Game */}
//       <div className={styles.colorSortingGame}>
//         <h2>Color Sorting</h2>
//         <div className={styles.colorBoxes}>
//           {colors.map((color) => (
//             <div
//               key={color}
//               className={styles.colorBox}
//               style={{ backgroundColor: color }}
//               onDragOver={(e) => e.preventDefault()}
//               onDrop={(e) => {
//                 e.preventDefault();
//                 const item = e.dataTransfer.getData('text/plain');
//                 handleColorSort(color, item);
//               }}
//             >
//               {sortedColors[color].map((item, index) => (
//                 <div key={index} className={styles.sortedItem} style={{ backgroundColor: item }}>
//                   {item}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>
//         <div className={styles.colorItems}>
//           {colors.map((color) => (
//             <div
//               key={color}
//               className={styles.colorItem}
//               style={{ backgroundColor: color }}
//               draggable
//               onDragStart={(e) => e.dataTransfer.setData('text/plain', color)}
//             >
//               {color}
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Shape Matching Game */}
//       <div className={styles.shapeMatchingGame}>
//         <h2>Shape Matching</h2>
//         <div className={styles.shapesContainer}>
//           {shapes.map((shape) => (
//             <div
//               key={shape.id}
//               className={`${styles.shape} ${shape.matched ? styles.matched : ''}`}
//               onClick={() => handleShapeMatch(shape.id)}
//             >
//               <div className={`${styles.shapeOutline} ${styles[shape.name]}`}></div>
//               {!shape.matched && (
//                 <div className={`${styles.shapeImage} ${styles[shape.name]}`}></div>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ColorsAndShapes;