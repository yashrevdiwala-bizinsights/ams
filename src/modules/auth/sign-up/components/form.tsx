import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router"
import { toast } from "sonner"

import { ErrorMessage } from "@/modules/components/error-message"
import { InputField, Label, Password } from "@/modules/components/form-field"

interface SignUpFormData {
  name: string
  email: string
  username: string
  password: string
  terms: boolean
}

export const Form = () => {
  const navigate = useNavigate()

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>()

  const onSubmit = async (data: SignUpFormData) => {
    console.log(data)
    toast.success("Account Created Successfully", {
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
                  <Link
                    to="/"
                    className="logo d-flex align-items-center w-auto"
                  >
                    <img src="/favicon.svg" alt="ams-logo" />
                    <span className="d-none d-lg-block">AMS</span>
                  </Link>
                </div>

                <div className="card mb-3">
                  <div className="card-body">
                    <div className="pb-2 pt-4">
                      <h5 className="card-title fs-4 pb-0 text-center">
                        Create an Account
                      </h5>
                      <p className="small text-center">
                        Enter your personal details to create account
                      </p>
                    </div>
                    <form
                      className="row g-3 needs-validation"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className="col-12">
                        <Label htmlFor="yourName" className="form-label">
                          Your Name
                        </Label>
                        <InputField
                          control={control}
                          className="form-control"
                          type="text"
                          id="yourName"
                          {...register("name")}
                          name="name"
                        />
                        {errors?.name &&
                          typeof errors.name.message === "string" && (
                            <ErrorMessage errorMsg={errors.name.message} />
                          )}
                      </div>
                      <div className="col-12">
                        <Label htmlFor="yourEmail" className="form-label">
                          Your Email
                        </Label>
                        <InputField
                          control={control}
                          type="email"
                          className="form-control"
                          id="yourEmail"
                          {...register("email")}
                          name="email"
                        />
                        {errors?.email &&
                          typeof errors.email.message === "string" && (
                            <ErrorMessage errorMsg={errors.email.message} />
                          )}
                      </div>
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
                            control={control}
                            type="text"
                            className="form-control"
                            id="yourUsername"
                            {...register("username")}
                            name="username"
                          />
                        </div>
                        {errors?.username &&
                          typeof errors.username.message === "string" && (
                            <ErrorMessage errorMsg={errors.username.message} />
                          )}
                      </div>
                      <div className="col-12">
                        <Label htmlFor="yourPassword" className="form-label">
                          Password
                        </Label>
                        <Password
                          control={control}
                          type="password"
                          className="form-control"
                          id="yourPassword"
                          {...register("password")}
                          name="password"
                        />
                        {errors?.password &&
                          typeof errors.password.message === "string" && (
                            <ErrorMessage errorMsg={errors.password.message} />
                          )}
                      </div> 
                      <div className="col-12">
                        <div className="form-check">
                          <InputField
                            className="form-check-input"
                            control={control}
                            type="checkbox"
                            defaultValue
                            id="acceptTerms"
                            {...register("terms")}
                            name="terms"
                          />
                          <Label
                            className="form-check-label"
                            htmlFor="acceptTerms"
                          >
                            I agree and accept the{" "}
                            <a href="#">terms and conditions</a>
                          </Label>
                          {errors?.terms &&
                            typeof errors.terms.message === "string" && (
                              <ErrorMessage errorMsg={errors.terms.message} />
                            )}
                        </div>
                      </div>
                      <div className="col-12">
                        <button className="btn btn-primary w-100" type="submit">
                          Create Account
                        </button>
                      </div>
                      <div className="col-12">
                        <p className="small mb-0">
                          Already have an account?{" "}
                          <Link to="/sign-in">Log in</Link>
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
