import { useState } from "react";
import { z, ZodType } from "zod";
import "./App.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function App() {
  type FormData = {
    name: string;
    email: string;
    age: number;
    password: string;
    confirmPassword: string;
  };

  const schema: ZodType<FormData> = z
    .object({
      name: z.string().min(2).max(30),
      email: z.string().email(),
      age: z.number().min(18),
      password: z.string().min(6),
      confirmPassword: z.string().min(6),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const { register, handleSubmit, formState: {errors}, } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const submitData = (data: FormData) => {
    console.log(data);
  };
  return (
    <div className="App">
      <form
        onSubmit={handleSubmit(submitData)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="">Name: </label>
        <input type="text" {...register("name")} />
        {errors.name && <i>{errors.name.message}</i>} 
        <label htmlFor="">Email </label>
        <input type="email" {...register("email")} />
        {errors.email && <i>{errors.email.message}</i>} 
        <label htmlFor="">Age </label>
        <input type="number" {...register("age", {valueAsNumber: true})} />
        {errors.age && <i>{errors.age.message}</i>} 
        <label htmlFor="">Password </label>
        <input type="password" {...register("password")} />
        {errors.password && <i>{errors.password.message}</i>} 
        <label htmlFor="">Confirm Password </label>
        <input type="password" {...register("confirmPassword")} />
        {errors.confirmPassword && <i>{errors.confirmPassword.message}</i>} 
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
