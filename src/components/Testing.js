import { useState } from "react";
import { db } from "../firebase-config"
import { addDoc, collection, getDocs } from "firebase/firestore";
import { useContext } from "react";
import AppContext from "../AppContext";


export default function Testing() {
    const [result, setResult] = useState("");
    const { user } = useContext(AppContext)

    async function submitDada(event) {
        event.preventDefault();
        const inputElements = [...event.target.elements]
       
        try {
            const docRef = await addDoc(collection(db, "UserRating"), {
              user : user.displayName,
              rating: inputElements[0].value
            });
            console.log("Document written with ID: ", docRef.id);
          } catch (e) {
            console.error("Error adding document: ", e);
          }

    }

    async function readData() {
        const querySnapshot = await getDocs(collection(db, "UserRating"));
        querySnapshot.forEach((doc) => {
        console.log(`${doc.data().user} => ${doc.data().rating}`);
});
    }

    readData()

    return(
        <div className="input-cont">
            <form onSubmit={submitDada}>
                <input style={{color:"white", width:"300px", height:"70px",border:"1px solid white"}}className="testing"></input>
                <button style={{color:"white"}}type="submit">Submit</button>
            </form>
        </div>
    )
}