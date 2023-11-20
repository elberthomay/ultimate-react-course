import { useForm } from "react-hook-form";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import useSettings from "./useSettings";
import Spinner from "../../ui/Spinner";
import Button from "../../ui/Button";
import { useEffect } from "react";
import useUpdateSettings from "./useUpdateSettings";

function UpdateSettingsForm() {
  const { isLoading, error, settings } = useSettings();
  const {
    register,
    reset,
    formState: { errors, dirtyFields },
    trigger,
    resetField,
  } = useForm();
  const { updatedSettingsLoading, updateSettings } = useUpdateSettings();

  useEffect(() => {
    if (!isLoading && settings) reset(settings);
  }, [isLoading, settings, reset]);

  async function handleUpdate(e, name) {
    if (!dirtyFields[name]) return;
    if (!(await trigger(name))) return;
    const value = e.target.value;
    const updateData = { [name]: value };
    updateSettings(updateData, {
      onSuccess: (data) => {
        resetField(name, { defaultValue: value });
      },
      onError: (data) => {
        resetField(name);
      },
    });
  }

  return (
    <>
      {isLoading && <Spinner />}
      {error && <p>{error.message}</p>}
      {!isLoading && !error && (
        <Form onSubmit={(e) => e.preventDefault()}>
          <FormRow label="Minimum nights/booking" formErrors={errors}>
            <Input
              type="number"
              disabled={updatedSettingsLoading}
              id="minBookingLength"
              {...register("minBookingLength", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Booking length couldn't be less than 1",
                },
                onBlur: (e) => handleUpdate(e, "minBookingLength"),
              })}
            />
          </FormRow>
          <FormRow label="Maximum nights/booking" formErrors={errors}>
            <Input
              type="number"
              disabled={updatedSettingsLoading}
              id="maxBookingLength"
              onBlur={(e) => handleUpdate(e, "minBookingLength")}
              {...register("maxBookingLength", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Booking length couldn't be less than 1",
                },
                validate: (value, formValues) => {
                  const { minBookingLength } = formValues;
                  if (Number(minBookingLength) > Number(value))
                    return "Max booking length must be larger than min booking length";
                  else return true;
                },
              })}
            />
          </FormRow>
          <FormRow label="Maximum guests/booking" formErrors={errors}>
            <Input
              type="number"
              disabled={updatedSettingsLoading}
              id="maxGuestPerBooking"
              onBlur={(e) => handleUpdate(e, "minBookingLength")}
              {...register("maxGuestPerBooking", {
                required: "This field is required",
                min: {
                  value: 1,
                  message: "Number of guest couldn't be less than 1",
                },
              })}
            />
          </FormRow>
          <FormRow label="Breakfast price" formErrors={errors}>
            <Input
              type="number"
              disabled={updatedSettingsLoading}
              id="breakfastPrice"
              onBlur={(e) => handleUpdate(e, "minBookingLength")}
              {...register("breakfastPrice", {
                required: "This field is required",
                min: {
                  value: 0,
                  message: "Price couldn't be less than 0",
                },
              })}
            />
          </FormRow>
        </Form>
      )}
    </>
  );
}

export default UpdateSettingsForm;
