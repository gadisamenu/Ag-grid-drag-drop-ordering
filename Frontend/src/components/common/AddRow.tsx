import React from "react";
import { useForm } from "react-hook-form";

const AddRowForm = ({
  loading,
  submit,
}: {
  loading: boolean;
  submit: (name: string) => Promise<void>;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<{ name: string }>({
    mode: "onChange",
  });

  const onSubmit = async (data: { name: string }) => {
    await submit(data.name);
    reset();
  };

  return (
    <form className="flex flex-col mb-1 " onSubmit={handleSubmit(onSubmit)}>
      <div className="flex gap-1 max-w-sm">
        <input
          className="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-4"
          placeholder="Name"
          {...register("name", { required: "Name is required" })}
        />
        <button
          type="submit"
          className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded shadow flex-2"
          disabled={loading || !isValid}
        >
          {loading ? "Adding..." : "Add Row"}
        </button>
      </div>
      {errors.name && (
        <p className="text-red-500 text-xs italic">{errors.name.message}</p>
      )}
    </form>
  );
};

export default AddRowForm;
