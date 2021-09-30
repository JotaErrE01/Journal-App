import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config"


export const loadNotes = async uid => {

    const querySnapshot = await getDocs(collection(db, `${ uid }/journal/notes`));
    const notes = [];

    querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        notes.push({ 
            id: doc.id,
            ...doc.data()
        });
    });

    return notes;
}