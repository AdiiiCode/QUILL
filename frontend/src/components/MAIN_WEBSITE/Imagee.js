// import React, { useState, useEffect } from "react";
// import axios from "axios";
// export default function Imagee() {
//   const [image, setImg] = useState();
//   const [allimage, setAllImg] = useState();

//   const onInputChange = (e) => {
//     console.log(e.target.files[0]);
//     setImg(e.target.files[0]);
//   };

//   useEffect(() => {
//     getImg();
//   }, []);
//   const getImg = async () => {
//     const result = await axios.get("http://localhost:5000/get-image");
//     console.log(result);
//     setAllImg(result.data.data);    
//   };
//   const handleick = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("image", image);
//     const result = await axios.post(
//       "http://localhost:5000/upload-image",
//       formData,
//       {
//         headers: { "Content-Type": "multipart/form-data" },
//       }
//     );
//   };

//   return (
//     <div>
//       <div>
//         <input type="file" onChange={onInputChange}></input>
//         {allimage &&
//           allimage.map((data, index) => (
//             <img
//               key={index}
//               src={require(`../../imgs/${data.image}`)}
//               alt={`Image ${index}`}
//               height={250}
//             />
//           ))}
//         <button
//           className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 rounded"
//           onClick={handleick}
//         >
//           Post a pic
//         </button>
//       </div>
//     </div>
//   );
// }
