import bcrypt from "bcrypt";
import prisma from "../prisma";
import { FormState, SignupFormSchema } from "./definitions";
import { createSession } from "./session";
import { redirect } from "next/navigation";

export async function signup(state: FormState, formData: FormData) {
  console.log("formData: ", formData);
  // 1.Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    phone: formData.get("phone"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // 2. Prepare data for insertion into database
  const { phone, password } = validatedFields.data;
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Insert the user into the database
  // e.g. Use Prisma to insert the user into the database
  const user = await prisma.user.create({
    data: {
      name: "test1",
      phone,
      password: hashedPassword,
    },
  });

  if (!user) {
    return {
      message: "An error occurred while creating your account.",
    };
  }

  // 4. Create user session
  await createSession(user.id);
  // 5. Redirect user
  redirect("/profile");
}
