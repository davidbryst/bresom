import { Button, Typography, Input, Textarea } from "@material-tailwind/react";

export default function Contact() {
  return (
    <section className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <Typography variant="h2" className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
          Contactez-moi
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10">
            <Typography variant="h3" className="text-xl font-semibold mb-4 text-white">
              Informations de contact
            </Typography>
            <div className="space-y-4">
              <div>
                <Typography className="font-medium text-white">Email</Typography>
                <Typography className="text-white/80">votre.email@example.com</Typography>
              </div>
              <div>
                <Typography className="font-medium text-white">Téléphone</Typography>
                <Typography className="text-white/80">+33 6 XX XX XX XX</Typography>
              </div>
              <div>
                <Typography className="font-medium text-white">Localisation</Typography>
                <Typography className="text-white/80">Paris, France</Typography>
              </div>
            </div>
          </div>
          <form className="space-y-4 backdrop-blur-md bg-white/5 p-6 rounded-xl border border-white/10">
            <div>
              <Input
                type="text"
                placeholder="Nom"
                className="w-full bg-white/10 border-white/10 text-white placeholder-white/50 focus:border-white/30"
              />
            </div>
            <div>
              <Input
                type="email"
                placeholder="Email"
                className="w-full bg-white/10 border-white/10 text-white placeholder-white/50 focus:border-white/30"
              />
            </div>
            <div>
              <Textarea
                placeholder="Message"
                className="w-full bg-white/10 border-white/10 text-white placeholder-white/50 focus:border-white/30"
                rows={4}
              />
            </div>
            <Button
              size="lg"
              className="w-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-all duration-300"
            >
              Envoyer le message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
} 