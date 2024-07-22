import Dropzone from "@/src/components/dropzone"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl">Free Unlimited Multimedia File Convertor</h1>
      <Dropzone className="p-32 mt-10 border-neutral-950 dark:border-neutral-200 border-dashed border-2 rounded-3xl text-2xl justify-center flex flex-col items-center h-96 w-[900px]" />
    </main>
  );
}
