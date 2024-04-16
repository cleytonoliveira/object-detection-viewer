import HealthCheck from "@/components/HealthCheck";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  return (
    <main>
      <header>
        <h1>Object Detection Dashboard</h1>
      </header>
      <section>
        <VideoPlayer />
        <HealthCheck />
      </section>
      <footer>
        <p>Copyright Cleyton Oliveira © 2024</p>
      </footer>
    </main>
  );
}
