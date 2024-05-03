import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"

function App() {
  const handleClickLogin = (values) => {
    console.log(values)
  }

  const handleClickRegister = (values) => {
    console.log(values)
  }

  const validationLogin = yup.object().shape({
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Campo obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .required("Campo obrigatório"),
  })
  
  const validationRegister = yup.object().shape({
    email: yup
      .string()
      .email("Insira um email válido")
      .required("Campo obrigatório"),
    password: yup
      .string()
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .required("Campo obrigatório"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "As senhas não são iguais")
  })

  return ( 
    <>
      <h1>Login</h1>
      <Formik initialValues={{}} onSubmit={handleClickLogin} validationSchema={validationLogin}>
        <Form className="loginForm">

          <div className="loginFormGroup">
            <Field name="email" className="formField" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="formError" />
          </div>

          <div className="loginFormGroup">
            <Field name="password" className="formField" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="formError" />
          </div>

          <button className="button" type="submit">Login</button>

        </Form>        
      </Formik>
      

      <h1>Cadastro</h1>
      <Formik initialValues={{}} onSubmit={handleClickRegister} validationSchema={validationRegister}>
        <Form className="loginForm">

          <div className="loginFormGroup">
            <Field name="email" className="formField" placeholder="Email" />
            <ErrorMessage component="span" name="email" className="formError" />
          </div>

          <div className="loginFormGroup">
            <Field name="password" className="formField" placeholder="Senha" />
            <ErrorMessage component="span" name="password" className="formError" />
          </div>

          <div className="loginFormGroup">
            <Field name="confirmPassword" className="formField" placeholder="Confirme sua senha" />
            <ErrorMessage component="span" name="confirmPassword" className="formError" />
          </div>

          <button className="button" type="submit">Login</button>

        </Form>
        
      </Formik>
    </>
  )
}

export default App
