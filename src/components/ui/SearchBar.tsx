import { redirect } from "next/navigation";
import { SearchIcon } from "lucide-react";
import { Input } from "../input";

export const SearchBar = ({ name }: { name?: string }) => {
  async function onSubmit(formData: FormData) {
    "use server";
    const search = formData.get("search") as string;
    if (search && search.trim().length > 0) {
      redirect(`/search?name=${encodeURIComponent(search)}`);
    }
  }

  return (
    <form
      action={onSubmit}
      className="group relative my-2 flex w-full items-center justify-items-center text-sm lg:w-80"
    >
      <label className="w-full">
        <span className="sr-only">search</span>
        <Input
          type="text"
          name="search"
          placeholder="Search..."
          autoComplete="on"
          required
          defaultValue={name}
          className="h-10 w-fit rounded-md border border-neutral-300 bg-transparent px-4 py-2 pr-10 text-sm text-black placeholder:text-neutral-500 focus:border-black focus:ring-black"
        />
      </label>
      <div className="absolute inset-y-0 right-25">
        <button
          type="submit"
          className="inline-flex aspect-square w-10 items-center justify-center text-neutral-500 hover:text-neutral-700 focus:text-neutral-700 group-invalid:pointer-events-none group-invalid:opacity-80"
        >
          <span className="sr-only">search</span>
          <SearchIcon aria-hidden className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
};
