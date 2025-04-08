import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"

import { ErrorMessage } from "@/modules/components/error-message"
import { InputField, Label, Password } from "@/modules/components/form-field"

export interface FormData {
  username: string
  password: string
}

export const Form = () => {
  const navigate = useNavigate()
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    console.log(data)

    toast.success("Login Successful", {
      position: "top-right",
      duration: 3000,
    })

    navigate("/")
  }

  return (
    <main>
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="d-flex justify-content-center py-4">
                  <div className="logo d-flex align-items-center w-auto">
                    <img src="/favicon.svg" alt="ams-logo" />
                    <span className="d-none d-lg-block">
                      AMS
                    </span>
                  </div>
                </div>

                {/* <div className="d-flex justify-content-center align-items-center py-4">
                  <div className="logo d-flex align-items-center w-auto">
                    <img src="/favicon.svg" alt="ams-logo" />
                    <span className="d-none d-lg-block">
                      Asset Management System
                    </span>
                  </div>
                </div> */}

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pb-2 pt-4">
                      <h5 className="card-title fs-4 pb-0 text-center">
                        Log In to Your Account
                      </h5>
                      {/* <p className="small text-center">
                        Enter your personal details to log in
                      </p> */}
                    </div>
                    <form
                      className="row g-3 needs-validation"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="col-12">
                        <Label htmlFor="yourUsername" className="form-label">
                          Username
                        </Label>
                        <div className="input-group has-validation">
                          {/* <span
                            className="input-group-text"
                            id="inputGroupPrepend"
                          >
                            @
                          </span> */}
                          <InputField
                            type="text"
                            control={control}
                            name="username"
                            className="form-control"
                            id="yourUsername"
                          />
                        </div>
                        {errors?.username && (
                          <ErrorMessage errorMsg="Invalid Username" />
                        )}
                      </div>

                      <div className="col-12">
                        <Label htmlFor="yourPassword" className="form-label">
                          Password
                        </Label>
                        <Password
                          type="password"
                          name="password"
                          control={control}
                          id="yourPassword"
                        />
                        {errors?.password && (
                          <ErrorMessage errorMsg="Invalid Password" />
                        )}
                      </div>

                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Login
                        </button>
                      </div>

                      <div className="col-12">
                        <p className="small mb-0">
                          Don&#39;t have account?{" "}
                          <Link to="/sign-up">Create an account</Link>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}
