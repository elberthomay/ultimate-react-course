import { useForm } from "react-hook-form";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import { useNavigate } from "react-router";
import useSignup from "./useSignup";
import SpinnerMini from "../../ui/SpinnerMini";

// Email regex: /\S+@\S+\.\S+/

const defaultformCheck = { required: "This field is required" };

function SignupForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { signupIsLoading, signup } = useSignup();

  const handleCancel = () => navigate("/");
  function handleSignup(formData) {
    signup(formData, {
      onSuccess: (data) => {
        navigate("/");
      },
      onSettled: (data) => {
        reset();
      },
    });
  }

  return (
    <Form onSubmit={handleSubmit(handleSignup)}>
      <FormRow label="Full name" formErrors={errors}>
        <Input type="text" id="fullName" {...register("fullName")} />
      </FormRow>

      <FormRow label="Email address" formErrors={errors}>
        <Input
          type="email"
          id="email"
          disabled={signupIsLoading}
          {...register("email", {
            ...defaultformCheck,
            pattern: {
              value: "/S+@S+.S+/",
              message: "Must be a valid email address",
            },
          })}
        />
      </FormRow>

      <FormRow label="Password (min 8 characters)" formErrors={errors}>
        <Input
          type="password"
          id="password"
          disabled={signupIsLoading}
          {...register("password", {
            ...defaultformCheck,
            minLength: {
              value: 8,
              message: "Password must be more than 8 character",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" formErrors={errors}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={signupIsLoading}
          {...register("passwordConfirm", {
            ...defaultformCheck,
            validate: (value, formValues) => {
              if (value === formValues.password) return true;
              else return "Password does not match";
            },
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={handleCancel}>
          Cancel
        </Button>
        <Button disabled={signupIsLoading}>
          {signupIsLoading ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
