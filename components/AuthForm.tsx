"use client";

import React from "react";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";

type FormType = "sign-in" | "sign-up";

const formSchema = z.object({
  fullName: z
    .string()
    .min(5, "Bug title must be at least 5 characters.")
    .max(32, "Bug title must be at most 32 characters."),
});

const AuthForm = ({ type }: { type: FormType }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <>
      <h1 className="form-title mb-7 text-center">
        {type === "sign-in" ? "Sign In" : "Sign Up"}
      </h1>
      <Card className="w-full border-0 p-0 bg-transparent shadow-none sm:max-w-md">
        {type === "sign-up" && (
          <CardContent>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="auth-form w-full"
            >
              <FieldGroup className="gap-0">
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
                          className="shard-form-label"
                          htmlFor="form-rhf-demo-title"
                          // className="text-brand-100 text-[13px] font-medium"
                        >
                          Full Name
                        </FieldLabel>
                        <Input
                          {...field}
                          id="form-rhf-demo-title"
                          aria-invalid={fieldState.invalid}
                          placeholder="Enter your full name"
                          autoComplete="off"
                          // className="h-11 rounded-md border-[#e5e5e5] bg-white px-4 text-[16px] shadow-sm placeholder:text-[#777] focus-visible:border-[#9d666e] focus-visible:ring-[#9d666e]/20"
                          className="shad-input"
                        />
                        {fieldState.invalid && (
                          <FieldError
                            errors={[fieldState.error]}
                            className="shad-form-message text-[15px] font-medium text-[#9d666e]"
                          />
                        )}
                      </div>
                    </Field>
                  )}
                />
              </FieldGroup>
            </form>
          </CardContent>
        )}

        <CardContent>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="auth-form w-full"
          >
            <FieldGroup className="gap-0">
              <Controller
                name="fullName"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid} className="gap-1.5">
                    <div className="shad-form-item">
                      <FieldLabel
                        className="shard-form-label"
                        htmlFor="form-rhf-demo-title"
                        // className="text-brand-100 text-[13px] font-medium"
                      >
                        Email
                      </FieldLabel>
                      <Input
                        {...field}
                        id="form-rhf-demo-title"
                        aria-invalid={fieldState.invalid}
                        placeholder="Enter your email"
                        autoComplete="off"
                        // className="h-11 rounded-md border-[#e5e5e5] bg-white px-4 text-[16px] shadow-sm placeholder:text-[#777] focus-visible:border-[#9d666e] focus-visible:ring-[#9d666e]/20"
                        className="shad-input"
                      />
                      {fieldState.invalid && (
                        <FieldError
                          errors={[fieldState.error]}
                          className="shad-form-message text-[15px] font-medium text-[#9d666e]"
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
          <Field orientation="horizontal">
            <Button
              type="submit"
              form="form-rhf-demo"
              // className="h-[50px] w-full radius-[10px] bg-[#171717] text-[12px] font-medium text-white hover:bg-[#171717]"
              className="form-submit-button w-full"
            >
              {type === "sign-in" ? "Sign In" : "Sign Up"}
            </Button>
          </Field>
        </CardFooter>
      </Card>
      {/* {otp} */}
    </>
  );
};

export default AuthForm;
