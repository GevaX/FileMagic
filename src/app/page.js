import Dropzone from "@/src/components/dropzone";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-center text-3xl lg:text-4xl">
        Free Unlimited Multimedia File Convertor
      </h1>
      <Dropzone className="mt-10 flex h-80 w-96 cursor-pointer flex-col items-center rounded-3xl border-2 border-dashed border-neutral-400 p-32 text-2xl hover:border-neutral-950 dark:border-neutral-400 dark:hover:border-neutral-50 lg:h-96 lg:w-[900px]" />
    </main>
  );
}
