import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase-config";
import { getDoc } from "firebase/firestore";
import "react-quill/dist/quill.snow.css";
import "../App.css";
import { onSnapshot } from "firebase/firestore";
import { throttle } from "lodash";

const TextEditor = () => {
  const quillRef = useRef<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const isLocalChange = useRef(false);
  const documentRef = doc(db, "documents", "sample-doc");
  const saveContent = throttle(() => {
    if (quillRef.current && isLocalChange.current) {
      const content = quillRef.current.getEditor().getContents();
      console.log(`Saving content to DB `, content);
      setDoc(documentRef, { content: content.ops }, { merge: true })
        .then(() => {
          console.log("Content saved");
        })
        .catch(console.error);
      isLocalChange.current = false;
    }
  }, 1000);
  useEffect(() => {
    if (quillRef.current) {
      // loading initial content from firestore DB
      getDoc(documentRef)
        .then((docSnap) => {
          if (docSnap.exists()) {
            const savedContent = docSnap.data().content;
            if (savedContent) {
              quillRef.current.getEditor().setContents(savedContent);
            } else {
              console.log("No document found, starting with an empty editor");
            }
          }
        })
        .catch(console.error);

      // listening to firestore for any updates and updating locally
      const unsubscribe = onSnapshot(documentRef, (snapshot) => {
        if (snapshot.exists()) {
          const newContent = snapshot.data().content;
          if (!isEditing) {
            const editor = quillRef.current.getEditor();
            const currentCursorPosition = editor.getSelection()?.index || 0;
            editor.setContents(newContent, "silent");
            editor.setSelection(currentCursorPosition);
          }
        }
      });
      // listening for local text changes and saving it to firestore
      const editor = quillRef.current.getEditor();
      editor.on("text-change", (delta: any, oldDelta: any, source: any) => {
        isLocalChange.current = true;
        setIsEditing(true);
        saveContent();
        setTimeout(() => setIsEditing(false), 5000);
      });
      return () => {
        unsubscribe();
        editor.off("text-change");
      };
    }
  }, []);
  return (
    <div className="syncit-editor">
      <ReactQuill ref={quillRef} />
    </div>
  );
};

export default TextEditor;
