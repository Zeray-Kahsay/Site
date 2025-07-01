"use client";

import { useForm } from "react-hook-form";
import axiosApi from "@/lib/api/axiosApi";
import { useRouter } from "next/navigation";

import CreateItemFormInputs from "@/types/CreateItemFormInputs";
import { useCategories } from "@/hooks/useCategories";
import { useTypes } from "@/hooks/useTypes";
import { useState } from "react";

const ItemForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateItemFormInputs>();
  const router = useRouter();
  const { data: categories, isLoading: loadingCategories } = useCategories();
  const { data: types, isLoading: loadingTypes } = useTypes();
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: CreateItemFormInputs) => {
    try {
      setSubmitting(true);
      await axiosApi.post("/api/items/create-item", data);
      router.push("/");
    } catch (err) {
      console.error("Failed to create item", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-xl mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      <h2 className="text-2xl font-bold">Add a New Item</h2>

      <div>
        <input
          type="text"
          placeholder="Title"
          {...register("title", { required: true })}
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">Title is required</span>
        )}
      </div>

      <div>
        <textarea
          placeholder="Description"
          {...register("description", { required: true })}
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">Description is required</span>
        )}
      </div>

      <div>
        <input
          type="text"
          placeholder="Location"
          {...register("location", { required: true })}
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.location && (
          <span className="text-red-500 text-sm">Location is required</span>
        )}
      </div>

      <div>
        <input
          placeholder="Price"
          type="number"
          step="0.01"
          {...register("price", { required: true, valueAsNumber: true })}
          className="w-full p-2 border rounded tracking-widest"
        />
        {errors.price && (
          <span className="text-red-500 text-sm">Price is required</span>
        )}
      </div>

      <div>
        <select
          {...register("categoryId", { required: true })}
          className="w-full p-2 border rounded tracking-widest"
        >
          <option value="">Select category</option>
          {loadingCategories ? (
            <option disabled>Loading...</option>
          ) : (
            categories?.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))
          )}
        </select>
        {errors.categoryId && (
          <span className="text-red-500 text-sm">Category is required</span>
        )}
      </div>

      <div>
        <select
          {...register("typeId", { required: true })}
          className="w-full p-2 border rounded tracking-widest "
        >
          <option value="">Select type</option>
          {loadingTypes ? (
            <option disabled>Loading...</option>
          ) : (
            types?.map((type) => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))
          )}
        </select>
        {errors.typeId && (
          <span className="text-red-500 text-sm">Type is required</span>
        )}
      </div>

      <button
        type="submit"
        disabled={submitting}
        //className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded tracking-widest"
      >
        {submitting ? "Submitting..." : "Submit"}
      </button>
    </form>
    // <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
    //   <input
    //     type="text"
    //     placeholder="Title"
    //     {...register("title", { required: "Title is required" })}
    //     className="w-full border rounded px-3 py-2"
    //     //className="input input-bordered w-full"
    //   />
    //   {errors.title && (
    //     <p className="text-red-500 text-sm">{errors.title.message}</p>
    //   )}

    //   <textarea
    //     placeholder="Description"
    //     {...register("description", { required: "Description is required" })}
    //     className="w-full border rounded px-3 py-2"
    //   />
    //   {errors.description && (
    //     <p className="text-red-500 text-sm">{errors.description.message}</p>
    //   )}

    //   <input
    //     type="number"
    //     step="0.01"
    //     placeholder="Price"
    //     {...register("price", { required: "Price is required" })}
    //     className="w-full border rounded px-3 py-2"
    //   />
    //   {errors.price && (
    //     <p className="text-red-500 text-sm">{errors.price.message}</p>
    //   )}

    //   {/* You can later enhance this with selects populated from the API */}
    //   <button
    //     type="submit"
    //     className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
    //   >
    //     Submit Item
    //   </button>
    // </form>
  );
};

export default ItemForm;
