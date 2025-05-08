"use client";

import { useActionState, useState } from "react";
import MDEditor from "@uiw/react-md-editor";
import { z } from "zod";

import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createPitch } from "@/lib/actions";

function StartupForm() {
    const [errors, setErrors] = useState<Record<string, string>>({})
    const [pitch, setPitch] = useState<string>("")

    const router = useRouter()

    const handleFormSubmit = async (prevState, formData) => {
        try {
            const formValue = {
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                category: formData.get("category") as string,
                link: formData.get("link") as string,
                pitch
            }

            console.log(formValue)

            await formSchema.parseAsync(formValue) // compares the formValue with the schema to validate it

            const result = await createPitch(prevState, formData, pitch)

            if (result.status === "SUCCESS") {
                toast.success("Startup idea submitted successfully", {
                    description: `Your idea ${formValue.title} was created successfully`
                })
                router.push(`/startup/${result._id}`)
            }

            return result;

        } catch (err) {
            if (err instanceof z.ZodError) {
                const errors = err.flatten().fieldErrors
                setErrors(errors as unknown as Record<string, string>)

                toast.error("Form validation failed", {
                    description: "Please check the form for errors and try again.",
                });

                return { ...prevState, error: "Invalid form data", status: "ERROR" }
            }
            toast.error("Something went wrong", {
                description: "There was an error submitting your idea. Please try again.",
            });

            return { ...prevState, error: "Something went wrong", status: "ERROR" }
        }
    }

    const [state, dispatch, isPending] = useActionState(handleFormSubmit, { error: "", status: "INITIAL" })



    return (
        <form action={dispatch} className="startup-form">
            <div>
                <label
                    htmlFor="title"
                    className="startup-form_label">
                    Title
                </label>
                <Input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Startup Title"
                    className="startup-form_input"
                    required />
                {
                    errors.title && <span className="startup-form_error">{errors.title}</span>
                }
            </div>

            <div>
                <label
                    htmlFor="description"
                    className="startup-form_label">
                    Description
                </label>
                <Textarea
                    name="description"
                    id="description"
                    placeholder="Startup Description"
                    className="startup-form_textarea"
                    required />
                {
                    errors.description && <span className="startup-form_error">{errors.description}</span>
                }
            </div>

            <div>
                <label
                    htmlFor="category"
                    className="startup-form_label">
                    Category
                </label>
                <Input
                    type="text"
                    name="category"
                    id="category"
                    placeholder="Startup Category (Tech, Health, etc.)"
                    className="startup-form_input"
                    required />
                {
                    errors.category && <span className="startup-form_error">{errors.category}</span>
                }
            </div>

            <div>
                <label
                    htmlFor="link"
                    className="startup-form_label">
                    Image URL
                </label>
                <Input
                    type="text"
                    name="link"
                    id="link"
                    placeholder="Startup Image URL"
                    className="startup-form_input"
                    required />
                {
                    errors.link && <span className="startup-form_error">{errors.link}</span>
                }
            </div>

            <div data-color-mode="light">
                <label
                    htmlFor="pitch"
                    className="startup-form_label">
                    Pitch
                </label>
                <MDEditor
                    id="pitch"
                    preview="edit"
                    height={300}
                    style={{ borderRadius: 20, overflow: "hidden" }}
                    value={pitch}
                    onChange={val => setPitch(val as string)}
                    textareaProps={{
                        placeholder: "Briefly describe your startup",
                    }}
                    previewOptions={{
                        disallowedElements: ["style"]
                    }}
                />
                {
                    errors.pitch && <span className="startup-form_error">{errors.pitch}</span>
                }
            </div>

            <Button
                type="submit"
                className="startup-form_btn text-white"
                disabled={isPending}
            >
                {isPending ? "Submitting" : "Submit"}
                <Send className="size-6 ml-2" />
            </Button>

        </form >
    )
}

export default StartupForm
