"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (formType: FormType) => {
  return z.object({
    email: z
      .string()
      .min(1, "Email is required.")
      .email("Please enter a valid email address."),

    fullName:
      formType === "sign-up"
        ? z
            .string()
            .min(1, "Full name is required.")
            .min(2, "Full name must be at least 2 characters.")
            .max(50, "Full name must be at most 50 characters.")
        : z.string().optional(),
  });
};

const AuthForm = ({ type }: { type: FormType }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      console.log(data);
    } catch (error) {
      setErrorMessage("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="form-title mb-7 text-center">
        {type === "sign-in" ? "Sign In" : "Sign Up"}
      </h1>

      <Card className="w-full border-0 bg-transparent p-0 shadow-none sm:max-w-md">
        <CardContent className="p-0">
          <form
            id="form-rhf-demo"
            onSubmit={form.handleSubmit(onSubmit)}
            className="auth-form w-full"
          >
            <FieldGroup className="gap-5">
              {/* Full Name - Sign Up only */}
              {type === "sign-up" && (
                <Controller
                  name="fullName"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field
                      data-invalid={fieldState.invalid}
                      className="gap-1.5"
                    >
                      <div className="shad-form-item">
                        <FieldLabel
                          htmlFor="fullName"
                          className="shard-form-label"
                        >
                          Full Name
                        </FieldLabel>

                        <Input
                          {...field}
                          id="fullName"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your full name"
                          autoComplete="name"
                          className="shad-input"
                        />

                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="shad-form-message"
                          />
                        )}
                      </div>
                    </Field>
                  )}
                />
              )}

              {/* Email */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1.5">
                    <div className="shad-form-item">
                      <FieldLabel htmlFor="email" className="shard-form-label">
                        Email
                      </FieldLabel>

                      <Input
                        {...field}
                        id="email"
                        type="email"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email"
                        autoComplete="email"
                        className="shad-input"
                      />

                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="shad-form-message"
                        />
                      )}
                    </div>
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        <CardFooter className="mt-5 border-0 p-0">
          <Field orientation="horizontal" className="w-full">
            <Button
              type="submit"
              form="form-rhf-demo"
              className="form-submit-button mb-4 w-full"
              disabled={isLoading}
            >
              {type === "sign-in" ? "Sign In" : "Sign Up"}

              {isLoading && (
                <Image
                  src="/assets/icons/loader.svg"
                  alt="loader"
                  width={24}
                  height={24}
                  className="ml-2 animate-spin"
                />
              )}
            </Button>

            {errorMessage && <p className="error-message">*{errorMessage}</p>}
          </Field>
        </CardFooter>

        <div className="body-2 flex justify-center">
          <p className="text-light-100">
            {type === "sign-in"
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <Link
            className="ml-1 font-medium text-brand"
            href={type === "sign-in" ? "/sign-up" : "/sign-in"}
          >
            {type === "sign-in" ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </Card>
    </>
  );
};

export default AuthForm;
