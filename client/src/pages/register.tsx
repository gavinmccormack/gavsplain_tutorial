import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/react';
import {Formik, Form} from 'formik'
import { setValues } from 'framer-motion/types/render/utils/setters';
import React from 'react';

interface RegisterProps {
    hello: string;
}

const Register: React.FC<RegisterProps> = ({  }) => {
    const initialValues = { username: "", password: "" }
    const onSubmit = (values) => {
        console.log(values)
    }
    return (
        <>
            <h2>Register Page</h2>
                <Formik 
                initialValues={initialValues}
                onSubmit={onSubmit}          
                >
                {(values, handleChange) =>  // NB: What is this mess
                    <Form>
                        <FormControl>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input 
                            value={values.username} 
                            onChange={handleChange}
                            id="username" 
                            placeholder="name" 
                            />
                            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}

                        </FormControl>
                    </Form>
                }

                </Formik>
        </>
    );
};

export default Register;
