import { ErrorMessage , Field, Form, Formik } from "formik";
import { collection,addDoc, doc, updateDoc,} from 'firebase/firestore';
import Modal from './Modal';
import {db} from "../config/firebase";
import { toast } from "react-toastify";
import * as Yup from "yup";

const contactSchemaValidatioin = Yup.object().shape({
  name:Yup.string().required("Name Required"),
  Email:Yup.string().email("Invalid Email").required("Email Required")
});

const AddAndUpdateContact = ({isOpen,onClose ,isUpdate,contact }) => {

  const addContact = async(contact) => {
    try{
        const contactRef = collection(db,"contacts");
        await addDoc(contactRef,contact); 
        onClose();
        
      toast.success("Contact Added Successfully");
    }
    catch(error){
        console.log(error);
    }
  };
  const updateContact = async(contact,id) => {
    try{
        const contactRef = doc(db,"contacts",id);
        await updateDoc(contactRef,contact); 
        onClose();
      toast.success("Contact Updated Successfully");
    }
    catch(error){
        console.log(error);
    }
  };
  return (
    <div>
      <Modal  
      isOpen = {isOpen}
      onClose = {onClose}>
        <Formik
        validationSchema={contactSchemaValidatioin}
        initialValues={isUpdate ?{
          name: contact.name,
          Email:  contact.Email,
        }
       : {
          name: "",
          Email:  "",
        }}
        onSubmit={(values) => {
          console.log(values);
          isUpdate ? updateContact(values, contact.id) : addContact(values);
        }}
        >
          <Form className="flex flex-col font-semibold">
            <div className='flex flex-col gap-1'>
            <label htmlFor="name">Name</label>
            <Field name="name" className="border h-8 "/>
            <div className="text-red-700 text-xs">
              <ErrorMessage name="name"/>
            </div>
            </div>
            <div className='flex flex-col gap-1'>
            <label htmlFor="Email">E-mail</label>
            <Field name="Email" className="border h-8 "/> 
            <div className="text-red-700 text-xs">
              <ErrorMessage name="Email"/>
            </div>
            </div>
                <button className=" self-center border relative my-3 bg-rose-500 px-3 py-1">
                  {isUpdate ? "Update" : "Add"}           
                </button> 

          </Form>
        </Formik>
    </Modal>
    </div>
  );
};

export default AddAndUpdateContact;
