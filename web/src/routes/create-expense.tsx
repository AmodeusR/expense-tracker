import { Button } from "@/components/ui/button";
import { InputWithLabel } from "@/components/ui/InputWithLabel";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { FormEventHandler } from "react";
import { api } from "@/lib/api";

export const Route = createFileRoute("/create-expense")({
  component: CreateExpense,
});

function CreateExpense() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      const res = await api.expenses.$post({
        json: value
      })

      if (!res.ok) {
        throw new Error("A server error has occurred")
      }

      navigate({to: "/expenses"});
    },
  });

  const submitForm: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    form.handleSubmit();
  };
  return (
    <div className="flex flex-col items-center mt-10 flex-1 gap-4 mx-5">
      <h2 className="text-2xl font-semibold">Create expense</h2>
      <form
        onSubmit={submitForm}
        className="w-full max-w-md flex flex-col items-center gap-4"
      >
        <form.Field
          name="title"
          children={(field) => (
            <>
              <InputWithLabel
                labelTitle="Title"
                type="text"
                placeholder="Name your expense"
                onBlur={field.handleBlur}
                id={field.name}
                onChange={(e) => field.handleChange(e.target.value)}
                value={field.state.value}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join(", ")}</em>
              ) : null}
            </>
          )}
        />
        <form.Field
          name="amount"
          children={(field) => (
            <>
              <InputWithLabel
                labelTitle="Amount"
                type="number"
                placeholder="How much was expended"
                onBlur={field.handleBlur}
                id={field.name}
                onChange={(e) => field.handleChange(+e.target.value)}
                value={String(field.state.value)}
              />
              {field.state.meta.isTouched && field.state.meta.errors.length ? (
                <em>{field.state.meta.errors.join(", ")}</em>
              ) : null}
            </>
          )}
        />
        <form.Subscribe
          selector={(state) => [state.canSubmit, state.isSubmitting]}
          children={([canSubmit, isSubmitting]) => (
            <Button
              type="submit"
              title="Create expense"
              className="w-full mt-4"
              disabled={!canSubmit}
            >
              {isSubmitting ? "Creating expense..." : "Create expense"}
            </Button>
          )}
        />
      </form>
    </div>
  );
}
