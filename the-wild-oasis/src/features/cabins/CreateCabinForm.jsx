import Input from "../../ui/Input";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useInsertUpdateCabin } from "./useInsertUpdateCabin";

function CreateCabinForm({ cabinToEdit, onClose, container = undefined }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: cabinToEdit ?? {},
  });

  const { insertUpdateLoading, insertUpdateCabin } = useInsertUpdateCabin(
    cabinToEdit?.id
  );

  function handleInsert(formData) {
    //image could be string or file array
    const data = {
      ...formData,
      image:
        typeof formData.image === "string" ? formData.image : formData.image[0],
    };
    insertUpdateCabin(data, {
      onSuccess: (data) => {
        reset();
        onClose?.();
      },
    });
  }

  return (
    <Form type={container} onSubmit={handleSubmit(handleInsert)}>
      <FormRow label="Cabin name" formErrors={errors}>
        <Input
          type="text"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" formErrors={errors}>
        <Input
          type="number"
          id="maxCapacity"
          {...register("maxCapacity", {
            required: "This field is required",
            min: { value: 1, message: "Capacity should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" formErrors={errors}>
        <Input
          type="number"
          id="regularPrice"
          {...register("regularPrice", {
            required: "This field is required",
            min: { value: 1, message: "Price should be at least 1" },
          })}
        />
      </FormRow>

      <FormRow label="Discount" formErrors={errors}>
        <Input
          type="number"
          id="discount"
          defaultValue={0}
          max={100}
          min={0}
          {...register("discount", {
            required: "This field is required",
            min: { value: 0, message: "discount should not be below 0%" },
            max: { value: 100, message: "discount should not be above 100%" },
          })}
        />
      </FormRow>

      <FormRow label="Description for website" formErrors={errors}>
        <Textarea type="number" id="description" {...register("description")} />
      </FormRow>

      <FormRow label="Cabin photo" formErrors={errors}>
        <FileInput
          id="image"
          accept="image/*"
          type="file"
          {...register("image", {
            required: cabinToEdit ? false : "This field is required",
          })}
        />
      </FormRow>

      <div>
        {/* type is an HTML attribute! */}
        <Button onClick={() => onClose?.()} variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={insertUpdateLoading}>
          {cabinToEdit ? "Edit cabin" : "Create new cabin"}
        </Button>
      </div>
    </Form>
  );
}

export default CreateCabinForm;
