import Dropzone from "@/src/components/dropzone"
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl">Free Unlimited Multimedia File Convertor</h1>
      <Dropzone />
    </main>
  );
}
