export default function FeaturedCharacter() {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-orange rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-neon-cyan rounded-full mix-blend-multiply filter blur-3xl opacity-15 animate-blob animation-delay-2000" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <div className="relative group flex justify-center">
          <div className="absolute inset-0 bg-gradient-to-r from-neon-pink via-neon-orange to-neon-cyan rounded-3xl blur-3xl opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
          <div className="relative bg-gradient-to-br from-purple-800/60 to-purple-900/60 backdrop-blur-sm rounded-3xl p-6 border-4 border-neon-orange/50 shadow-2xl transform group-hover:scale-105 transition-transform duration-500">
            <video
              src="/assets/aHR0cHM6Ly9hc3NldHMuZ3Jvay5jb20vdXNlcnMvY2MwNTMyODYtZjBiNy00MTU3LTlkZTgtNTI0ZWIxYjE3NjQ2L2dlbmVyYXRlZC8zNjE2NTVmOC1hNjY4LTQ2OGEtOTFjNC0zMWE0ZWQwYjU3MTQvZ2VuZXJhdGVkX3ZpZGVvX2hkLm1wNA==.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
              style={{
                boxShadow:
                  "0 0 30px rgba(255, 105, 180, 0.5), 0 0 60px rgba(255, 165, 0, 0.3), 0 0 90px rgba(0, 191, 255, 0.2)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
