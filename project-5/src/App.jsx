import Navbar from "./components/Navbar";
import {FcSearch} from "react-icons/fc";
import {AiOutlinePlusCircle} from "react-icons/ai"
import { useEffect ,useState } from "react";
import {collection , getDocs, onSnapshot} from "firebase/firestore";
import {db} from "./config/firebase";   
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ContactCard from "./components/ContactCard";
import AddAndUpdateContact from "./components/AddAndUpdateContact";
import NotFoundContact from "./components/NotFoundContact";


const App = () => {
  const [contacts, setContacts] = useState([]);

  const [isOpen ,setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    const getContacts =async () => {
      try {
        
        const contactRef = collection(db,"contacts"); 
          
        onSnapshot(contactRef , (snapshot) => {
          const contactLists = snapshot.docs.map((doc)=>{
            return{
              id: doc.id,
              ...doc.data(),
            };
                    }); 
                  setContacts(contactLists);
                  return contactLists;
        })
      } catch (error) {
          console.log(error);
      }
    };
    getContacts();
  }, []);

const filterContacts = (e) => {
  const value = e.target.value;

  const contactRef = collection(db,"contacts"); 
          
        onSnapshot(contactRef , (snapshot) => {
          const contactLists = snapshot.docs.map((doc)=>{
            return{
              id: doc.id,
              ...doc.data(),
            };
                    }); 
  
const filteredContacts = contactLists.filter(contact => contact.name.toLowerCase().includes(value.toLowerCase()))
                  setContacts(filteredContacts);
                  return filteredContacts;
        });
};

  return (
    <>
    <div className="max-w-[370px] mx-auto px-4">
      <Navbar/>
      <div className="flex">
      <div className="relative flex items-center  flex-grow">
        <FcSearch className="absolute ml-1 text-3xl text-white"/>
        <input 
        onChange={filterContacts}
          type="text" 
          className="flex-grow h-10 rounded-md border text-white pl-10 
           border-white bg-transparent"/>

            <AiOutlinePlusCircle onClick={onOpen} className="text-5xl  cursor-pointer text-white ml-2" />
        
      </div>
      </div>
      <div className="mt-4 flex flex-col gap-2">{
        contacts.length <= 0 ? (<NotFoundContact/ >) : 
        contacts.map(contact=> (
        <ContactCard key={contact.id} contact={contact}/>
        ))
        }

      </div>
    </div>
    <AddAndUpdateContact 
    onClose={onClose}
     isOpen={isOpen} />
     <ToastContainer position="bottom-center"/>
    </>
  ); 
};
 
export default App; 
