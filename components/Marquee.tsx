export default function Marquee() {
  const text =
    "Brunch fait maison ✦ Lun–Ven 9h–17h · Week-end 10h–17h ✦ Café de spécialité ✦ Liège ✦ Produits frais ✦ ";

  return (
    <div className="bg-ember overflow-hidden py-3 select-none">
      <div className="flex whitespace-nowrap animate-marquee">
        {/* Texte dupliqué pour boucle seamless */}
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-sans text-cream text-[10px] tracking-[0.25em] uppercase inline-block"
          >
            {text}
            {text}
            {text}
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
