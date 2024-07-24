import { fetchFile } from "@ffmpeg/util";

export default async function convert(ffmpeg, file, to) {
  const input = file.path.split(".").pop().toLowerCase();
  const output = file.path.split(".").shift() + "." + to;

  try {
    console.log("Writing input file to FFmpeg...");
    await ffmpeg.writeFile(input, await fetchFile(file));

    let ffmpeg_cmd = [];
    if (to === "3gp") {
      ffmpeg_cmd = [
        "-i",
        input,
        "-r",
        "20",
        "-s",
        "352x288",
        "-vb",
        "400k",
        "-acodec",
        "aac",
        "-strict",
        "experimental",
        "-ac",
        "1",
        "-ar",
        "8000",
        "-ab",
        "24k",
        output,
      ];
    } else {
      ffmpeg_cmd = ["-i", input, output];
    }

    console.log("Executing FFmpeg command:", ffmpeg_cmd);
    await ffmpeg.exec(ffmpeg_cmd);

    console.log("Reading output file from FFmpeg...");
    const data = await ffmpeg.readFile(output);
    const blob = new Blob([data], { type: file.type });
    const url = URL.createObjectURL(blob);

    return { url, output };
  } catch (error) {
    console.error("Error during file conversion:", error);
    return { url: null, output: null };
  }
}
