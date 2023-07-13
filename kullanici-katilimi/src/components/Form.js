import React, {useState, useEffect} from "react";
import * as Yup from "yup";
import {FormGroup, Label, Input, FromFeedback, Button } from 'reactstrap';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

const Form = ({addMember, member, updateMember}) => {
    const [formData, setFormData] = useState({
        name: "",
        surname: "",
        email: "",
        pass: "",
        termsService:""
    });

    const [formErrs, setFormErrs] = useState({
        name: "",
        surname: "",
        email: "",
        pass: "",
        termsService:""
    });

    const [valid, setValid] = useState(false);

    useEffect(() => {
        if (member) {
            setFormData(member);
        } else {
            resetForm();
        }
    },[member]);

    const submitHandler = async (e) => {
        e.preventDefault();
        if(member) {
            updateMember(formData);
        } else {
            axios
                .post(
                    "https://reqres.in/api/users" ,formData)
                .then(res => {
                    console.log(res.data);
                    addMember(formData);
                })
                .catch(err =>{
                    console.log(err);
                })
                
        }
    };

    const inputChangeHandler = (e) => {
        const { name, value} = e.target;
        Yup.reach(formSchema, name)
        .validate(value)
        .then((valid) => {
            setFormErrs({...formErrs, [name]: ""});
        })
        .catch((err) => {
            setFormErrs({...formErrs,[name]: err.errors[0] });
        })
            setFormData({...formData, [name]: value});
        
    };

    const inputCheckboxHandler = (e) => {
        const {name, checked} = e.target;
        setFormData({...formData, [name]: checked});
    };

    const resetForm = () => {
        setFormData({
            name: "",
            surname: "",
            email: "",
            pass: "",
            termsService:""
        });
    };
    const formSchema = Yup.object().shape({
        name: Yup.string().required("!"),
        surname: Yup.string().required("!"),
        email: Yup.string().required("!"),
        pass: Yup.string().required("!"),
        termsService:Yup.boolean().required("!")
    });

    useEffect(() => {
        formSchema.isValid(formData).then((valid) => setValid(valid));
    }, [formData, formSchema]);

   /* const chancehandler = (e) => {
        console.log("change trigged", e.target.name);
        console.log("event", e) ;

        let value = 
        e.target.type === "checkbox" ? e.target.checked : e.target.value;

        if(e.target.type === "checkbox"){
            value = e.target.checked;
        }

        const newFormData = {
            ...FormData,
            [e.target.name]: value,
        };

        setFormData(newFormData);
    };
*/
    return (
        <form onSubmit={submitHandler}>
            <div>
                <label htmlFor="name">İsim ve Soyisim</label>
                <input 
                    type="text" 
                    name="name"
                    id="name"
                    onChange={inputChangeHandler}
                    value={formData.name}
                    invalid={!!formErrs.name}
                />
                <FormFeedback>{formErrs.name}</FormFeedback>
            </div>
            <div>
                <label htmlFor="name">İsim ve Soyisim</label>
                <input 
                    type="text" 
                    name="surname"
                    id="surname"
                    onChange={inputChangeHandler}
                    value={formData.surname}
                    invalid={!!formErrs.surname}
                />
                <FormFeedback>{formErrs.surname}</FormFeedback>
            </div>
            <div>
                <label htmlFor="email">Eposta</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={inputChangeHandler}
                    value={formData.email}
                    invalid={!!formErrs.email}
                />
                <FormFeedback>{formErrs.email}</FormFeedback>
            </div>
            <div>
                <label htmlFor="password">Şifre</label>
                <input
                    type="password" 
                    name="password" 
                    id="password"
                    onChange={inputChangeHandler}
                    value={formData.password}
                    invalid={!!formErrs.password}
                />
                <FormFeedback>{formErrs.password}</FormFeedback>
            </div>
            <div>
                <label htmlFor="terms">Kullanım Şartları</label>
                <input 
                    type="checkbox"
                    name="terms"
                    id="terms"
                    onChange={inputChangeHandler}
                    value={formData.terms}
                    invalid={!!formErrs.terms}
                />
                <FormFeedback>{formErrs.terms}</FormFeedback>
            </div>
            <Button type="submit" disabled={!valid}>
                {member ? "Güncelle" : "Ekle"}
            </Button>
            <Button type="button" onClick={resetForm}>
               Reset Form
            </Button>
        </form>
    );
}

export default Form;