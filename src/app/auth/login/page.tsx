import { FormLogin } from "@/components";

export default function LoginPage() {
  return (
    <main className="flex items-center justify-center h-screen ">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col p-4 md:-mt-32">
        <div className="flex items-center h-20 w-full justify-center rounded-t-md bg-gradient-to-br from-zinc-700 to-zinc-400 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">Logo</div>
        </div>
        <div className="bg-zinc-100 border border-zinc-400 rounded-b-md">
          <FormLogin />
        </div>
      </div>
    </main>
  );
}
